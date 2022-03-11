import React from "react";
import { Nav } from "react-bootstrap";

export default function Sidebar({ setViewGames, setCreateGames }) {
  return (
    <Nav variant="pills" className="flex-column">
      <Nav.Item>
        <Nav.Link eventKey="data" onClick={(e) => setViewGames(true)}>
          Games
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          onClick={(e) => {
            setCreateGames(true);
            setViewGames(false);
          }}
        >
          Create Game
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
