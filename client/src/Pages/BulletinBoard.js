import React from "react";
import ViewBulletinBoard from "../components/ViewBulletinBoard";
import PostBulletinBoard from "../components/PostBulletinBoard";
import { useStoreContext } from "../utils/GlobalState";
import { Container } from "react-bootstrap";
export default function BulletinBoard() {
  const [state, dispatch] = useStoreContext();

  return (
    <Container className="bulletin--container">
      <ViewBulletinBoard />
      {state.currentUser.role === "User" ? <PostBulletinBoard /> : ""}
    </Container>
  );
}
