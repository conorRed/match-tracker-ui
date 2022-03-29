import React, { Component } from "react";
import { Col } from "react-bootstrap";

export function PlayerFunction({ name, number, colour, actionFunc }) {
  let styles = {
    padding: 12,
    display: "block",
    textAlign: "center",
    position: "relative",
  };
  let buttonStyle = {
    borderColor: colour,
    color: colour,
  };

  let dropdownIconStyle = {
    borderColor: "transparent",
    padding: 0,
    marginLeft: 10,
  };
  return (
    <Col style={styles}>
      <button
        onClick={(e) => actionFunc(number)}
        className="btn player-select-button"
        style={buttonStyle}
        aria-haspopup="true"
        aria-expanded="false"
      >
        {number}
      </button>
    </Col>
  );
}
