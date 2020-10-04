import React, { Component } from "react";
import Team from "./team";
import { teamsCall } from "../helpers";
import PickTeam from "./pickTeam";
import Scoreboard from "./scoreboard";
import LoadingSpinner from "./loadingSpinner";

class TeamSheet extends Component {
  state = {
    teams: [],
    teamImgUrl: "https://picsum.photos/200",
    pickedTeam: null,
    isTeamPicked: false,
    isLoaded: false,
    goals: 0,
    points: 0,
  };
  componentDidMount() {
    teamsCall().then((res) => {
      if (res["data"].length === 0) {
        this.setState({ isLoaded: false });
      } else {
        this.setState({
          isLoaded: true,
          pickedTeam: res["data"][0],
          teams: res["data"],
        });
      }
    });
  }
  selectTeam = (e) => {
    e.preventDefault();
    this.setState({
      pickedTeam: this.state.teams.filter(
        (team) => team.name === e.target.value
      )[0],
    });
  };
  submitTeamForm = (e) => {
    e.preventDefault();
    this.setState({
      isTeamPicked: true,
    });
  };
  addData = (data) => {
    switch (data.outcome) {
      case "Goal":
        this.setState({ goals: this.state.goals + 1 });
        break;
      case "Point":
        this.setState({ points: this.state.points + 1 });
        break;
      default:
        console.log("Score couldn't be calculated");
    }
    this.props.addData(data);
  };
  render() {
    const { isLoaded, teams, isTeamPicked } = this.state;
    console.log(this.state.goals);
    if (isLoaded) {
      if (isTeamPicked) {
        return (
          <div className="container">
            <h2 className="display-5 text-center">
              {this.state.pickedTeam.name}
            </h2>
            <Scoreboard
              key="scoredboard"
              goals={this.state.goals}
              points={this.state.points}
            />
            <Team
              name={this.state.pickedTeam.name}
              colour={this.state.pickedTeam.colour}
              team_id={this.state.pickedTeam.id}
              addData={this.addData}
            />
          </div>
        );
      } else {
        return (
          <div className="container">
            <div className="row">
              <PickTeam
                defaultVale={this.state.pickedTeam}
                teams={this.state.teams}
                selectTeam={this.selectTeam}
                submitTeamForm={this.submitTeamForm}
              />
            </div>
          </div>
        );
      }
    } else {
      return <LoadingSpinner />;
    }
  }
}

export default TeamSheet;
