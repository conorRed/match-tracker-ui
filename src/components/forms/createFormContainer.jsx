import React, { Component } from "react";
import { createTeam, createPlayers, handleError } from "../../api/helpers.js";
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
      teamCreated: false,
      team: null,
      players: [],
      bulkCreateData: {
        teamData: {},
        playerData: [],
      },
    };

    this.onTeamNameChange = this.onTeamNameChange.bind(this);
    this.onTeamColourChange = this.onTeamColourChange.bind(this);
    this.submitTeamData = this.submitTeamData.bind(this);
    this.submitPlayerData = this.submitPlayerData.bind(this);
    this.toggleForms = this.toggleForms.bind(this);
    this.bulkSubmit = this.bulkSubmit.bind(this);
    this.creationInformation = this.creationInformation.bind(this);
  }

  async bulkSubmit() {
    const teamData = this.state.bulkCreateData.teamData;
    let playerData = this.state.bulkCreateData.playerData;
    try {
      const team = await createTeam(teamData)
        .then(handleError)
        .then((response) => response.json());
      const teamId = team.id;

      playerData.map((p) => (p["team_id"] = teamId));
      createPlayers(playerData)
        .then(handleError)
        .then((response) => this.setState({ creationInformation: "success" }));
    } catch (errResponse) {
      errResponse.text().then((errorMessage) => {
        this.setState({
          infoVariant: "danger",
          creationInformation: errorMessage,
        });
      });
    }
  }

  submitTeamData(teamData) {
    let bulkdataNew = this.state.bulkCreateData;
    bulkdataNew.teamData = teamData;
    this.setState({ bulkCreateData: bulkdataNew });
  }

  registerPlayer(id) {
    let currentBulkCreateData = this.state.bulkCreateData;
    let currentPlayerData = currentBulkCreateData.playerData;
    currentPlayerData[id] = { name: "Player " + id, number: id + 1 };
    currentBulkCreateData.playerData = currentPlayerData;
    this.setState({ bulkCreateData: currentBulkCreateData });
  }

  submitPlayerData(playerData) {
    console.log(playerData);
    let bulkdataNew = this.state.bulkCreateData;
    bulkdataNew.playerData = playerData;
    this.setState({ bulkCreateData: bulkdataNew });
  }

  onTeamNameChange(event) {
    let currentBulkCreate = this.state.bulkCreateData;
    currentBulkCreate.teamData.name = event.target.value;
    this.setState({ bulkCreateData: currentBulkCreate });
  }

  onTeamColourChange(event) {
    let currentBulkCreate = this.state.bulkCreateData;
    currentBulkCreate.teamData.colour = event.value;
    this.setState({ bulkCreateData: currentBulkCreate });
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
          <Row></Row>
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
