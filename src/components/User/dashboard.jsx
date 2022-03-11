import React from "react";
import GamesTable from "./games";
import CreateGameForm from "../Forms/CreateGameForm";
import Sidebar from "./Sidebar";
import { useOutletContext } from "react-router-dom";
import { Row, Container, Col } from "react-bootstrap";
import { useState } from "react";

function UserDashboard() {
  let token = useOutletContext();
  let [viewGames, setViewGames] = useState(true);
  let [createGames, setCreateGames] = useState(false);

  function mainContent() {
    if (viewGames) {
      return <GamesTable token={token} />;
    }
    if (createGames) {
      return <CreateGameForm token={token} />;
    }
  }
  return (
    <Container fluid>
      <Row>
        <Col xs={2} lg={1}>
          <Sidebar
            setViewGames={setViewGames}
            setCreateGames={setCreateGames}
          />
        </Col>
        <Col>{mainContent()}</Col>
      </Row>
    </Container>
  );
}

export default UserDashboard;
