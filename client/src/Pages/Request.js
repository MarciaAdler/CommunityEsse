import React from "react";
import ViewRequest from "../components/ViewRequest";
import LoggedOut from "../components/LoggedOut";
import { useStoreContext } from "../utils/GlobalState";
import { Container } from "react-bootstrap";
export default function BulletinBoard() {
  const [state, dispatch] = useStoreContext();

  return (
    <Container className="bulletin--container">
      {(state.loggedIn === true && state.currentUser.role === "Maintenance") ||
      (state.loggedIn === true && state.currentUser.role === "Admin") ? (
        <ViewRequest />
      ) : (
        <LoggedOut />
      )}
    </Container>
  );
}
