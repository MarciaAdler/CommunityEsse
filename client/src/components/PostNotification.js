import React, { useRef, useEffect } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { Form, Button } from "react-bootstrap";
import API from "../utils/API";
import { SET_USERS } from "../utils/actions";

export default function PostNotification() {
  const [state, dispatch] = useStoreContext();
  const postRef = useRef();
  const receiverRef = useRef();

  useEffect(() => {
    getAllUsers();
  }, []);
  function createPost(event) {
    API.createNotification({
      message: postRef.current.value,
      SenderId: state.currentUser.id,
      ReceiverId: receiverRef.current.value,
    })
      .then((results) => {
        console.log(results.data);

        document.getElementById("bulletin-form").value = "";
      })
      .catch((err) => console.log(err));
  }

  function getAllUsers(event) {
    API.getAllUsers().then((response) => {
      dispatch({ type: SET_USERS, users: response.data });
    });
  }
  return (
    <div className="post-bulletin--container">
      <h2>Post Notification Here</h2>
      <Form className="post-bulletin--form">
        <Form.Group controlId="formGridState">
          <Form.Label>To</Form.Label>
          <Form.Control as="select" defaultValue="Choose..." ref={receiverRef}>
            <option>Choose Apt...</option>
            {state.users.length
              ? state.users.map((user) => (
                  <option key={user.id}>{user.aptNumber}</option>
                ))
              : ""}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="bulletin-form">
          <Form.Control as="textarea" rows="5" ref={postRef} />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={createPost}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
