import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import LoadingSpinner from "../loadingSpinner";
import { Container, Row } from "react-bootstrap";
import { getOutcomes, getEvents } from "../../api/helpers.js";
import { useEffect, useState } from "react";
export default function EventOptionAndOutcomeModal(props) {
  let [events, setEvents] = useState(null);
  let [outcomes, setOutcomes] = useState(null);
  let [chosenEvent, setChosenEvent] = useState(null);

  // set event option object using the PARENT setter
  function setChosenEventOnParent(eventOptionId) {
    props.updateEventOption(getEventObjForId(eventOptionId));
  }
  // set outcome id using the PARENT setter
  function setChosenOutcome(outcomeId) {
    props.updateEventOutcome(outcomeId);
  }

  async function fetchAndSetEvents() {
    let apiResponse = await getEvents();
    if (!apiResponse.ok) {
      console.error(apiResponse);
      return;
    }
    let events = await apiResponse.json();
    setEvents(events.items);
    props.updateEventOption(events.items[0]);
    props.updateEventOutcome(events.items[0].outcomes[0].id);
    setOutcomes(events.items[0].outcomes);
  }

  useEffect(() => {
    fetchAndSetEvents();
  }, []);

  function getEventObjForId(id) {
    return events.filter((e) => e.id === id)[0];
  }
  function outcomesForEvent(id) {
    return getEventObjForId(id).outcomes;
  }

  return (
    <Modal.Body>
      <Container>
        <Row className="center">
          <Form.Group className="col text-center">
            <Form.Label>Event</Form.Label>
            {events ? (
              <select
                className="custom-select"
                defaultValue={events[0].id}
                onChange={(event) => {
                  setChosenEventOnParent(parseInt(event.target.value));
                  let newOutcomes = outcomesForEvent(
                    parseInt(event.target.value)
                  );
                  setOutcomes(newOutcomes);
                  props.updateEventOutcome(newOutcomes[0].id);
                }}
              >
                {events.map((event) => {
                  return (
                    <option key={event.id} value={event.id}>
                      {event.name}
                    </option>
                  );
                })}
              </select>
            ) : (
              <LoadingSpinner />
            )}
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className="col text-center">
            <Form.Label>Outcome</Form.Label>
            {outcomes ? (
              <select
                defaultValue={outcomes[0].id}
                className="custom-select"
                onChange={(e) => setChosenOutcome(parseInt(e.target.value))}
              >
                {outcomes.map((outcome) => {
                  return (
                    <option key={outcome.id} value={outcome.id}>
                      {outcome.name}
                    </option>
                  );
                })}
              </select>
            ) : (
              <LoadingSpinner />
            )}
          </Form.Group>
        </Row>
      </Container>
    </Modal.Body>
  );
}
