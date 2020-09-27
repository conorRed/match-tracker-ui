import React, { Component } from "react";
import Team from "./team";
import { teamsCall } from "../helpers";
import LoadingSpinner from "./loadingSpinner";

class TeamSheet extends Component {
  state = {
    teams: [],
    teamImgUrl: "https://picsum.photos/200",
    isLoaded: false,
  };
  componentDidMount() {
    teamsCall().then((res) => {
      this.setState({ isLoaded: true, teams: res });
    });
  }
  render() {
    const { isLoaded, teams } = this.state;
    if (isLoaded) {
      return (
        <div className="container">
          <div className="row">
            {teams.map((team) => (
              <div key={team.team} className="col">
                <Team
                  addData={this.props.addData}
                  lineup={team}
                  name={team.team}
                  colour={team.colour}
                />
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return <LoadingSpinner />;
    }
  }
}

export default TeamSheet;
