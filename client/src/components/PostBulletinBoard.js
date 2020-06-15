import React, { useRef } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { Container, Form, Button } from "react-bootstrap";
import API from "../utils/API";

export default function PostAnnouncement() {
  const [state, dispatch] = useStoreContext();
  const postRef = useRef();
  const subjectRef = useRef();

  function createPost(event) {
    API.createBulletin({
      message: postRef.current.value,
      subject: subjectRef.current.value,
      UserId: state.currentUser.id,
      PropertyId: state.currentproperty,
    })
      .then((results) => {
        console.log(results.data);

        document.getElementById("bulletin-form").value = "";
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="post-bulletin--container">
      <h2>Post Bulletin Here</h2>
      <Form className="post-bulletin--form">
        <Form.Group controlId="bulletin-subject">
          <Form.Label>Subject: </Form.Label>
          <Form.Control as="textarea" rows="1" ref={subjectRef} />
        </Form.Group>
        <Form.Group controlId="bulletin-form">
          <Form.Control
            as="textarea"
            rows="5"
            ref={postRef}
            placeholder="Type post here"
          />
        </Form.Group>
        <Button className="button" type="submit" onClick={createPost}>
          Post
        </Button>
      </Form>
    </div>
  );
}
