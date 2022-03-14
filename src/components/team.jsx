import React from "react";
import { getPlayers, getTeam } from "../api/helpers";
import { useEffect, useState } from "react";
import LineupDefault from "./Lineups/default";
import LoadingSpinner from "./loadingSpinner";
import { PlayerFunction } from "./player";

export function TeamFunction(props) {
  let token = props.token;
  let [players, setPlayers] = useState(null);
  let [team, setTeam] = useState(null);

  async function fetchAndSetTeam(token) {
    let apiResponse = await getTeam(props.id);
    if (!apiResponse.ok) {
      console.error(apiResponse);
      return;
    }
    let team = await apiResponse.json();
    setTeam(team);
  }
  async function fetchAndSetPlayers(token) {
    let apiResponse = await getPlayers(props.id);
    if (!apiResponse.ok) {
      console.error(apiResponse);
      return;
    }
    let players = await apiResponse.json();
    setPlayers(players.items);
  }
  useEffect(() => {
    fetchAndSetPlayers(token);
    fetchAndSetTeam(token);
  }, [token]);
  if (!players || !team) {
    return <LoadingSpinner />;
  }
  return (
    <LineupDefault
      goalkeeper={
        <PlayerFunction
          actionFunc={props.addEventForPlayer}
          {...players[0]}
          colour={team.colour}
        />
      }
      fullBackLine={[
        <PlayerFunction
          actionFunc={props.addEventForPlayer}
          {...players[1]}
          colour={team.colour}
        />,
        <PlayerFunction
          actionFunc={props.addEventForPlayer}
          {...players[2]}
          colour={team.colour}
        />,
        <PlayerFunction
          actionFunc={props.addEventForPlayer}
          {...players[3]}
          colour={team.colour}
        />,
      ]}
      halfBackLine={[
        <PlayerFunction
          actionFunc={props.addEventForPlayer}
          {...players[4]}
          colour={team.colour}
        />,
        <PlayerFunction
          actionFunc={props.addEventForPlayer}
          {...players[5]}
          colour={team.colour}
        />,
        <PlayerFunction
          actionFunc={props.addEventForPlayer}
          {...players[6]}
          colour={team.colour}
        />,
      ]}
      midField={[
        <PlayerFunction
          actionFunc={props.addEventForPlayer}
          {...players[7]}
          colour={team.colour}
        />,
        <PlayerFunction
          actionFunc={props.addEventForPlayer}
          {...players[8]}
          colour={team.colour}
        />,
      ]}
      halfForwardLine={[
        <PlayerFunction
          actionFunc={props.addEventForPlayer}
          {...players[9]}
          colour={team.colour}
        />,
        <PlayerFunction
          actionFunc={props.addEventForPlayer}
          {...players[10]}
          colour={team.colour}
        />,
        <PlayerFunction
          actionFunc={props.addEventForPlayer}
          {...players[11]}
          colour={team.colour}
        />,
      ]}
      fullForwardLine={[
        <PlayerFunction
          actionFunc={props.addEventForPlayer}
          {...players[12]}
          colour={team.colour}
        />,
        <PlayerFunction
          actionFunc={props.addEventForPlayer}
          {...players[13]}
          colour={team.colour}
        />,
        <PlayerFunction
          actionFunc={props.addEventForPlayer}
          {...players[14]}
          colour={team.colour}
        />,
      ]}
    />
  );
}
