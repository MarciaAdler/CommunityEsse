import React, { useRef, useEffect } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { Container, Form, Button } from "react-bootstrap";
import API from "../utils/API";
import { SET_USERS, SET_REQUESTS } from "../utils/actions";
export default function PostRequest() {
  const [state, dispatch] = useStoreContext();
  const requestRef = useRef();
  const receiverRef = useRef();
  let receiveId = "";

  useEffect(() => {
    if (state.currentproperty !== 0) {
      getAll(state.currentproperty);
    } else {
      getAll(JSON.parse(localStorage.getItem("currentProperty")));
    }

    if (state.currentUser.role === "User") {
      // getMyRequests(state.currentUser);
    } else {
      // getRequests(state.currentproperty);
    }
  }, []);

  function createRequest(event) {
    API.createRequest({
      request: requestRef.current.value,
      SenderId: state.currentUser.id,
      ReceiverId: receiveId,
      PropertyId: state.currentproperty,
    })
      .then((results) => {
        console.log(results.data);

        document.getElementById("notification-apt-form").value = "";
      })
      .catch((err) => console.log(err));
  }
  // function getMyRequests(currentUser) {
  //   API.getMyRequests(currentUser.id)
  //     .then((response) => {
  //       console.log(response);
  //       dispatch({ type: SET_REQUESTS, requests: response.data });
  //     })
  //     .catch((err) => console.log(err));
  // }
  function getAll(currentproperty) {
    API.getAll(currentproperty)
      .then((response) => {
        console.log(response);
        dispatch({ type: SET_USERS, users: response.data });
      })

      .catch((err) => console.log(err));
  }
  function getId(event) {
    console.log(receiverRef.current.value);
    event.preventDefault();
    API.getIdByUsername({
      username: receiverRef.current.value,
      PropertyId: state.currentproperty,
    })
      .then((response) => {
        console.log(response.data);
        receiveId = response.data.id;
        console.log(response.data.id);
      })
      .then((res) => {
        createRequest();
      });
  }
  return (
    <div className="post-bulletin--container">
      <h2>Submit Request Here</h2>
      <Form className="post-bulletin--form">
        <Form.Group controlId="notication-form">
          <Form.Label>To: </Form.Label>
          {state.users.length > 0
            ? state.users.map((user) => {
                if (user.role === "Maintenance") {
                  return (
                    <Form.Control
                      key={user.id}
                      ref={receiverRef}
                      disabled
                      value={user.username}
                    ></Form.Control>
                  );
                }
              })
            : ""}
        </Form.Group>
        <Form.Group controlId="notification-apt-form">
          <Form.Control as="textarea" rows="5" ref={requestRef} />
        </Form.Group>
        <button className="button" type="submit" onClick={getId}>
          Send
        </button>
      </Form>
    </div>
  );
}
