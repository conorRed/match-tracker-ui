import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Select from "react-select";
import { colourOptions } from "../../data/colors.js";
import { createTeam } from "../../api/helpers.js";

class TeamForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      colour: "",
      colourError: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleColourChange = this.handleColourChange.bind(this);
  }
  // to change parent state pass callbacks
  handleNameChange(event) {
    console.log(event);
    this.setState({ name: event.target.value });
  }
  handleColourChange(event) {
    this.setState({ colour: event.value });
  }
  handleSubmit(event) {
    if (this.state.name == "") {
      return;
    }
    createTeam({
      name: this.state.name,
      colour: this.state.colour,
    }).then((res) => {
      console.log(res);
    });
  }
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Label>Team Name</Form.Label>
          <Form.Control
            type="text"
            required={true}
            onChange={this.handleNameChange}
          />
        </Form.Group>
        <Form.Group>
          <Select
            onChange={this.handleColourChange}
            value={this.state.colour}
            className="basic-single"
            classNamePrefix="select"
            name="colour"
            options={colourOptions}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default TeamForm;
