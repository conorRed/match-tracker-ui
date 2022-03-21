import React, { Component } from "react";

export default function Scoreboard({ goals, points }) {
  function format(count) {
    if (count > 10) {
      return `${count}`;
    } else {
      return `0${count}`;
    }
  }

  return (
    <div className="text-center">
      <h2 className="display-5">
        {format(goals)} - {format(points)}
      </h2>
    </div>
  );
}
