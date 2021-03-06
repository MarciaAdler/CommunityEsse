import React, { useEffect } from "react";
import { Row, ListGroup } from "react-bootstrap";
import dateFormat from "dateformat";
import { SET_NOTIFICATIONS } from "../utils/actions";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";
import { STATUS_CODES } from "http";

export default function ViewNotification() {
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    if (state.currentproperty !== 0) {
      getNotifications(state.currentproperty);
    } else {
      getNotifications(JSON.parse(localStorage.getItem("currentProperty")));
    }
  }, []);
  function getNotifications(currentproperty) {
    API.getNotifications(currentproperty).then((response) => {
      console.log(response);
      dispatch({ type: SET_NOTIFICATIONS, notifications: response.data });
    });
  }
  function markAsClosed(notification) {
    console.log(notification);
    API.markAsClosed(notification)
      .then((response) => {
        getNotifications(state.currentproperty);
      })
      .catch((err) => console.log(err));
  }
  function deleteNotification(notification) {
    API.deleteNotification(notification)
      .then((res) => {
        getNotifications(state.currentproperty);
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
                  <span>For: {notification.Receiver.aptNumber}</span>
                  <br />
                  <span className="view-notification--author-title">
                    <small>Posted By: {notification.Sender.firstName} </small>
                  </span>
                  {state.currentUser.role === "Front Desk" &&
                  notification.closed === true ? (
                    <button
                      className="view-notification--delete-btn"
                      onClick={() => {
                        deleteNotification(notification.id);
                      }}
                    >
                      X
                    </button>
                  ) : (
                    ""
                  )}{" "}
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
                  {state.currentUser.role === "Front Desk" &&
                  notification.closed === false ? (
                    <button
                      className="view-notification--read-btn"
                      onClick={() => {
                        markAsClosed(notification.id);
                      }}
                    >
                      Close
                    </button>
                  ) : (
                    ""
                  )}
                </ListGroup.Item>
              );
            })
          : ""}
      </ListGroup>
    </div>
  );
}
