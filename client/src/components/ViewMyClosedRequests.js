import React, { useEffect } from "react";
import { Row, ListGroup } from "react-bootstrap";
import dateFormat from "dateformat";
import { SET_CLOSEDREQUESTS } from "../utils/actions";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";

export default function ViewMyClosedRequests() {
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    if (state.currentUser.id !== 0) {
      getMyClosedRequests(state.currentUser);
    } else {
      getMyClosedRequests(JSON.parse(localStorage.getItem("currentUser")));
    }
  }, []);

  function getMyClosedRequests(currentUser) {
    API.getMyClosedRequests(currentUser.id)
      .then((response) => {
        console.log(response);
        dispatch({ type: SET_CLOSEDREQUESTS, closedrequests: response.data });
      })
      .catch((err) => console.log(err));
  }

  //   function markAsClosed(request) {
  //     console.log(request);
  //     API.markAsClosed(request)
  //       .then((response) => {
  //         getMyClosedRequests(state.currentUser);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  //   function hideRequest(request) {
  //     API.hideNotification(request)
  //       .then((res) => {
  //         getMyOpenRequests(state.currentUser);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  return (
    <div>
      <ListGroup>
        {state.closedrequests
          ? state.closedrequests.map((request, index) => {
              return (
                <ListGroup.Item key={request.id}>
                  <h3>Request Id: {request.id}</h3>
                  <strong>Request:</strong> {request.request}
                  <br />
                  {request.notes !== null ? (
                    <p>
                      <strong>Notes from Maintenance:</strong>
                      <br />
                      {request.notes}
                    </p>
                  ) : (
                    ""
                  )}
                  <br></br>
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
