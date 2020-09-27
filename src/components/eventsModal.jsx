import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { eventsCall } from "../helpers";
import Form from "react-bootstrap/Form";
import "../stylesheet/stylesheet.css";
import pitch from "../img/pitch.png";
class EventsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      areEventsLoaded: false,
      event: null,
      outcomes: [],
      outcome: null,
      showPitchModal: false,
    };
  }
  componentDidMount() {
    eventsCall().then((res) => {
      this.setState(
        {
          areEventsLoaded: true,
          events: res,
          event: res[0],
        },
        function () {
          this.setState({
            outcomes: this.state.event.outcomes,
            outcome: this.state.event.outcomes[0],
          });
        }
      );
    });
  }

  openPitchModal(show) {
    this.setState({ showPitchModal: show });
  }

  setOutcomesSelect = (e) => {
    let currentEvent = e.target.value;
    const newLocal = this.state.events.filter((event) => {
      return event.event === currentEvent;
    });

    this.setState({ event: newLocal[0], outcomes: newLocal[0].outcomes });
  };

  onOutcomeSelect = (e) => {
    this.setState({ outcome: e.target.value });
  };

  saveData = () => {
    this.props.addData({
      event: this.state.event.event,
      outcome: this.state.outcome,
      team: this.props.team,
      player: this.props.name,
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
          />
          <PitchModal show={this.state.showPitchModal} />
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
              data-pitchzone="Cornerback-Left"
            ></button>
            <button
              className="col pitchzone"
              data-pitchzone="Mid-Left"
            ></button>
            <button
              className="col pitchzone"
              data-pitchzone="CornerForward-Left"
            ></button>
          </div>
          <div className="row">
            <button
              className="col pitchzone"
              data-pitchzone="Fullback"
            ></button>
            <button
              className="col pitchzone"
              data-pitchzone="Center Field"
            ></button>
            <button
              className="col pitchzone"
              data-pitchzone="Fullforward"
            ></button>
          </div>
          <div className="row">
            <button
              className="col pitchzone"
              value="CornerForward-Right"
            ></button>
            <button className="col pitchzone" value="Mid-Right"></button>
            <button
              className="col pitchzone"
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
                return <option key={index}>{event.event}</option>;
              })}
            </select>
          </Form.Group>
        </div>
        <div className="row">
          <Form.Group className="col text-center">
            <Form.Label>Outcome</Form.Label>
            <select className="custom-select" onChange={props.onOutcomeSelect}>
              {props.outcomes.map((outcome) => {
                return <option key={outcome}>{outcome}</option>;
              })}
            </select>
          </Form.Group>
        </div>
      </div>
      <PitchModal />
    </Modal.Body>
  ) : null;
}

export default EventsModal;
