import React from "react";
import { render } from "react-dom";
import { screen } from "@testing-library/react";
import { GameDashboard } from "./Dashboard";
import GameTimer from "../timer";
import { MemoryRouter } from "react-router";

test("happy path", () => {
  render(
    <MemoryRouter initialEntries={["/games/1"]}>
      <GameDashboard timer={<GameTimer />} />
    </MemoryRouter>
  );
  screen.debug();
});
