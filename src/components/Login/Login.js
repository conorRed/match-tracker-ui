import React, { useState } from "react";
import { login, handleError } from "../../api/helpers.js";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import { Row, Col, Alert, Container, Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [loginError, setLoginError] = useState();
  const [showAlert, setShowAlert] = useState(false);
  let navigate = useNavigate();
  let location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login({
      email: username,
      password: password,
    })
      .then((res) => res.json())
      .then((body) => {
        if (body.error !== undefined) {
          handleError(setLoginError, body.status_code, body.message);
          setShowAlert(true);
        } else {
          let from = location.state?.from?.pathname || "/";
          setToken(body["access_token"]);
          navigate(from, { replace: true });
        }
      });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col sm={6}>
          <Card>
            <Card.Header className="text-center" as="h2">
              Login
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group>
                  <Alert
                    variant="danger"
                    show={showAlert}
                    onClose={() => setShowAlert(false)}
                    dismissible
                  >
                    {loginError}
                  </Alert>
                </Form.Group>
                <br></br>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    required={true}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" onClick={handleSubmit} type="submit">
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
