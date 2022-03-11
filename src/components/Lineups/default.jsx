import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function LineupDefault(props) {
  return (
    <Container>
      <Row>
        <Col>{props.goalkeeper}</Col>
      </Row>
      <Row>
        {props.fullBackLine.map((p) => {
          return <Col>{p}</Col>;
        })}
      </Row>
      <Row>
        {props.halfBackLine.map((p) => {
          return <Col>{p}</Col>;
        })}
      </Row>
      <Row>
        {props.midField.map((p) => {
          return <Col>{p}</Col>;
        })}
      </Row>
      <Row>
        {props.halfForwardLine.map((p) => {
          return <Col>{p}</Col>;
        })}
      </Row>
      <Row>
        {props.fullForwardLine.map((p) => {
          return <Col>{p}</Col>;
        })}
      </Row>
    </Container>
  );
}
