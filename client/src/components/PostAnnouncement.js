import React, { useRef } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { Container, Form } from "react-bootstrap";
export default function PostAnnouncement() {
  const [state, dispatch] = useStoreContext();
  const postRef = useRef();
  return (
    <div className="post-announcement--container">
      <h2>Post Annoucement Here</h2>
      <Form>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Control as="textarea" rows="5" ref={postRef} />
        </Form.Group>
      </Form>
    </div>
  );
}
