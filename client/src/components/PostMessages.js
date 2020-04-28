import React, { useRef, useEffect } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { Form, Button } from "react-bootstrap";
import API from "../utils/API";
import { SET_ALL_USERS } from "../utils/actions";

export default function PostMessages() {
  const [state, dispatch] = useStoreContext();
  const postRef = useRef();
  const receiverRef = useRef();
  let receiveId = "";
  useEffect(() => {
    getAll();
  }, []);
  function createMessage(event) {
    event.preventDefault();
    API.createMessage({
      message: postRef.current.value,
      SenderId: state.currentUser.id,
      ReceiverId: receiveId,
    })
      .then((res) => {
        console.log(res.data);
        document.getElementById("message-form").value = "";
        document.getElementById("message-apt-input").value = "Choose Apt...";
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
        <Form.Group controlId="message-form">
          <Form.Control as="textarea" rows="5" ref={postRef} />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={createMessage}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
