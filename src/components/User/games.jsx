import React, { Component } from "react";
import { Row, Container, Col, Table } from "react-bootstrap";
import LoadingSpinner from "../loadingSpinner";
import { useEffect, useState } from "react";
import { getGames } from "../../api/helpers";
import { useNavigate } from "react-router";
import "../../stylesheet/stylesheet.css";

function GamesTable(props) {
  let [games, setGames] = useState(null);
  let token = props.token;
  let navigate = useNavigate();
  const handleRowClick = (id) => {
    navigate(`/games/${id}`);
  };

  useEffect(() => {
    fetchAndSetGames(token);
  }, [token]);

  if (!games) {
    return <LoadingSpinner />;
  }
  return (
    <Container>
      <Row>
        <Col>
          <h2>Games</h2>
        </Col>
        <Table bordered hover>
          <tbody>
            {games.map((game) => {
              return (
                <tr key={game.id} onClick={() => handleRowClick(game.id)}>
                  <td>{game.id}</td>
                  <td>{game.name}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
  async function fetchAndSetGames(token) {
    let apiResponse = await getGames(token);
    if (!apiResponse.ok) {
      console.error(apiResponse);
      return;
    }
    let games = await apiResponse.json();
    setGames(games.items);
  }
}

export default GamesTable;
