import React from "react";
import ViewAnnouncements from "../components/ViewAnnouncements";
import PostAnnouncement from "../components/PostAnnouncement";
import LoggedOut from "../components/LoggedOut";
import { Container } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";

export default function Announcements() {
  const [state, dispatch] = useStoreContext();
  return (
    <Container className="announcements--container">
      {state.loggedIn === true ? <ViewAnnouncements /> : <LoggedOut />}

      {state.currentUser.role === "Admin" && state.loggedIn === true ? (
        <PostAnnouncement />
      ) : (
        ""
      )}
    </Container>
  );
}
