import React, { useEffect } from "react";
import { Row, ListGroup } from "react-bootstrap";
import dateFormat from "dateformat";
import { SET_PROPERTYCLOSEDREQUESTS } from "../utils/actions";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";

export default function ViewPropertyOpenRequests() {
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    if (state.currentUser.id !== 0) {
      getPropertyClosedRequests(state.currentproperty);
    } else {
      getPropertyClosedRequests(
        JSON.parse(localStorage.getItem("currentProperty"))
      );
    }
  }, []);

  function getPropertyClosedRequests(currentproperty) {
    console.log(currentproperty);
    API.getPropertyClosedRequests(currentproperty)
      .then((response) => {
        console.log(response);
        dispatch({
          type: SET_PROPERTYCLOSEDREQUESTS,
          propertyclosedrequests: response.data,
        });
      })
      .catch((err) => console.log(err));
  }

  // function hideRequest(request) {
  //   API.hideNotification(request)
  //     .then((res) => {
  //       getPropertyOpenRequests(state.currentUser);
  //     })
  //     .catch((err) => console.log(err));
  // }
  return (
    <div>
      <ListGroup>
        {state.propertyclosedrequests.map((request, index) => {
          return (
            <ListGroup.Item key={request.id}>
              {request.request}
              <br />
              <span>Requester Apt: {request.Sender.aptNumber}</span>
              <br />
              <span className="view-notification--author-title">
                <small>
                  Requester Name: {request.Sender.firstName}{" "}
                  {request.Sender.lastName}{" "}
                </small>
              </span>

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
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
}
