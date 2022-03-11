import React from "react";

import { useState } from "react";
import { Table } from "react-bootstrap";

export default function EventsTable({ events }) {
  let [headers] = useState(["id", "name", "outcome", "pitchzone", "timestamp"]);
  return (
    <Table>
      <thead>
        <tr>
          {headers.map((header) => {
            return (
              <th key={header} scope="col">
                {header}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {events.map((event) => {
          return <EventRow key={event.id} event={event} />;
        })}
      </tbody>
    </Table>
  );
}

function EventRow({ event }) {
  console.log(event);
  return (
    <tr>
      <td> {event.id} </td>
      <td> {event.event_option ? event.event_option.name : ""} </td>
      <td> {event.outcome.name} </td>
      <td> {event.pitchzone} </td>
      <td> {event.timestamp}</td>
    </tr>
  );
}
