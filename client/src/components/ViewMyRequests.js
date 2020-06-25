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

  // function hideRequest(request) {
  //   API.hideNotification(request)
  //     .then((res) => {
  //       getMyOpenRequests(state.currentUser);
  //     })
  //     .catch((err) => console.log(err));
  // }
  return (
    <div>
      <ListGroup>
        {state.openrequests
          ? state.openrequests.map((request, index) => {
              return (
                <ListGroup.Item key={request.id}>
                  <h3>Request Id: {request.id}</h3>
                  <strong>Request:</strong> {request.request}
                  <span className="view-notification--date">
                    <br />
                    <small>
                      Submitted on:&nbsp;
                      {dateFormat(
                        `${request.createdAt}`,
                        "dddd, mmmm, dS, yyyy, h:MM TT"
                      )}{" "}
                      {"EST"}
                    </small>
                  </span>
                  <hr />
                  <p>
                    <strong>Notes from Maintenance:</strong>
                    <br />
                    {request.notes}
                  </p>
                  <span className="view-notification--date">
                    <small>
                      Last Updated At:&nbsp;
                      {dateFormat(
                        `${request.updatedAt}`,
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
