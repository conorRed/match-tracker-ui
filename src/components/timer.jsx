import React from "react";
import { FaPlay, FaPause, FaStop } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";

export default function GameTimer({
  start,
  pause,
  setStart,
  setPause,
  setTimestamp,
}) {
  let [seconds, setSeconds] = useState(0);
  let [minutes, setMinutes] = useState(0);
  let [hours, setHours] = useState(0);
  let [interval, setInterval] = useState(null);

  function setTime() {
    if (pause) {
      return;
    }
    if (seconds + 1 === 60) {
      setSeconds(0);
      setMinutes((prevMinutes) => prevMinutes + 1);
    } else if (minutes + 1 === 60) {
      setHours((prevHours) => prevHours + 1);
      setMinutes(0);
      setSeconds((prevSec) => prevSec + 1);
    } else {
      setSeconds((prevSec) => prevSec + 1);
    }
  }

  function resetTimer() {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setStart(false);
    clearInterval(interval);
  }
  function startTimer() {
    if (!start) {
      setInterval(window.setInterval(setTime, 1000));
      setStart(true);
    } else {
      return;
    }
  }

  function pauseTimer() {
    setPause(!pause);
    setStart(false);
    setTimestamp(format(hours, minutes, seconds));
    clearInterval(interval);
  }

  function format(hours, minutes, seconds) {
    hours = hours + "";
    if (hours.length === 1) {
      hours = "0" + hours;
    }
    minutes = minutes + "";
    if (minutes.length === 1) {
      minutes = "0" + minutes;
    }
    seconds = seconds + "";
    if (seconds.length === 1) {
      seconds = "0" + seconds;
    }
    let timestamp = hours + ":" + minutes + ":" + seconds;
    return timestamp;
  }

  if (pause) {
    pauseTimer();
  }

  return (
    <>
      <Container>
        <Row style={{ textAlign: "center" }}>
          <Col>
            <h2 className="display-5">{format(hours, minutes, seconds)}</h2>
          </Col>
        </Row>
        <Row style={{ textAlign: "center" }}>
          <Col xs={4}>
            <Button
              onClick={() => {
                startTimer();
              }}
            >
              <FaPlay />
            </Button>
          </Col>
          <Col xs={4}>
            <Button
              onClick={() => {
                pauseTimer();
              }}
            >
              <FaPause />
            </Button>
          </Col>
          <Col xs={4}>
            <Button
              onClick={() => {
                resetTimer();
              }}
            >
              <FaStop />
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
