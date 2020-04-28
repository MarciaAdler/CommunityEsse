import React, { useEffect } from "react";
import { Row, Tabs, Tab } from "react-bootstrap";
import dateFormat from "dateformat";
import { SET_NOTIFICATIONS } from "../utils/actions";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";
import Sent from "../components/Sent";
import Inbox from "../components/Inbox";

export default function ViewNotification() {
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    if (state.currentUser.id !== 0) {
      getMyNotifications(state.currentUser);
    } else {
      getMyNotifications(JSON.parse(localStorage.getItem("currentUser")));
    }
  }, []);

  function getMyNotifications(currentUser) {
    API.getMyNotifications(currentUser.id)
      .then((response) => {
        dispatch({ type: SET_NOTIFICATIONS, notifications: response.data });
      })
      .catch((err) => console.log(err));
  }

  function markAsRead(notification) {
    API.markAsRead(notification)
      .then((response) => {
        getMyNotifications(state.currentUser);
      })
      .catch((err) => console.log(err));
  }
  function deleteNotification(notification) {
    API.deleteNotification(notification)
      .then((res) => {
        getMyNotifications(state.currentUser);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <h2>Messages</h2>
      <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
        <Tab eventKey="Inbox" title="Inbox">
          <Inbox />
        </Tab>
        <Tab eventKey="Sent" title="Sent Messages">
          <Sent />
        </Tab>
      </Tabs>
    </div>
  );
}
