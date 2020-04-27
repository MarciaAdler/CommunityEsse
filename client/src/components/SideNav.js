import React, { useEffect } from "react";
import { Nav, Container, Col } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";
import { SET_NOTIFICATIONS } from "../utils/actions";
import API from "../utils/API";
export default function SideNav() {
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    getMyNotifications(state.notifications);
  }, []);
  function getMyNotifications(notification) {
    API.getMyNotifications(notification)
      .then((response) => {
        dispatch({ type: SET_NOTIFICATIONS, notifications: response.data });
      })
      .catch((err) => console.log(err));
  }

  const unread = state.notifications.filter(
    (notification) => notification.read === false
  ).length;

  return (
    <Container className="side-nav--container">
      {state.loggedIn ? (
        <Nav
          defaultActiveKey="/home"
          className="align-items-start side-nav--nav"
        >
          <Nav.Link className="side-nav--link" href="/announcements">
            Announcements
          </Nav.Link>
          <Nav.Link className="side-nav--link" href="/bulletinboard">
            Bulletin Board
          </Nav.Link>
          <Nav.Link className="side-nav--link" href="/messages">
            Messages
          </Nav.Link>
          <Nav.Link className="side-nav--link" href="/notifications">
            Notifications{" "}
            {state.notifications.length > 0 &&
            state.currentUser.role === "User" ? (
              <span className="side-nav--notification-unread"> ({unread})</span>
            ) : (
              "0"
            )}
          </Nav.Link>
        </Nav>
      ) : (
        ""
      )}
    </Container>
  );
}
