import React from "react";
import ViewBulletinBoard from "../components/ViewBulletinBoard";
import PostBulletinBoard from "../components/PostBulletinBoard";
import LoggedOut from "../components/LoggedOut";
import { useStoreContext } from "../utils/GlobalState";
import { Container } from "react-bootstrap";
export default function BulletinBoard() {
  const [state, dispatch] = useStoreContext();

  return (
    <Container className="bulletin--container">
      {state.loggedIn === true ? <ViewBulletinBoard /> : <LoggedOut />}
      {state.currentUser.role === "User" && state.loggedIn === true ? (
        <PostBulletinBoard />
      ) : (
        ""
      )}
    </Container>
  );
}
