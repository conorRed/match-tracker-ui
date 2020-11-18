import React, { Component } from "react";
import { eventsCall } from "../../helpers";

class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: props.rows,
      events: [],
      data: [],
      areEventsLoaded: false,
    };
  }
  componentDidMount() {
    eventsCall()
      .then((res) => {
        this.setState({ areEventsLoaded: true, events: res });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  frequencyOfEvent(event, team) {
    let totalEvents = this.props.data.filter(
      (row) => row.event == event && row.team == team
    );
    console.log(totalEvents);
    return totalEvents.length;
  }

  scoreEfficiency(team) {
    let totalShots = this.frequencyOfEvent("Shot", team);
    let totalScores = this.props.data.filter(
      (row) => ["Point", "Goal"].includes(row.outcome) && row.team == team
    );

    return ((totalScores.length / totalShots) * 100).toFixed(1);
  }
  kickoutEfficiency(team) {
    let totalShots = this.frequencyOfEvent("Kickout", team);
    let totalScores = this.props.data.filter(
      (row) => ["Clean"].includes(row.outcome) && row.team == team
    );

    return ((totalScores.length / totalShots) * 100).toFixed(1);
  }
  render() {
    return (
      <>
        <div className="row">
          <h3>{this.props.team.name}</h3>
        </div>

        {this.state.events.map((event) => {
          return (
            <div className="row">
              <div className="col">{event.name}</div>
              <div className="col">
                {this.frequencyOfEvent(event.name, this.props.team.name)}
              </div>
            </div>
          );
        })}
        <div>
          Scoring Effeciency: {this.scoreEfficiency(this.props.team.name)}%
        </div>
        <div>
          Kickout Effeciency: {this.kickoutEfficiency(this.props.team.name)}%
        </div>
      </>
    );
  }
}

export default Stats;
