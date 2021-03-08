import React, { useState } from "react";
// Bootstrap compponents
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    // TODO: handle transition from login to post screen
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} sm={4} md={4} className="my-auto">
          <Form>
            <Form.Group>
              <Form.Text>
                <h2> React Roommates! </h2>
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col}>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={() => handleSubmit()}
                >
                  Submit
                </Button>
              </Form.Group>
              <Form.Group>
                <Button variant="secondary">Register</Button>
              </Form.Group>
            </Form.Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
