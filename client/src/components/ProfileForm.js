import React, { useEffect, useRef } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { Form, Col, Button } from "react-bootstrap";
import API from "../utils/API";
import { SET_CURRENT_USER } from "../utils/actions";

export default function ProfileForm() {
  const [state, dispatch] = useStoreContext();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const roleRef = useRef();

  function updateUser(profile) {
    API.updateProfile({
      id: state.currentUser.id,
      username: usernameRef.current.value,
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      role: roleRef.current.value,
    }).then((response) => {
      refreshUser();
    });
  }
  function refreshUser() {
    console.log(state.currentUser.id);
    API.refreshCurrentUser(state.currentUser.id)
      .then((results) => {
        console.log(results.data);
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
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="profileform--container">
      <Form className="profile--form">
        <Form.Row>
          <Form.Group as={Col} controlId="formGridFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              ref={firstNameRef}
              defaultValue={`${state.currentUser.firstName}`}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              ref={lastNameRef}
              defaultValue={`${state.currentUser.lastName}`}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              ref={usernameRef}
              defaultValue={`${state.currentUser.username}`}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              ref={emailRef}
              defaultValue={state.currentUser.email}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} className="col-6" controlId="formGridAptNumber">
            <Form.Label>Apt Number</Form.Label>
            <Form.Control
              type="text"
              name="aptNum"
              value={state.currentUser.aptNumber}
            />
          </Form.Group>

          <Form.Group as={Col} className="col-6" controlId="formGridAptNumber">
            <Form.Label>Role</Form.Label>
            <Form.Control
              type="text"
              name="role"
              ref={roleRef}
              defaultValue={state.currentUser.role}
            />
          </Form.Group>
        </Form.Row>

        <Button
          className="button"
          onClick={() => {
            updateUser(state.currentUser.id);
          }}
        >
          Update
        </Button>
      </Form>
    </div>
  );
}
