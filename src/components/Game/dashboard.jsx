import React from "react";
import { useParams } from "react-router-dom";
import { getGame, createEventForGame } from "../../api/helpers";
import LoadingSpinner from "../loadingSpinner";
import { TeamFunction } from "../team";
import EventsTable from "./EventsTable";
import GameTimer from "../timer";
import EventModalContainer from "../Modals/EventModalContainer";
import EventOptionAndOutcomeModal from "../Modals/EventOptionAndOutcomeModal";
import PitchZoneModal from "../Modals/PitchZoneModal";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import { CSVLink } from "react-csv";
import { FaDownload } from "react-icons/fa";

export default function GameDashboard(props) {
  let params = useParams();
  let token = useOutletContext();
  let [game, setGame] = useState(null);
  let [showModal, setShowModal] = useState(false);

  // Fields to create a game event
  let [eventOption, setEventOption] = useState(null);
  let [eventOutcomeId, setEventOutcomeId] = useState(null);
  let [pitchzone, setPitchZone] = useState("Fullback");

  // Settings for game timer
  let [gameTimerTimestamp, setTimestamp] = useState("");
  let [startTimer, setStartTimer] = useState(false);
  let [pauseTimer, setPauseTimer] = useState(false);
  async function fetchAndSetGames(token) {
    let apiResponse = await getGame(token, params.gameid);
    if (!apiResponse.ok) {
      console.error(apiResponse);
      return;
    }
    let game = await apiResponse.json();
    setGame(game);
  }

  async function submitEventForGame() {
    let event = {
      name: eventOption.name,
      event_option_id: eventOption.id,
      outcome_id: eventOutcomeId,
      pitchzone: pitchzone,
      game_id: game.id,
      timestamp: gameTimerTimestamp,
    };
    let apiResponse = await createEventForGame(event);
    if (!apiResponse.ok) {
      console.error(apiResponse);
      return;
    }

    // Pop up to say that event was added ?
    setShowModal(false);
    // update the events list
    fetchAndSetGames(token);
  }

  // defined here as the modal occupies the full screen
  function addEventForPlayerFunc() {
    setPauseTimer(true);
    setShowModal(true);
  }

  useEffect(() => {
    fetchAndSetGames(token);
  }, [token]);

  if (!game) {
    return <LoadingSpinner />;
  }
  return (
    <Container>
      <Row>
        <Col>
          <h2 className="display-5 text-center">
            {game.name}
            <CSVLink
              style={{ padding: 15, fontSize: 25 }}
              filename={`${game.name}-events.csv`}
              data={game.events}
            >
              <FaDownload />
            </CSVLink>
          </h2>
        </Col>
      </Row>
      <Row>
        <Col sm={5}>
          <h2 className="display-5 text-center">{game.home_team.name}</h2>
          <TeamFunction
            addEventForPlayer={addEventForPlayerFunc}
            token={token}
            id={game.home_team.id}
          />
        </Col>
        <Col xs={12} sm={2}>
          <GameTimer
            start={startTimer}
            pause={pauseTimer}
            setStart={setStartTimer}
            setPause={setPauseTimer}
            setTimestamp={setTimestamp}
          />
        </Col>
        <Col sm={5}>
          <h2 className="display-5 text-center">{game.away_team.name}</h2>
          <TeamFunction
            addEventForPlayer={addEventForPlayerFunc}
            token={token}
            id={game.away_team.id}
          />
        </Col>
      </Row>
      <Row>
        <EventsTable events={game.events} />
      </Row>
      <EventModalContainer
        show={showModal}
        handleClose={() => {
          setPauseTimer(false);
          setShowModal(false);
        }}
        submitEvent={submitEventForGame}
      >
        <EventOptionAndOutcomeModal
          updateEventOption={setEventOption}
          updateEventOutcome={setEventOutcomeId}
        />
        <PitchZoneModal updatePitchzone={setPitchZone} />
      </EventModalContainer>
    </Container>
  );
}
