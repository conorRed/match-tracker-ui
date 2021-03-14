import React, { Component } from "react";
import { createTeam, createPlayer } from "../../api/helpers.js";
import TeamForm from "./teamForm";
import PlayerForm from "./playerForm";
import Button from "react-bootstrap/Button";
import { Row, Col, Alert } from "react-bootstrap";

class CreateFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderTeamForm: true,
      renderPlayerForm: false,
      creationInformation: "",
      infoVariant: "",
      bulkCreateData: {
        teamData: {},
        playerData: [{}],
      },
    };

    this.onPlayerNameChange = this.onPlayerNameChange.bind(this);
    this.onTeamNameChange = this.onTeamNameChange.bind(this);
    this.onTeamColourChange = this.onTeamColourChange.bind(this);
    this.submitTeamData = this.submitTeamData.bind(this);
    this.submitPlayerData = this.submitPlayerData.bind(this);
    this.registerPlayer = this.registerPlayer.bind(this);
    this.toggleForms = this.toggleForms.bind(this);
    this.bulkSubmit = this.bulkSubmit.bind(this);
    this.creationInformation = this.creationInformation.bind(this);
  }

  bulkSubmit() {
    createTeam(this.state.bulkCreateData.teamData)
      .then((response) => {
        if (!response.ok) {
          this.setState({
            colourError: "Theres already a team with this colour",
          });
          throw Error(response.statusText);
        }
        return response;
      })
      .then((res) => res.json())
      .then((res) => {
        for (
          let playerIndex = 1;
          playerIndex < this.state.bulkCreateData.playerData.length;
          playerIndex++
        ) {
          this.state.bulkCreateData.playerData[playerIndex]["team_id"] = res.id;
          createPlayer(this.state.bulkCreateData.playerData[playerIndex])
            .then((response) => {
              if (!response.ok) {
                throw Error(response.statusText);
              }
              return response;
            })
            .then(() => {
              this.setState({
                creationInformation:
                  "Players Created for new team: " + res.name,
                infoVariant: "success",
              });
            })
            .catch((err) => {
              console.log(err.message);
              this.setState({
                creationInformation: "Error while creating players for team",
                infoVariant: "danger",
              });
            });
        }
      })
      .catch((err) => {
        console.log(err.message);
        this.setState({
          creationInformation: "Error while creating team",
          infoVariant: "danger",
        });
      });
  }

  submitTeamData(teamData) {
    let bulkdataNew = this.state.bulkCreateData;
    bulkdataNew.teamData = teamData;
    this.setState({ bulkCreateData: bulkdataNew });
  }

  registerPlayer(id) {
    let currentBulkCreateData = this.state.bulkCreateData;
    let currentPlayerData = currentBulkCreateData.playerData;
    currentPlayerData[id] = { name: "Player " + id, number: id };
    currentBulkCreateData.playerData = currentPlayerData;
    this.setState({ bulkCreateData: currentBulkCreateData });
  }

  submitPlayerData(playerData) {
    let bulkdataNew = this.state.bulkCreateData;
    bulkdataNew.playerData = playerData;
    this.setState({ bulkCreateData: bulkdataNew });
  }

  onTeamNameChange(event) {
    let currentBulkCreate = this.state.bulkCreateData;
    currentBulkCreate.teamData.name = event.target.value;
    this.setState({ bulkCreateData: currentBulkCreate });
    console.log(this.state.bulkCreateData);
  }

  onTeamColourChange(event) {
    console.log(event);
    let currentBulkCreate = this.state.bulkCreateData;
    currentBulkCreate.teamData.colour = event.value;
    this.setState({ bulkCreateData: currentBulkCreate });
    console.log(this.state.bulkCreateData);
  }

  onPlayerNameChange(event, id) {
    let currentPlayersMap = this.state.bulkCreateData;
    currentPlayersMap.playerData[id].name = event.currentTarget.value;
    this.setState({ bulkCreateData: currentPlayersMap });
  }

  onPlayerNumberChange(event, id) {
    let currentPlayersMap = this.state.bulkCreateData;
    currentPlayersMap.playerData[id].number = event.currentTarget.value;
    this.setState({ bulkCreateData: currentPlayersMap });
  }

  toggleForms() {
    this.setState({ renderTeamForm: !this.state.renderTeamForm });
    this.setState({ renderPlayerForm: !this.state.renderPlayerForm });
  }

  creationInformation() {
    if (this.state.creationInformation !== "") {
      return (
        <Row>
          <Col>
            <Alert variant={this.state.infoVariant}>
              {this.state.creationInformation}
            </Alert>
          </Col>
        </Row>
      );
    } else {
      return <></>;
    }
  }

  render() {
    const renderTeamForm = this.state.renderTeamForm;
    const renderPlayerForm = this.state.renderPlayerForm;

    if (renderTeamForm) {
      return (
        <>
          <Row>
            <Col>
              <TeamForm
                handleNameChange={this.onTeamNameChange}
                handleColourChange={this.onTeamColourChange}
              />
            </Col>
          </Row>
          <Row>
            <Col className="text-right">
              <Button variant="primary" onClick={this.toggleForms}>
                Next
              </Button>
            </Col>
          </Row>
        </>
      );
    } else if (renderPlayerForm) {
      return (
        <>
          <Row>
            <Col>
              <PlayerForm
                handleSubmit={this.submitPlayerData}
                onPlayerNameChange={this.onPlayerNameChange}
                registerPlayer={this.registerPlayer}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Button variant="primary" onClick={this.toggleForms}>
                Back
              </Button>
            </Col>
            <Col className="text-right">
              <Button variant="primary" onClick={this.bulkSubmit} type="submit">
                Create
              </Button>
            </Col>
          </Row>
          {this.creationInformation()}
        </>
      );
    }
  }
}

export default CreateFormContainer;
