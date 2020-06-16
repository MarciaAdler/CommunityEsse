import React, { useRef, useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import API from "../utils/API";
import { Redirect } from "react-router-dom";
import { useStoreContext } from "../utils/GlobalState";

export default function SignupForm() {
  const [state, dispatch] = useStoreContext();
  const [sendLogin, setSendLogin] = useState(false);
  const firstRef = useRef();
  const lastRef = useRef();
  const nameRef = useRef();
  const aptRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();
  const roleRef = useRef();
  const instructionsRef = useRef();

  const renderRedirect = () => {
    if (sendLogin && state.currentUser.id === 0) {
      return <Redirect to="/" />;
      // } else {
      //   const form = document.getElementById("myForm");
      //   form.reset();
      // }
    }
  };
  function signUp(event) {
    console.log(state.currentUser.property);
    event.preventDefault();
    if (passwordRef.current.value !== confirmRef.current.value) {
      return alert("Passwords must match");
    } else {
      API.createUser({
        firstName: firstRef.current.value,
        lastName: lastRef.current.value,
        email: emailRef.current.value,
        username: nameRef.current.value,
        aptNumber: aptRef.current.value,
        password: passwordRef.current.value,
        role: roleRef.current.value,
        instructions: instructionsRef.current.value,
        property: state.currentUser.property,
      })
        .then((res) => {
          setSendLogin(true);
          const form = document.getElementById("myForm");
          form.reset();
        })
        .catch((err) => alert("Username already exists"));
    }
  }
  return (
    <div className="signupform--wrapper">
      <Form className="signupform--container div-to-align" id="myForm">
        <Form.Row className="mb-3 justify-content-center">
          <Col className="col-8 col-md-4">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First name"
              required
              ref={firstRef}
            />
          </Col>
          <Col className="col-8 col-md-4">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last name"
              required
              ref={lastRef}
            />
          </Col>
        </Form.Row>
        <Form.Row className="justify-content-center">
          <Col className="col-8 col-md-4">
            <Form.Label>Apt. #</Form.Label>
            <Form.Control
              type="text"
              placeholder="Apt #"
              required
              ref={aptRef}
            />
          </Col>
          <Col className="col-8 col-md-4">
            <Form.Group controlId="formGroupUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                required
                ref={nameRef}
              />
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row className="justify-content-center">
          <Col className="col-8 col-md-2">
            <Form.Group controlId="formGroupRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                defaultValue="User"
                required
                ref={roleRef}
              >
                <option>User</option>
                <option>Admin</option>
                <option>Front Desk</option>
              </Form.Control>
            </Form.Group>
          </Col>

          <Col className="col-8 col-md-6">
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                required
                ref={emailRef}
              />
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row className="justify-content-center">
          <Col className="col-8">
            <Form.Group controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                required
                ref={passwordRef}
              />
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row className="justify-content-center">
          <Col className="col-8">
            <Form.Group controlId="formGroupConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Retype Password"
                required
                ref={confirmRef}
              />
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row className="justify-content-center">
          <Col className="col-8">
            <Form.Group controlId="frontDeskInstructions">
              <Form.Label>Front Desk Instructions</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                placeholder="Type any instructions for the building here"
                ref={instructionsRef}
              />
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row className="justify-content-center">
          <Col className="col-8">
            <Button className="button" type="submit" onClick={signUp}>
              Submit
            </Button>

            <span>
              &nbsp; If you already have an account{" "}
              <a href="/">
                <strong>click here</strong>
              </a>{" "}
              to login
            </span>
            {renderRedirect()}
          </Col>
        </Form.Row>
      </Form>
    </div>
  );
}
