import React, { Component } from "react";
import ReactDom from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./js/script.js";
import TeamSheet from "./components/teamSheet";
import Timer from "./components/timer";
import DataTable from "./components/dataTable";

class Index extends Component {
  state = {
    error: null,
    isLoaded: false,
    teams: [],
    data: [],
    timerRef: React.createRef(),

    modalShow: false,
  };
  showEditEventModal = (show) => {
    this.setState({ modalShow: show });
  };

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
  updateTable = (da) => {
    console.log(this.state.timerRef.current);
    let timestamp = this.format(
      this.state.timerRef.current.state.hours,
      this.state.timerRef.current.state.minutes,
      this.state.timerRef.current.state.seconds
    );

    da["timestamp"] = timestamp;
    console.log("da", da);
    this.setState((prevState) => ({
      data: [...prevState.data, da],
    }));
  };
  tableHeaders = [
    "Team",
    "Player",
    "Event",
    "Outcome",
    "Pitchzone",
    "Timestamp",
  ];
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-10">
            <div className="row">
              <div className="col-5">
                <TeamSheet addData={this.updateTable} />
              </div>
              <div className="col-2">
                <Timer ref={this.state.timerRef} />
              </div>
              <div className="col-5">
                <TeamSheet addData={this.updateTable} />
              </div>
            </div>
            <div className="row">
              <DataTable rows={this.state.data} headers={this.tableHeaders} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDom.render(<Index />, document.getElementById("root"));
