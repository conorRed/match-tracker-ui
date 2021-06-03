import React, { Component } from "react";

class LineupDefault extends Component {
  state = {
    players: this.props.players,
  };
  render() {
    return (
      <div>
        <div className="row">
          <div className="col">{this.state.players[0]}</div>
        </div>
        <div className="row">
          <div className="col">{this.state.players[1]}</div>
          <div className="col">{this.state.players[2]}</div>
          <div className="col">{this.state.players[3]}</div>
        </div>
        <div className="row">
          <div className="col">{this.state.players[4]}</div>
          <div className="col">{this.state.players[5]}</div>
          <div className="col">{this.state.players[6]}</div>
        </div>
        <div className="row">
          <div className="col">{this.state.players[7]}</div>
          <div className="col">{this.state.players[8]}</div>
        </div>
        <div className="row">
          <div className="col">{this.state.players[9]}</div>
          <div className="col">{this.state.players[10]}</div>
          <div className="col">{this.state.players[11]}</div>
        </div>
        <div className="row">
          <div className="col">{this.state.players[12]}</div>
          <div className="col">{this.state.players[13]}</div>
          <div className="col">{this.state.players[14]}</div>
        </div>
      </div>
    );
  }
}

export default LineupDefault;
