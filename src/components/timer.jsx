import React, { Component } from "react";
import { FaPlay, FaPause, FaStop } from "react-icons/fa";
import { Button } from "react-bootstrap";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: 0,
      seconds: 0,
      hours: 0,
      stopped: false,
      start: false,
      pause: false,
      interval: null,
      timestamp: "",
    };
  }
  setTime() {
    let seconds = this.state.seconds;
    let minutes = this.state.minutes;
    if (++seconds === 60) {
      this.setState({
        minutes: this.state.minutes + 1,
        seconds: 0,
      });
    } else if (++minutes === 60) {
      this.setState({
        hours: this.state.hours + 1,
        minutes: 0,
        seconds: this.state.seconds + 1,
      });
    } else {
      this.setState({ seconds: ++this.state.seconds });
    }
  }

  resetTimer() {
    this.setState({
      hours: 0,
      seconds: 0,
      minutes: 0,
      start: false,
    });
    clearInterval(this.state.interval);
  }

  startTimer() {
    if (!this.state.start) {
      this.setState({
        interval: window.setInterval(() => {
          this.setTime();
        }, 1000),
        start: true,
      });
    } else {
      return;
    }
  }

  pauseTimer() {
    this.setState({
      pause: !this.state.pause,
      start: false,
    });
    clearInterval(this.state.interval);
  }

  format(hours, minutes, seconds) {
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
  render() {
    return (
      <div className="container">
        <div className="row" style={{ textAlign: "center" }}>
          <h2 className="display-5">
            {this.format(
              this.state.hours,
              this.state.minutes,
              this.state.seconds
            )}
          </h2>
        </div>
        <div>
          <div className="row" style={{ textAlign: "center" }}>
            <Button
              className="col-3"
              onClick={() => {
                this.startTimer();
              }}
              style={{ fontSize: 10, margin: 3, marginLeft: 5 }}
            >
              <FaPlay />
            </Button>
            <Button
              style={{ fontSize: 10, margin: 3 }}
              onClick={() => {
                this.pauseTimer();
              }}
              className="col-3"
            >
              <FaPause />
            </Button>
            <Button
              className="col-3"
              style={{ fontSize: 10, margin: 3 }}
              onClick={() => {
                this.resetTimer();
              }}
            >
              <FaStop />
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
export default Timer;
