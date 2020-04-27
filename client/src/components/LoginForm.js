import React, { useRef } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { Form, Button } from "react-bootstrap";
import API from "../utils/API";
import { Redirect, Link } from "react-router-dom";
import { LOGGEDIN, SET_CURRENT_USER } from "../utils/actions";

export default function LoginForm() {
  const [state, dispatch] = useStoreContext();
  const nameRef = useRef();
  const passwordRef = useRef();
  const renderRedirect = () => {
    if (state.loggedIn) {
      return <Redirect to="/home" />;
    }
  };
  function login(event) {
    event.preventDefault();
    API.getUser({
      username: nameRef.current.value,
      password: passwordRef.current.value,
    })
      .then((results) => {
        dispatch({
          type: SET_CURRENT_USER,
          currentUser: {
            id: results.data.id,
            username: results.data.username,
            role: results.data.role,
            firstName: results.data.firstName,
            lastName: results.data.lastName,
            aptNumber: results.data.aptNumber,
            email: results.data.email,
          },
        });

        let localStorageUser = {
          id: results.data.id,
          username: results.data.username,
          role: results.data.role,
          firstName: results.data.firstName,
          lastName: results.data.lastName,
          aptNumber: results.data.aptNumber,
          email: results.data.email,
        };

        window.localStorage.setItem(
          "currentUser",
          JSON.stringify(localStorageUser)
        );
        dispatch({
          type: LOGGEDIN,
        });
      })
      .catch((err) => console.log(err));
  }
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

        <Button variant="primary" type="submit" onClick={login}>
          Submit
        </Button>
      </Form>
      {renderRedirect()}
    </div>
  );
}
