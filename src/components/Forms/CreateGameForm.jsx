import React from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { createGame, getTeams } from "../../api/helpers";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import LoadingSpinner from "../loadingSpinner";

export default function CreateGameForm({ token }) {
  let [name, setName] = useState("");
  let [homeTeam, setHomeTeam] = useState(1);
  let [awayTeam, setAwayTeam] = useState(1);
  let [teams, setTeams] = useState(null);
  let navigate = useNavigate();

  async function submitForm(e) {
    e.preventDefault();
    let game = { name: name, home_team_id: homeTeam, away_team_id: awayTeam };
    console.log(game);
    let apiResponse = await createGame(token, game);
    if (!apiResponse.ok) {
      console.error(apiResponse);
    }
    let createdGame = await apiResponse.json();
    navigate(`/games/${createdGame.id}`);
  }
  useEffect(() => {
    getAndSetTeams();
  }, []);

  async function getAndSetTeams() {
    let apiResponse = await getTeams();
    if (!apiResponse.ok) {
      console.error(apiResponse);
    }
    let teams = await apiResponse.json();
    setTeams(teams.items);
  }

  return (
    <Form
      onSubmit={(e) => {
        submitForm(e);
      }}
    >
      <Form.Group controlId="formGameName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Enter name"
        />
      </Form.Group>
      {teams ? (
        <>
          <Form.Label>Home Team</Form.Label>
          <select
            className="custom-select"
            value={homeTeam}
            onChange={(e) => setHomeTeam(e.target.value)}
          >
            {teams.map((team) => {
              return (
                <option key={team.name} value={team.id}>
                  {team.name}
                </option>
              );
            })}
          </select>
          <br />
          <Form.Label>Away Team</Form.Label>
          <select
            className="custom-select"
            value={awayTeam}
            onChange={(e) => setAwayTeam(e.target.value)}
          >
            {teams.map((team) => {
              return (
                <option key={team.name} value={team.id}>
                  {team.name}
                </option>
              );
            })}
          </select>
        </>
      ) : (
        <LoadingSpinner />
      )}
      <br />
      <br />
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
