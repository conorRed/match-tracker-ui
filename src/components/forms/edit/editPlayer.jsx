import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import "../../../stylesheet/stylesheet.css";
import { FaUser } from "react-icons/fa";

class EditPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playersUpdated: [],
      name: "",
      number: null,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    const { name, number } = this.state;
    let player = { name: name, number: number };
    this.props.onSubmit(player);
  }

  onPlayerNameChange = (event) => {
    const name = event.currentTarget.value;
    this.setState({ name: name });
  };
  onPlayerNumberChange = (event) => {
    const number = event.target.value;
    this.setState({ number: number });
  };

  render() {
    return (
      <Form
        onSubmit={this.onSubmit}
        className="form-bootstrap"
        style={{ width: 300 }}
      >
        <Form.Row>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={this.onPlayerNameChange}
              placeholder="Name"
              type="text"
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group>
            <Form.Label>Number</Form.Label>
            <InputGroup className="mb-3" column="sm">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">#</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                onChange={this.onPlayerNumberChange}
                aria-describedby="basic-addon1"
                type="number"
              />
            </InputGroup>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Button variant="primary" type="submit">
            Add
          </Button>
        </Form.Row>
      </Form>
    );
  }
}

export default EditPlayer;
