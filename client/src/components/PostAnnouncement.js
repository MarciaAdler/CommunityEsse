import React, { useRef } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { Container, Form, Button } from "react-bootstrap";
import API from "../utils/API";
export default function PostAnnouncement() {
  const [state, dispatch] = useStoreContext();
  const postRef = useRef();

  function createPost(event) {
    API.createAnnouncement({
      message: postRef.current.value,
      UserId: state.currentUser.id,
    })
      .then((results) => {
        console.log(results.data);

        document.getElementById("announcement-form").value = "";
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="post-announcement--container">
      <h2>Post Annoucement Here</h2>
      <Form className="post-announcement--form">
        <Form.Group controlId="announcement-form">
          <Form.Control as="textarea" rows="5" ref={postRef} />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={createPost}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
