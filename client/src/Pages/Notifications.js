import React from "react";
import ViewNotifications from "../components/ViewNotifications";
import PostNotification from "../components/PostNotification";
import ViewMyNotifications from "../components/ViewMyNotifications";
import LoggedOut from "../components/LoggedOut";
import { Container, Tabs, Tab } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";

export default function Notifications() {
  const [state, dispatch] = useStoreContext();
  return (
    <div>
      <Container className="notifications--container">
        <h2>
          <i className="fas fa-scroll"></i> Front Desk Notifications
        </h2>

        <Tabs defaultActiveKey="Notifications" id="uncontrolled-tab-example">
          {state.currentUser.role !== "User" ? (
            <Tab eventKey="Notifications" title="Notifications">
              <ViewNotifications />
            </Tab>
          ) : (
            <Tab eventKey="Notifications" title="Notifications">
              <ViewMyNotifications />
            </Tab>
          )}
          {state.currentUser.role === "Front Desk" &&
          state.loggedIn === true ? (
            <Tab eventKey="Sent" title="Send Notification">
              <PostNotification />
            </Tab>
          ) : (
            ""
          )}
        </Tabs>
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
