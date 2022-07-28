import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import LoadingSpinner from "../loadingSpinner";
import { Container, Row } from "react-bootstrap";
import { getPlayers } from "../../api/helpers";
import { useEffect, useState } from "react";
export default function SubstituteModal(props) {
  function playerObjbyNumber(number) {
    return props.players.filter((p) => p.number === number)[0];
  }
  return (
    <Modal.Body>
      <Container>
        <Row className="center">
          <Form.Group className="col text-center">
            <Form.Label>Off</Form.Label>
            {props.players ? (
              <select
                className="custom-select"
                onChange={(e) =>
                  props.setSubOff(playerObjbyNumber(parseInt(e.target.value)))
                }
              >
                {props.players.map((player) => {
                  return (
                    <option key={player.number} value={player.number}>
                      {player.number}
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
            <Form.Label>On</Form.Label>
            {props.players ? (
              <select
                className="custom-select"
                onChange={(e) =>
                  props.setSubOn(playerObjbyNumber(parseInt(e.target.value)))
                }
              >
                {props.players.map((player) => {
                  return (
                    <option key={player.number} value={player.number}>
                      {player.number}
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
