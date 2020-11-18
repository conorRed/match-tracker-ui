import React, { Component } from "react";
import { CSVLink, CSVDownload } from "react-csv";
import { FaDownload } from "react-icons/fa";

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: props.rows,
      headers: props.headers,
    };
  }

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            {this.state.headers.map((header) => {
              return (
                <th key={header} scope="col">
                  {header}
                </th>
              );
            })}
            <th>
              <CSVLink data={this.props.rows}>
                <FaDownload />
              </CSVLink>
            </th>
          </tr>
        </thead>
        <tbody>
          {this.props.rows.map((row, index) => {
            return (
              <tr>
                <th>{index + 1}</th>
                {this.state.headers.map((header) => {
                  return <td>{row[header.toLowerCase()]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default DataTable;