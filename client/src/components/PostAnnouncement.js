import React, { useRef, useState } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { Container, Form, Button } from "react-bootstrap";
import API from "../utils/API";
import { SET_ANNOUNCEMENTS } from "../utils/actions";

export default function PostAnnouncement() {
  const [state, dispatch] = useStoreContext();
  const postRef = useRef();
  const [successMessage, setSuccessMessage] = useState("");

  function createPost(event) {
    event.preventDefault();
    API.createAnnouncement({
      message: postRef.current.value,
      UserId: state.currentUser.id,
      PropertyId: state.currentproperty,
    })
      .then((results) => {
        console.log(results.data);
        getAnnouncements(state.currentproperty);
        confirmSent();
        const form = document.getElementById("myForm");
        form.reset();
      })
      .catch((err) => console.log(err));
  }
  function getAnnouncements(currentproperty) {
    API.getAnnouncements(currentproperty).then((response) => {
      dispatch({ type: SET_ANNOUNCEMENTS, announcements: response.data });
    });
  }
  function confirmSent() {
    setSuccessMessage("Announcement Posted");
    setTimeout(() => {
      document.getElementById("success-message").style.display = "none";
    }, 1000);
  }
  return (
    <div className="post-announcement--container">
      <h2>Post Annoucement Here</h2>
      <Form className="post-announcement--form" id="myForm">
        <Form.Group controlId="announcement-form">
          <Form.Control as="textarea" rows="5" ref={postRef} />
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
