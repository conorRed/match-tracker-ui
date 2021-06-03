import React, { Component } from "react";
import LoadingSpinner from "./loadingSpinner";
import { getTeams } from "../api/helpers.js";
import Select from "react-select";
class TeamDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      teamsLoaded: false,
      pickedTeam: null,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    getTeams().then((res) => {
      if (res.length === 0) {
        this.setState({ teamsLoaded: false });
      } else {
        this.setState({
          teamsLoaded: true,
          pickedTeam: res[0],
          teams: res,
        });
      }
    });
  }

  onSubmit(event) {
    this.props.submitTeamForm(this.state.pickedTeam);
  }

  selectTeam = (e) => {
    this.setState({
      pickedTeam: this.state.teams.filter((team) => team.name === e.value)[0],
    });
  };

  teamOptions = () => {
    let options = [];
    const teams = this.state.teams;
    for (let index in teams) {
      options.push({
        value: teams[index].name,
        label: teams[index].name,
        color: teams[index].color,
      });
    }
    return options;
  };

  render() {
    this.style = {
      borderRadius: 2,
    };
    if (this.state.teamsLoaded) {
      return (
        <div style={this.style}>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <Select
                onChange={this.selectTeam}
                className="basic-single"
                classNamePrefix="select"
                name="team"
                options={this.teamOptions()}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Choose
            </button>
          </form>
        </div>
      );
    } else {
      return (
        <div style={this.style}>
          <LoadingSpinner />
        </div>
      );
    }
  }
}

export default TeamDropdown;
