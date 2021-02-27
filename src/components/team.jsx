import React, { Component } from "react";
import Player from "./player";
import { getEvents } from "../api/helpers";
import LineupDefault from "./lineups/default";
import LoadingSpinner from "./loadingSpinner";
class Team extends Component {
  state = {
    name: this.props.name,
    colour: this.props.colour,
    arePlayersLoaded: false,
    areEventsLoaded: false,
    events: [],
    players: [],
  };
  componentDidMount() {
    fetch("/api/teams/" + this.props.team_id + "/players")
      .then((res) => res.json())
      .then((result) => {
        if (!(result === 0)) {
          this.setState({ arePlayersLoaded: true, players: result["data"] });
        } else {
          this.setState({ arePlayersLoaded: false });
        }

        getEvents()
          .then((res) => {
            if (!(result === 0)) {
              this.setState({ areEventsLoaded: true, events: res });
            } else {
              this.setState({ arePlayersLoaded: false });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    let playerList = [];
    const { arePlayersLoaded, areEventsLoaded } = this.state;
    if (areEventsLoaded && arePlayersLoaded) {
      return (
        <div className="container">
          <LineupDefault
            players={this.state.players.map((player, index) => {
              return (
                <Player
                  addData={this.props.addData}
                  events={this.state.events}
                  key={player.number}
                  number={player.number}
                  name={player.name}
                  colour={this.state.colour}
                  team={this.state.name}
                />
              );
            })}
          />
        </div>
      );
    } else {
      return <LoadingSpinner />;
    }
  }
}

export default Team;
