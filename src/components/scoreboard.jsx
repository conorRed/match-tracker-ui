import React, { Component } from "react";

class Scoreboard extends Component {
  render() {
    return (
      <div className="container text-center">
        <h2 className="display-5">
          {this.props.goals} - {this.props.points}
        </h2>
      </div>
    );
  }
}
export default Scoreboard;
