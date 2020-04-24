import React from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

export default function SigninForm() {
  return (
    <Container className="signupform--container">
      <Form.Row className="mb-3 justify-content-center">
        <Col className="col-8 col-md-4">
          <Form.Label>First Name</Form.Label>
          <Form.Control placeholder="First name" />
        </Col>
        <Col className="col-8 col-md-4">
          <Form.Label>Last Name</Form.Label>
          <Form.Control placeholder="Last name" />
        </Col>
      </Form.Row>
      <Form.Row className="justify-content-center">
        <Col className="col-8 col-md-4">
          <Form.Label>Apt. #</Form.Label>
          <Form.Control placeholder="Apt #" />
        </Col>
        <Col className="col-8 col-md-4">
          <Form.Group controlId="formGroupUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="username" placeholder="Enter username" />
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row className="justify-content-center">
        <Col className="col-8">
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row className="justify-content-center">
        <Col className="col-8">
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row className="justify-content-center">
        <Col className="col-8">
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Retype Password" />
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row className="justify-content-center">
        <Col className="col-8">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Col>
      </Form.Row>
    </Container>
  );
}
