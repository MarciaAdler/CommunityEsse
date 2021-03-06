import React from "react";
import { Container } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";
import ViewMessages from "../components/ViewMessages";
import PostMessages from "../components/PostMessages";
import LoggedOut from "../components/LoggedOut";

export default function Messages() {
  const [state, dispatch] = useStoreContext();
  return (
    <Container className="messages--container">
      {state.loggedIn === true ? <ViewMessages /> : <LoggedOut />}
    </Container>
  );
}
