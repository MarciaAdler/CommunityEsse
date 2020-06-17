import React, { useEffect } from "react";
import { Row, ListGroup } from "react-bootstrap";
import dateFormat from "dateformat";
import { SET_OPENREQUESTS } from "../utils/actions";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";

export default function ViewMyRequests() {
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    if (state.currentUser.id !== 0) {
      getMyOpenRequests(state.currentUser);
    } else {
      getMyOpenRequests(JSON.parse(localStorage.getItem("currentUser")));
    }
  }, []);

  function getMyOpenRequests(currentUser) {
    API.getMyOpenRequests(currentUser.id)
      .then((response) => {
        console.log(response);
        dispatch({ type: SET_OPENREQUESTS, openrequests: response.data });
      })
      .catch((err) => console.log(err));
  }

  //   function markAsRead(notification) {
  //     console.log(notification);
  //     API.markAsRead(notification)
  //       .then((response) => {
  //         getMyRequests(state.currentUser);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  function hideRequest(request) {
    API.hideNotification(request)
      .then((res) => {
        getMyOpenRequests(state.currentUser);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <ListGroup>
        {state.openrequests
          ? state.openrequests.map((request, index) => {
              return (
                <ListGroup.Item key={request.id}>
                  {request.request}
                  <br />
                  {request.notes !== null ? <p>{request.notes}</p> : ""}

                  <br></br>
                  <span className="view-notification--date">
                    <small>
                      {dateFormat(
                        `${request.createdAt}`,
                        "dddd, mmmm, dS, yyyy, h:MM TT"
                      )}{" "}
                      {"EST"}
                    </small>
                  </span>
                  <br />
                  {/* {state.currentUser.role === "User" &&
                  notification.read === false ? (
                    <button
                      className="view-notification--read-btn"
                      onClick={() => {
                        markAsRead(notification.id);
                      }}
                    >
                      Mark as Read
                    </button>
                  ) : (
                    ""
                  )} */}
                </ListGroup.Item>
              );
            })
          : ""}
      </ListGroup>
    </div>
  );
}
