import React, { Component } from "react";
import { createPlayer, handleError } from "../../../api/helpers.js";
import EditPlayer from "./editPlayer";
import TeamDropdown from "../../teamDropdown";
class EditFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editableObjectId: null,
      editObject: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.teamChosen = this.teamChosen.bind(this);
    this.editablePicked = this.editablePicked.bind(this);
  }

  onSubmit(player) {
    console.log(player);
    const newPlayer = player;
    newPlayer["team_id"] = this.state.editableObjectId;
    createPlayer(newPlayer)
      .then(handleError)
      .then((response) => this.setState({ creationInformation: "success" }))
      .catch((err) => this.setState({ creationInformation: err }));
  }

  editablePicked(id) {
    this.setState({ editableObjectId: id, editObject: true });
  }

  teamChosen(team) {
    this.editablePicked(team.id);
  }

  render() {
    const pickTeam = <TeamDropdown submitTeamForm={this.teamChosen} />;
    const editForm = <EditPlayer onSubmit={this.onSubmit} />;
    if (this.state.editObject) {
      return editForm;
    } else {
      return pickTeam;
    }
  }
}

export default EditFormContainer;
