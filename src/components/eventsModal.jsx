import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../stylesheet/stylesheet.css";
import pitch from "../img/pitch.png";
import LoadingSpinner from "./loadingSpinner";
import { getOutcomesForEvent } from "../api/helpers.js";
class EventsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: this.props.events,
      areOutcomesLoaded: true,
      event: this.props.events[0],
      outcomes: this.fetchInitialOutcomes(this.props.events[0]),
      outcome: null,
      pitchzone: null,
      showPitchModal: false,
    };
  }

  openPitchModal(show) {
    this.setState({ showPitchModal: show });
  }

  fetchInitialOutcomes(event) {
    getOutcomesForEvent(event.id)
      .then((result) => {
        if (!(result.length === 0)) {
          this.setState({
            areOutcomesLoaded: true,
            outcomes: result,
            outcome: result[0].name,
          });
        } else {
          this.setState({ areOutcomesLoaded: false });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setOutcomesSelect = (e) => {
    let currentEvent = e.target.value;
    const newLocal = this.state.events.filter((event) => {
      return event.name === currentEvent;
    });
    getOutcomesForEvent(newLocal[0].id)
      .then((res) => res.json())
      .then((result) => {
        if (!(result.length === 0)) {
          this.setState({
            areOutcomesLoaded: true,
            outcomes: result,
            outcome: result[0].name,
            event: newLocal[0],
          });
        } else {
          this.setState({ areOutcomesLoaded: false });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onOutcomeSelect = (e) => {
    this.setState({ outcome: e.target.value });
  };
  pitchSelect = (e) => {
    this.setState({ pitchzone: e.target.value });
  };
  saveData = () => {
    this.props.addData({
      event: this.state.event.name,
      outcome: this.state.outcome,
      team: this.props.team,
      player: this.props.name,
      pitchzone: this.state.pitchzone,
    });
    this.setState({
      showPitchModal: false,
    });
    this.props.onHide();
  };

  doneButton = (<Button onClick={() => this.saveData()}>Done</Button>);

  nextButton = (
    <Button onClick={() => this.openPitchModal(true)}>Next</Button>
  );
  render() {
    return (
      <>
        <Modal
          show={this.props.show}
          onHide={this.props.onHide}
          size="sm"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Define Event
            </Modal.Title>
          </Modal.Header>
          <EventModal
            show={!this.state.showPitchModal}
            setOutcomesSelect={this.setOutcomesSelect}
            onOutcomeSelect={this.onOutcomeSelect}
            events={this.state.events}
            outcomes={this.state.outcomes}
            areOutcomesLoaded={this.state.areOutcomesLoaded}
          />
          <PitchModal
            show={this.state.showPitchModal}
            pitchSelect={this.pitchSelect}
          />
          <Modal.Footer>
            <Button onClick={() => this.openPitchModal(false)}>Previous</Button>

            {this.state.showPitchModal ? this.doneButton : this.nextButton}
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

function PitchModal(props) {
  return props.show ? (
    <Modal.Body>
      <img
        src={pitch}
        className="img-fluid"
        alt="Gaa pitch"
        width="100%"
        id="pitch-image"
      />
      <div className="overlay">
        <div className="container" style={{ height: 100 }}>
          <div className="row">
            <button
              className="col pitchzone"
              data-dismiss="modal"
              onClick={props.pitchSelect}
              value="Cornerback-Left"
            ></button>
            <button
              className="col pitchzone"
              onClick={props.pitchSelect}
              value="Mid-Left"
            ></button>
            <button
              className="col pitchzone"
              onClick={props.pitchSelect}
              value="CornerForward-Left"
            ></button>
          </div>
          <div className="row">
            <button
              className="col pitchzone"
              onClick={props.pitchSelect}
              value="Fullback"
            ></button>
            <button
              className="col pitchzone"
              onClick={props.pitchSelect}
              value="Center Field"
            ></button>
            <button
              className="col pitchzone"
              onClick={props.pitchSelect}
              value="Fullforward"
            ></button>
          </div>
          <div className="row">
            <button
              className="col pitchzone"
              onClick={props.pitchSelect}
              value="CornerForward-Right"
            ></button>
            <button
              className="col pitchzone"
              onClick={props.pitchSelect}
              value="Mid-Right"
            ></button>
            <button
              className="col pitchzone"
              onClick={props.pitchSelect}
              value="CornerForward-Right"
            ></button>
          </div>
        </div>
      </div>
    </Modal.Body>
  ) : null;
}

function EventModal(props) {
  return props.show ? (
    <Modal.Body className="container-fluid">
      <div className="container">
        <div className="row center">
          <Form.Group className="col text-center">
            <Form.Label>Event</Form.Label>
            <select
              className="custom-select"
              onChange={props.setOutcomesSelect}
            >
              {props.events.map((event, index) => {
                return <option key={index}>{event.name}</option>;
              })}
            </select>
          </Form.Group>
        </div>
        <div className="row">
          <Form.Group className="col text-center">
            <Form.Label>Outcome</Form.Label>
            {props.areOutcomesLoaded ? (
              <select
                className="custom-select"
                onChange={props.onOutcomeSelect}
              >
                {props.outcomes.map((outcome) => {
                  return <option key={outcome.id}>{outcome.name}</option>;
                })}
              </select>
            ) : (
              <LoadingSpinner />
            )}
          </Form.Group>
        </div>
      </div>
      <PitchModal />
    </Modal.Body>
  ) : null;
}

export default EventsModal;
