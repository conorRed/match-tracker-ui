import React, { Component } from "react";
import ReactDom from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./js/script.js";
import TeamSheet from "./components/teamSheet";
import DataTable from "./components/dataTable";

class Index extends Component {
  state = {
    error: null,
    isLoaded: false,
    teams: [],
    data: [],
  };

  updateTable = (da) => {
    this.setState((prevState) => ({
      data: [...prevState.data, da],
    }));
  };
  tableHeaders = ["Team", "Player", "Event", "Outcome"];
  render() {
    return (
      <div className="container">
        <div className="row">
          <TeamSheet addData={this.updateTable} />
        </div>
        <div className="row">
          <DataTable rows={this.state.data} headers={this.tableHeaders} />
        </div>
      </div>
    );
  }
}

ReactDom.render(<Index />, document.getElementById("root"));
