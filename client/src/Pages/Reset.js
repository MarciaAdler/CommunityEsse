import React, { useRef, useState } from "react";
import { Container, Form, Button, Row } from "react-bootstrap";
import API from "../utils/API";
import { Redirect } from "react-router-dom";

export default function Reset() {
  const [sendLogin, setSendLogin] = useState(false);
  const nameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  let userId = "";

  const renderRedirect = () => {
    if (sendLogin) {
      return <Redirect to="/" />;
    }
  };

  function getIdByUsername(event) {
    event.preventDefault();
    API.getIdByUsername({
      username: nameRef.current.value,
    })
      .then((response) => {
        console.log(response.data.id);
        userId = response.data.id;
        console.log(userId);
        resetPassword();
      })
      .catch((err) => alert("Please enter a vaid username"));
  }

  function resetPassword() {
    if (nameRef.current.value) {
      if (passwordRef.current.value === confirmPasswordRef.current.value) {
        API.resetPassword({
          id: userId,
          password: passwordRef.current.value,
        }).then((req) => {
          setSendLogin(true);
        });
      } else {
        alert("passwords do not match");
      }
    } else {
      alert("username does not exist");
    }
  }
  return (
    <Container className="reset--container">
      <Row className="d-flex justify-content-center">
        <Form className="reset--form">
          <Form.Group controlId="userName">
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
          <Form.Group controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              ref={confirmPasswordRef}
            />
          </Form.Group>
          <Button className="button" type="submit" onClick={getIdByUsername}>
            Reset Password
          </Button>
          {renderRedirect()}
        </Form>
      </Row>
    </Container>
  );
}
