import React, { useEffect } from "react";
import { Row, ListGroup } from "react-bootstrap";
import dateFormat from "dateformat";
import { SET_NOTIFICATIONS } from "../utils/actions";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";

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
      <h2>Notifications</h2>

      <ListGroup>
        {state.notifications.length
          ? state.notifications.map((notification, index) => {
              return (
                <ListGroup.Item key={notification.id}>
                  {notification.message}
                  {state.currentUser.role === "User" &&
                  notification.read === false ? (
                    <button
                      className="view-notification--read-btn"
                      onClick={() => {
                        markAsRead(notification.id);
                      }}
                    >
                      read
                    </button>
                  ) : (
                    ""
                  )}
                  <br />
                  <span className="view-notification--author-title">
                    <small>
                      Posted By: {notification.Sender.firstName}{" "}
                      {notification.Sender.lastName}{" "}
                    </small>
                  </span>

                  <button
                    className="view-notification--delete-btn"
                    onClick={() => {
                      deleteNotification(notification.id);
                    }}
                  >
                    X
                  </button>

                  <br></br>
                  <span className="view-notification--date">
                    <small>
                      {dateFormat(
                        `${notification.createdAt}`,
                        "dddd, mmmm, dS, yyyy, h:MM TT"
                      )}{" "}
                      {"EST"}
                    </small>
                  </span>
                </ListGroup.Item>
              );
            })
          : ""}
      </ListGroup>
    </div>
  );
}
