import React from "react";
import ViewAnnouncements from "../components/ViewAnnouncements";
import PostAnnouncement from "../components/PostAnnouncement";
import { Container } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";

export default function Announcements() {
  const [state, dispatch] = useStoreContext();
  return (
    <Container className="announcements--container">
      <ViewAnnouncements />
      {state.currentUser.role === "Admin" ? <PostAnnouncement /> : ""}
    </Container>
  );
}
