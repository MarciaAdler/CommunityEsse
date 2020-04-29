import React from "react";
import ViewNotifications from "../components/ViewNotifications";
import PostNotification from "../components/PostNotification";
import ViewMyNotifications from "../components/ViewMyNotifications";
import { Container } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";

export default function Notifications() {
  const [state, dispatch] = useStoreContext();
  return (
    <Container className="notifications--container">
      {state.currentUser.role !== "User" ? (
        <ViewNotifications />
      ) : (
        <ViewMyNotifications />
      )}
      {state.currentUser.role === "Front Desk" ? <PostNotification /> : ""}
    </Container>
  );
}
