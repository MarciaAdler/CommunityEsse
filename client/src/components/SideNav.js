import React, { useEffect, useState } from "react";
import { Nav, Container, Col } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";
import { SET_NOTIFICATIONS, SET_RECEIVED_MESSAGES } from "../utils/actions";
import API from "../utils/API";
export default function SideNav() {
  const [state, dispatch] = useStoreContext();
  const [frontDesk, setFrontDesk] = useState([]);
  useEffect(() => {
    if (state.currentUser.id !== 0) {
      getMyNotifications(state.currentUser);
      getReceivedMessages(state.currentUser);
    } else if (JSON.parse(localStorage.getItem("currentUser"))) {
      getMyNotifications(JSON.parse(localStorage.getItem("currentUser")));
      getReceivedMessages(JSON.parse(localStorage.getItem("currentUser")));
    }
  }, []);

  function getMyNotifications(currentUser) {
    API.getMyNotifications(currentUser.id)
      .then((response) => {
        dispatch({ type: SET_NOTIFICATIONS, notifications: response.data });
      })
      .catch((err) => console.log(err));
  }

  const unreadNotifications = state.notifications.filter(
    (notification) => notification.read === false
  ).length;

  function getReceivedMessages(currentUser) {
    console.log(currentUser);
    API.getReceivedMessages(currentUser.id)
      .then((response) => {
        console.log(response.data);
        dispatch({
          type: SET_RECEIVED_MESSAGES,
          receivedmessages: response.data,
        });
      })
      .catch((err) => console.log(err));
  }
  const unreadMessages = state.receivedmessages.filter(
    (message) => message.read === false
  ).length;
  return (
    <Container className="side-nav--container">
      {state.loggedIn ? (
        <Nav
          defaultActiveKey="/home"
          className="align-items-start side-nav--nav"
        >
          <Nav.Link className="side-nav--link" href="/announcements">
            <i class="fas fa-building"></i> Building Announcements
          </Nav.Link>
          <Nav.Link className="side-nav--link" href="/bulletinboard">
            <i class="fas fa-clipboard-list"></i> Bulletin Board
          </Nav.Link>
          <Nav.Link className="side-nav--link" href="/messages">
            <i class="fas fa-envelope-square"></i> Messages{" "}
            {state.receivedmessages.length > 0 ? (
              <span className="side-nav--notification-unread">
                {" "}
                ({unreadMessages})
              </span>
            ) : (
              ""
            )}
          </Nav.Link>
          <Nav.Link className="side-nav--link" href="/notifications">
            <i class="fas fa-scroll"></i> Front Desk Notifications{" "}
            {(state.notifications.length > 0 &&
              state.currentUser.role === "User") ||
            state.currentUser.role === "Admin" ? (
              <span className="side-nav--notification-unread">
                {" "}
                ({unreadNotifications})
              </span>
            ) : (
              ""
            )}
          </Nav.Link>
        </Nav>
      ) : (
        ""
      )}
    </Container>
  );
}
