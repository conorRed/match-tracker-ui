import React from "react";
import { getPlayers, getTeam, updatePlayer } from "../api/helpers";
import { useEffect, useState } from "react";
import LineupDefault from "./Lineups/default";
import Bench from "./bench";
import LoadingSpinner from "./loadingSpinner";
import { PlayerFunction } from "./player";
import SubstituteModal from "../components/Modals/SubstituteModal";
import EventModalContainer from "../components/Modals/EventModalContainer";
import { Container, Row, Col } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";

export function TeamFunction(props) {
  let token = props.token;
  let [players, setPlayers] = useState(null);
  let [team, setTeam] = useState(null);
  let [subs, setSubs] = useState(null);
  let [showSubModal, setShowSubModal] = useState(false);
  let [subOn, setSubOn] = useState(null);
  let [subOff, setSubOff] = useState(null);

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
    setSubs(players.items.filter((player) => player["position"] === "sub"));
    setSubOn(players.items[0]);
    setSubOff(players.items[0]);
  }
  useEffect(() => {
    fetchAndSetPlayers(token);
    fetchAndSetTeam(token);
  }, [token]);
  if (!players || !team || !subs) {
    return <LoadingSpinner />;
  }

  async function makeSubstitution() {
    let positionToComeOn = subOff.position;
    let positionToComeOff = subOn.position;
    subOn["position"] = positionToComeOn;
    subOff["position"] = positionToComeOff;
    subOn["team_id"] = team.id;
    subOff["team_id"] = team.id;
    let apiResponse1 = await updatePlayer(subOn.id, subOn);
    let apiResponse2 = await updatePlayer(subOff.id, subOff);
    if (!apiResponse1.ok || !apiResponse2.ok) {
      console.error(apiResponse1);
      console.error(apiResponse2);
      return;
    }

    setShowSubModal(false);
    fetchAndSetPlayers(token);
  }

  function findPlayerByPosition(position) {
    for (let i in players) {
      if (players[i]["position"] === position) {
        return players[i];
      }
    }
  }

  function openSubModal() {
    setShowSubModal(true);
  }

  return (
    <>
      <Row>
        <Col xs={2}>
          <Bench>
            <button
              className="btn btn-info"
              style={{ margin: 15, padding: 3, fontSize: 15 }}
              onClick={() => {
                openSubModal();
              }}
            >
              <FaEdit />
            </button>
            {subs.map((sub) => {
              return (
                <PlayerFunction
                  actionFunc={props.addEventForPlayer}
                  {...sub}
                  colour={team.colour}
                />
              );
            })}
          </Bench>
        </Col>
        <Col>
          <LineupDefault
            goalkeeper={
              <PlayerFunction
                actionFunc={props.addEventForPlayer}
                {...findPlayerByPosition("GoalKeeper")}
                colour={team.colour}
              />
            }
            fullBackLine={[
              <PlayerFunction
                actionFunc={props.addEventForPlayer}
                {...findPlayerByPosition("CornerBackLeft")}
                colour={team.colour}
              />,
              <PlayerFunction
                actionFunc={props.addEventForPlayer}
                {...findPlayerByPosition("FullBack")}
                colour={team.colour}
              />,
              <PlayerFunction
                actionFunc={props.addEventForPlayer}
                {...findPlayerByPosition("CornerBackRight")}
                colour={team.colour}
              />,
            ]}
            halfBackLine={[
              <PlayerFunction
                actionFunc={props.addEventForPlayer}
                {...findPlayerByPosition("WingBackLeft")}
                colour={team.colour}
              />,
              <PlayerFunction
                actionFunc={props.addEventForPlayer}
                {...findPlayerByPosition("CenterBack")}
                colour={team.colour}
              />,
              <PlayerFunction
                actionFunc={props.addEventForPlayer}
                {...findPlayerByPosition("WingBackRight")}
                colour={team.colour}
              />,
            ]}
            midField={[
              <PlayerFunction
                actionFunc={props.addEventForPlayer}
                {...findPlayerByPosition("Midfield1")}
                colour={team.colour}
              />,
              <PlayerFunction
                actionFunc={props.addEventForPlayer}
                {...findPlayerByPosition("Midfield2")}
                colour={team.colour}
              />,
            ]}
            halfForwardLine={[
              <PlayerFunction
                actionFunc={props.addEventForPlayer}
                {...findPlayerByPosition("WingForwardLeft")}
                colour={team.colour}
              />,
              <PlayerFunction
                actionFunc={props.addEventForPlayer}
                {...findPlayerByPosition("CenterForward")}
                colour={team.colour}
              />,
              <PlayerFunction
                actionFunc={props.addEventForPlayer}
                {...findPlayerByPosition("WingForwardRight")}
                colour={team.colour}
              />,
            ]}
            fullForwardLine={[
              <PlayerFunction
                actionFunc={props.addEventForPlayer}
                {...findPlayerByPosition("CornerForwardLeft")}
                colour={team.colour}
              />,
              <PlayerFunction
                actionFunc={props.addEventForPlayer}
                {...findPlayerByPosition("FullForward")}
                colour={team.colour}
              />,
              <PlayerFunction
                actionFunc={props.addEventForPlayer}
                {...findPlayerByPosition("CornerForwardRight")}
                colour={team.colour}
              />,
            ]}
          />
        </Col>
      </Row>
      <EventModalContainer
        show={showSubModal}
        handleClose={() => {
          setShowSubModal(false);
        }}
        submitEvent={makeSubstitution}
      >
        <SubstituteModal
          players={players}
          setSubOn={setSubOn}
          setSubOff={setSubOff}
        />
      </EventModalContainer>
    </>
  );
}
