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
        console.log(response);
        dispatch({ type: SET_NOTIFICATIONS, notifications: response.data });
      })
      .catch((err) => console.log(err));
  }

  function markAsRead(notification) {
    console.log(notification);
    API.markAsRead(notification)
      .then((response) => {
        getMyNotifications(state.currentUser);
      })
      .catch((err) => console.log(err));
  }
  function hideNotification(notification) {
    API.hideNotification(notification)
      .then((res) => {
        getMyNotifications(state.currentUser);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <ListGroup>
        {state.notifications.length
          ? state.notifications.map((notification, index) => {
              return (
                <ListGroup.Item key={notification.id}>
                  {notification.message}

                  <br />
                  <span className="view-notification--author-title">
                    <small>
                      Posted By: {notification.Sender.firstName}{" "}
                      {notification.Sender.lastName}{" "}
                    </small>
                  </span>

                  {notification.read === true ? (
                    <button
                      className="view-notification--delete-btn"
                      onClick={() => {
                        hideNotification(notification.id);
                      }}
                    >
                      X
                    </button>
                  ) : (
                    <button
                      className="view-notification--read-btn"
                      onClick={() => {
                        markAsRead(notification.id);
                      }}
                    >
                      Mark as Read
                    </button>
                  )}

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
                  <br />
                </ListGroup.Item>
              );
            })
          : ""}
      </ListGroup>
    </div>
  );
}
