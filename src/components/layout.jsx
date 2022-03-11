import React, { Component } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { Row, Container, Col, Navbar, Nav } from "react-bootstrap";

function Layout({ children }) {
  // component mount get games
  let token = useOutletContext();
  // if the token value changes this function is called again
  return (
    <Container fluid>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Match-Tracker</Navbar.Brand>
      </Navbar>
        {children}
    </Container>
  );
}

export default Layout;
