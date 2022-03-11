import React, { Component } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { Row, Container, Col, Navbar, Nav } from "react-bootstrap";
import Sidebar from "./Sidebar";

export default function UserDashboardLayout({ children }) {
  // component mount get games
  let token = useOutletContext();
  // if the token value changes this function is called again
  return (
    <Container>
      <Row>
        <Col>
          <Sidebar />
        </Col>
        <Col>{children}</Col>
      </Row>
    </Container>
  );
}
