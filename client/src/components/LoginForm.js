import React, { useRef } from "react";
import { Form, Button } from "react-bootstrap";
export default function LoginForm() {
  const nameRef = useRef();
  const passwordRef = useRef();
  return (
    <div className="loginform--wrapper">
      <Form className="loginform--form div-to-align">
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            ref={nameRef}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={passwordRef}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
