import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Col from "react-bootstrap/Col";
import "../../stylesheet/stylesheet.css";
import { FaUser } from "react-icons/fa";

class PlayerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
    };
  }
  // to change parent state pass callbacks

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSubmit(this.state.players);
  }

  onPlayerNameChange(event, id) {
    console.log(this.state.players);
    let oldPlayers = this.state.players;
    oldPlayers[id].name = event.currentTarget.value;
  }

  onPlayerNumberChange(event, id) {
    let oldPlayers = this.state.players;
    oldPlayers[id].number = event.currentTarget.value;
  }

  playerForm(id) {
    return (
      <div className="player-form">
        <Form.Group controlId={id} className="text-center">
          <div className="player-avatar">
            <FaUser />
          </div>
          <Form.Label column="sm">Name</Form.Label>
          <Form.Control
            onChange={(e) => {
              this.onPlayerNameChange(e, id);
            }}
            type="text"
            value={"Player " + id}
          />
          <br />
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">#</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              onChange={(e) => {
                this.onPlayerNumberChange(e, id);
              }}
              aria-describedby="basic-addon1"
              type="number"
            />
          </InputGroup>
        </Form.Group>
      </div>
    );
  }

  newPlayer(newPlayer) {
    let playersOld = this.state.players;
    playersOld.push(newPlayer);
    this.setState({ players: playersOld });
  }

  render() {
    return (
      <div>
        <Form>
          <Form.Row className="align-items-center">
            <Col>{this.playerForm(1)}</Col>
            <Col>{this.playerForm(2)}</Col>
            <Col>{this.playerForm(3)}</Col>
            <Col>{this.playerForm(4)}</Col>
            <Col>{this.playerForm(5)}</Col>
          </Form.Row>
          <Form.Row className="align-items-center">
            <Col>{this.playerForm(6)}</Col>
            <Col>{this.playerForm(7)}</Col>
            <Col>{this.playerForm(8)}</Col>
            <Col>{this.playerForm(9)}</Col>
            <Col>{this.playerForm(10)}</Col>
          </Form.Row>
          <Form.Row className="align-items-center">
            <Col>{this.playerForm(11)}</Col>
            <Col>{this.playerForm(12)}</Col>
            <Col>{this.playerForm(13)}</Col>
            <Col>{this.playerForm(14)}</Col>
            <Col>{this.playerForm(15)}</Col>
          </Form.Row>
        </Form>
      </div>
    );
  }
}

export default PlayerForm;
