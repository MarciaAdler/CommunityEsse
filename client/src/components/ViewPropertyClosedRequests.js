import React, { useEffect, useState } from "react";
import { Row, ListGroup, Button } from "react-bootstrap";
import dateFormat from "dateformat";
import { SET_PROPERTYCLOSEDREQUESTS, SET_REQUEST } from "../utils/actions";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";
import { Redirect } from "react-router-dom";

export default function ViewPropertyOpenRequests() {
  const [state, dispatch] = useStoreContext();
  const [redirect, setRedirect] = useState(false);

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

  // capturing selected song title and artist in url
  const renderRedirect = () => {
    if (state.selectedrequest && redirect) {
      return (
        <Redirect
          push
          to={{
            pathname: "/request",
            search: `?${state.selectedrequest.id}`,
          }}
        />
      );
    }
  };

  function selectRequest(request) {
    console.log(request);
    const selectedRequest = {
      id: request.id,
      request: request.request,
      notes: request.notes,
      SenderId: request.SenderId,
      senderFirstName: request.Sender.firstName,
      senderLastName: request.Sender.lastName,
      senderPhone: request.Sender.phoneNumber,
      senderAptNum: request.Sender.aptNumber,
    };
    dispatch({
      type: SET_REQUEST,
      selectedrequest: selectedRequest,
    });
    let localStorageRequest = {
      id: request.id,
      request: request.request,
      notes: request.notes,
      SenderId: request.SenderId,
      senderFirstName: request.Sender.firstName,
      senderLastName: request.Sender.lastName,
      senderPhone: request.Sender.phoneNumber,
      senderAptNum: request.Sender.aptNumber,
    };
    window.localStorage.setItem(
      "currentRequest",
      JSON.stringify(localStorageRequest)
    );
    setRedirect(true);
  }
  return (
    <div>
      <ListGroup>
        {state.propertyclosedrequests.map((request, index) => {
          return (
            <ListGroup.Item key={request.id}>
              <h3>Request Id: {request.id}</h3>
              <strong>Request: </strong>
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
                  Last Updated At:&nbsp;
                  {dateFormat(
                    `${request.updatedAt}`,
                    "dddd, mmmm, dS, yyyy, h:MM TT"
                  )}{" "}
                  {"EST"}
                </small>
              </span>
              <br />
              <Button
                className="button"
                onClick={() => {
                  selectRequest(request);
                }}
              >
                View Request
              </Button>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
      {renderRedirect()}
    </div>
  );
}
