import React from "react";
import ViewNotifications from "../components/ViewNotifications";
import PostNotification from "../components/PostNotification";
import ViewMyNotifications from "../components/ViewMyNotifications";
import LoggedOut from "../components/LoggedOut";
import { Container } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";

export default function Notifications() {
  const [state, dispatch] = useStoreContext();
  return (
    <div>
      <Container className="notifications--container">
        {state.currentUser.role !== "User" && state.loggedIn === true ? (
          <ViewNotifications />
        ) : (
          " "
        )}
        {state.currentUser.role === "User" && state.loggedIn === true ? (
          <ViewMyNotifications />
        ) : (
          ""
        )}

        {state.currentUser.role === "Front Desk" && state.loggedIn === true ? (
          <PostNotification />
        ) : (
          ""
        )}
      </Container>
      {state.loggedIn === false ? (
        <Container>
          <LoggedOut />
        </Container>
      ) : (
        ""
      )}
    </div>
  );
}
