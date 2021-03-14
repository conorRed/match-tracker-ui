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
      validated: false,
      teamId: null,
      teamCreated: false,
    };
  }

  render() {
    return (
      <Form validated={this.state.validated}>
        <Form.Label>{this.state.colourError}</Form.Label>
        <br></br>
        <Form.Group controlId="validationCustom01">
          <Form.Label>Team Name</Form.Label>
          <Form.Control
            type="text"
            required={true}
            onChange={this.props.handleNameChange}
          />
          <Form.Control.Feedback type="invalid">
            Please add a Team name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="validationCustom02">
          <Select
            onChange={this.props.handleColourChange}
            className="basic-single"
            classNamePrefix="select"
            name="colour"
            options={colourOptions}
          />
          <Form.Control.Feedback type="invalid">
            Choose a colour
          </Form.Control.Feedback>
        </Form.Group>
      </Form>
    );
  }
}

export default TeamForm;
