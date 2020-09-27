import React, { Component } from "react";
import Player from "./player";

class Team extends Component {
  state = {
    lineup: this.props.lineup.lineup,
    name: this.props.name,
    colour: this.props.colour,
  };
  render() {
    return (
      <div className="container">
        <h2 className="display-5 text-center">{this.state.name}</h2>
        {this.state.lineup.map((line, index) => {
          return (
            <div className="row" key={index}>
              {line.players.map((player) => {
                return (
                  <Player
                    addData={this.props.addData}
                    key={player.number}
                    number={player.number}
                    name={player.name}
                    colour={this.state.colour}
                    team={this.state.name}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Team;
