import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// Database management
import axios from "axios";
// styling
import "bootstrap/dist/css/bootstrap.min.css";

// Bootstrap compponents
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Toast from "react-bootstrap/Toast";

// utils
import validateLogin from "../utils/validateLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const history = useHistory();

  // removes error and closes the toast
  const handleCloseToast = () => {
    setError(null);
    setShowToast(false);
  };

  const handleSubmit = async (e) => {
    // TODO: handle transition from login to post screen or register page
    e.preventDefault();

    const user = {
      username: username,
      password: password,
    };

    // validation
    const validationErrors = validateLogin(user);

    if (validationErrors) {
      setError(validationErrors);
      setShowToast(true);
      return;
    } else {
      // submit data to server and finish sign up
      try {
        const { data } = await axios.post(
          "http://localhost:5000/auth/login",
          user
        );
        const { loggedIn } = data;

        if (loggedIn) {
          history.push("/home");
        }
      } catch (error) {
        console.log(error.response.data);
        setShowToast(true);
        setError(error.response.data.error);
      }
    }
  };

  return (
    <Container>
      <div>
        {" "}
        {/** styling needed here once merged */}
        {error && (
          <Toast
            style={{ position: "absolute", top: 10, right: 10 }}
            onClose={handleCloseToast}
            show={showToast}
            delay={3000}
            autohide
          >
            <Toast.Header>Login Error</Toast.Header>
            <Toast.Body>{error}</Toast.Body>
          </Toast>
        )}
      </div>

      <Row className="justify-content-md-center">
        <Col xs={12} sm={4} md={4} className="my-auto">
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Text>
                <h2> React Roommates! </h2>
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
                placeholder="Enter username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col}>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form.Group>
              <Form.Group>
                <Button
                  variant="secondary"
                  onClick={() => history.push("/signup")}
                >
                  Register
                </Button>
              </Form.Group>
            </Form.Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
