import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Bench(props) {
  return (
    <Container>
      <Row>
        <Col>{props.children}</Col>
      </Row>
    </Container>
  );
}
