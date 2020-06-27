import React, { useRef, useState } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { Container, Form, Button } from "react-bootstrap";
import { SET_BULLETINS } from "../utils/actions";
import API from "../utils/API";

export default function PostAnnouncement() {
  const [state, dispatch] = useStoreContext();
  const postRef = useRef();
  const subjectRef = useRef();
  const [successMessage, setSuccessMessage] = useState("");

  function createPost(event) {
    event.preventDefault();
    API.createBulletin({
      message: postRef.current.value,
      subject: subjectRef.current.value,
      UserId: state.currentUser.id,
      PropertyId: state.currentproperty,
    })
      .then((results) => {
        console.log(results.data);
        getBulletins(state.currentproperty);
        confirmSent();
        const form = document.getElementById("myForm");
        form.reset();
      })
      .catch((err) => console.log(err));
  }
  function getBulletins(currentproperty) {
    API.getBulletins(currentproperty).then((response) => {
      dispatch({ type: SET_BULLETINS, bulletins: response.data });
    });
  }
  function confirmSent() {
    setSuccessMessage("Bulletin Posted");
    setTimeout(() => {
      document.getElementById("success-message").style.display = "none";
    }, 1000);
  }
  return (
    <div className="post-bulletin--container">
      <h2>Post Bulletin Here</h2>
      <Form className="post-bulletin--form" id="myForm">
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
        <span className="post-messages--success" id="success-message">
          {successMessage}
        </span>
      </Form>
    </div>
  );
}
