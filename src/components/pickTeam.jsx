import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
class PickTeam extends Component {
  render() {
    this.style = {
      borderRadius: 2,
    };
    return (
      <>
        <Modal.Body>
          <Modal.Title id="contained-modal-title-vcenter">
            Pick Team
          </Modal.Title>
          <div style={this.style}>
            <form onSubmit={this.props.submitTeamForm}>
              <div className="form-group">
                <select
                  className="custom-select"
                  onChange={this.props.selectTeam}
                  value={this.props.defaultValue}
                >
                  {this.props.teams.map((team) => {
                    return <option value={team.name}>{team.name}</option>;
                  })}
                </select>
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </Modal.Body>
      </>
    );
  }
}

export default PickTeam;
