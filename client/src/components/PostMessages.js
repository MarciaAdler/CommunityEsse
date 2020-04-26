import React, { useRef, useEffect } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { Form, Button } from "react-bootstrap";
import API from "../utils/API";
import { SET_ALL_USERS } from "../utils/actions";

export default function PostMessages() {
  const [state, dispatch] = useStoreContext();
  const postRef = useRef();
  const receiverRef = useRef();

  useEffect(() => {
    getAll();
  }, []);
  function createMessage(event) {
    // API.createNotification({
    //   message: postRef.current.value,
    //   SenderId: state.currentUser.id,
    //   ReceiverId: receiverRef.current.value,
    // })
    //   .then((results) => {
    //     console.log(results.data);
    //     document.getElementById("bulletin-form").value = "";
    //   })
    //   .catch((err) => console.log(err));
  }

  function getAll(event) {
    API.getAll().then((response) => {
      dispatch({ type: SET_ALL_USERS, allUsers: response.data });
    });
  }
  return (
    <div className="post-messages--container">
      <h2>Write Message Here</h2>
      <Form className="post-messages--form">
        <Form.Group controlId="formGridState">
          <Form.Label>To</Form.Label>
          <Form.Control as="select" defaultValue="Choose..." ref={receiverRef}>
            <option>Choose Apt...</option>
            {state.allUsers.length
              ? state.allUsers.map((user) => (
                  <option key={user.id}>
                    {user.firstName} {user.lastName} apt: {user.aptNumber}
                  </option>
                ))
              : ""}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="bulletin-form">
          <Form.Control as="textarea" rows="5" ref={postRef} />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={createMessage}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
