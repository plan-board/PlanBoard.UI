import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavBarHeader from "../navbar/navbarHeader";
import "../../style/login.css"

const Login = () => {
  return (
    <>
      <NavBarHeader />
      <div style={{ padding: "0px 14px" }}>
        <Container
          fluid
          className="login-container"
        >
          <div>
            <Row>
              <Col sm>
                <Form>
                  <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
                  <Form.Text
                    id="passwordHelpBlock"
                    onClick={() => {}}
                    style={{ cursor: "pointer" }}
                  >
                    I forgot my password
                  </Form.Text>
                  <Form.Group className="mb-3 mt-4">
                    <Button type="submit" style={{ width: "100%" }}>
                      Sign in
                    </Button>
                  </Form.Group>
                </Form>
              </Col>
              <Col sm>Google log in</Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Login;
