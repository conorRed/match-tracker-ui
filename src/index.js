import React, { Component } from "react";
import ReactDom from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./js/script.js";
import TeamSheet from "./components/teamSheet";
import Timer from "./components/timer";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import DataTable from "./components/tabs/dataTable";
import TeamForm from "./components/forms/teamForm";
import Stats from "./components/tabs/stats";

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

  teamSelect = (team) => {
    let oldTeams = this.state.teams.slice();
    oldTeams.push(team);
    this.setState({ teams: oldTeams });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-10">
            <div className="row">
              <div className="col-5">
                <TeamSheet
                  teamSelect={this.teamSelect}
                  addData={this.updateTable}
                />
              </div>
              <div className="col-2">
                <Timer ref={this.state.timerRef} />
              </div>
              <div className="col-5">
                <TeamSheet
                  teamSelect={this.teamSelect}
                  addData={this.updateTable}
                />
              </div>
            </div>
            <div>
              <Tab.Container defaultActiveKey="data">
                <div className="row">
                  <div className="col-sm-3">
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link eventKey="data">Data</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="stats">Stats</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="create-team">Create Team</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </div>
                  <div className="col-sm-9">
                    <Tab.Content>
                      <Tab.Pane eventKey="data">
                        <DataTable
                          rows={this.state.data}
                          headers={this.tableHeaders}
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey="stats">
                        <div className="row">
                          {this.state.teams.map((team) => {
                            return (
                              <div className="col">
                                <Stats team={team} data={this.state.data} />
                              </div>
                            );
                          })}
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="create-team">
                        <TeamForm />
                      </Tab.Pane>
                    </Tab.Content>
                  </div>
                </div>
              </Tab.Container>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDom.render(<Index />, document.getElementById("root"));
