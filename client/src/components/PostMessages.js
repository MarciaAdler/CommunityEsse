import React, { useRef, useEffect, useState } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { Form, Button } from "react-bootstrap";
import API from "../utils/API";
import { SET_ALL_USERS, SET_SENT_MESSAGES } from "../utils/actions";

export default function PostMessages() {
  const [state, dispatch] = useStoreContext();
  const postRef = useRef();
  const receiverRef = useRef();
  const subjectRef = useRef();
  let receiveId = "";
  const sentMessage = "Message Sent";
  const [successMessage, setSuccessMessage] = useState("");
  useEffect(() => {
    getAll();
  }, []);

  function createMessage(event) {
    event.preventDefault();
    API.createMessage({
      message: postRef.current.value,
      subject: subjectRef.current.value,
      SenderId: state.currentUser.id,
      ReceiverId: receiveId,
    })
      .then((res) => {
        console.log(res.data);
        updateSentMessages(state.currentUser);
        confirmSent();
        document.getElementById("message-form").value = "";
        document.getElementById("message-apt-input").value = "Choose Apt...";
        document.getElementById("message-subject").value = "";
      })
      .catch((err) => console.log(err));
  }

  function getAll(event) {
    API.getAll().then((response) => {
      dispatch({ type: SET_ALL_USERS, allUsers: response.data });
    });
  }

  function getId() {
    if (receiverRef.current.value !== "Choose Apt...") {
      API.findIdByApt(receiverRef.current.value).then((response) => {
        console.log(response.data.id);
        receiveId = response.data.id;
        console.log(response.data.id);
      });
    }
  }
  function updateSentMessages(currentUser) {
    API.getSentMessages(currentUser.id)
      .then((response) => {
        console.log(response.data);
        dispatch({ type: SET_SENT_MESSAGES, sentmessages: response.data });
      })
      .catch((err) => console.log(err));
  }

  // show sent message after successfully sending message
  function confirmSent() {
    setSuccessMessage(sentMessage);
    setTimeout(() => {
      document.getElementById("success-message").style.display = "none";
    }, 1000);
  }
  return (
    <div className="post-messages--container">
      <h2>Write Message Here</h2>
      <Form className="post-messages--form">
        <Form.Group controlId="message-apt-input">
          <Form.Label>To</Form.Label>
          <Form.Control
            as="select"
            defaultValue="Choose..."
            ref={receiverRef}
            onChange={getId}
          >
            <option>Choose Apt...</option>
            {state.allUsers.length
              ? state.allUsers.map((user) => (
                  <option key={user.id}>{user.aptNumber}</option>
                ))
              : ""}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="message-subject">
          <Form.Label>Subject:</Form.Label>
          <Form.Control as="textarea" rows="1" ref={subjectRef} />
        </Form.Group>
        <Form.Group controlId="message-form">
          <Form.Control
            as="textarea"
            placeholder="Type message here"
            rows="5"
            ref={postRef}
          />
        </Form.Group>
        <Button className="button" type="submit" onClick={createMessage}>
          Send
        </Button>
      </Form>
      <p id="success-message">{successMessage}</p>
    </div>
  );
}
