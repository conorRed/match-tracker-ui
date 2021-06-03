import React, { Component } from "react";

import EventsModal from "./eventsModal";
class Player extends Component {
  state = {
    name: this.props.name,
    number: this.props.number,
    colour: this.props.colour,
    events: [],
    areEventsLoaded: false,
    modalShow: false,
  };

  styles = {
    padding: 12,
    display: "block",
    textAlign: "center",
    position: "relative",
  };
  buttonStyle = {
    borderColor: this.state.colour,
    color: this.state.colour,
  };

  dropdownIconStyle = {
    borderColor: "transparent",
    padding: 0,
    marginLeft: 10,
  };

  showEventModal = (show) => {
    this.setState({ modalShow: show });
  };

  render() {
    return (
      <div style={this.styles} className="col player">
        <button
          className="btn player-select-button"
          onClick={() => this.showEventModal(true)}
          style={this.buttonStyle}
          aria-haspopup="true"
          aria-expanded="false"
        >
          {this.props.number}
        </button>
        <EventsModal
          show={this.state.modalShow}
          addData={this.props.addData}
          number={this.state.number}
          name={this.state.name}
          events={this.props.events}
          team={this.props.team}
          onHide={() => this.showEventModal(false)}
        />
      </div>
    );
  }
}

export default Player;
