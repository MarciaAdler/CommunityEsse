import React, { useRef, useEffect, useState } from "react";
import { Row, ListGroup, Accordion, Card, Button, Form } from "react-bootstrap";
import dateFormat from "dateformat";
import { SET_PROPERTYOPENREQUESTS, SET_REQUEST } from "../utils/actions";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";
import { Redirect } from "react-router-dom";

export default function ViewPropertyOpenRequests() {
  const [state, dispatch] = useStoreContext();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (state.currentproperty !== 0) {
      getPropertyOpenRequests(state.currentproperty);
    } else {
      getPropertyOpenRequests(
        JSON.parse(localStorage.getItem("currentProperty"))
      );
    }
  }, []);

  function getPropertyOpenRequests(currentproperty) {
    console.log(currentproperty);
    API.getPropertyOpenRequests(currentproperty)
      .then((response) => {
        console.log(response);
        dispatch({
          type: SET_PROPERTYOPENREQUESTS,
          propertyopenrequests: response.data,
        });
      })
      .catch((err) => console.log(err));
  }

  function markRequestAsClosed(request) {
    console.log(request);
    API.markRequestAsClosed(request)
      .then((response) => {
        getPropertyOpenRequests(state.currentproperty);
      })
      .catch((err) => console.log(err));
  }
  // function createRequestNote(request) {
  //   console.log(noteRef.current.value);
  //   console.log(request);
  //   API.addNote({
  //     id: request,
  //     notes: noteRef.current.value,
  //   });
  // }
  // function createRequestNote(request) {
  //   console.log(noteRef.current.value);
  //   API.addNote({
  //     id: request,
  //     notes: noteRef.current.value,
  //   })
  //     .then((req) => {
  //       console.log(req);
  //       getPropertyOpenRequests(state.currenproperty);
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

  // function hideRequest(request) {
  //   API.hideNotification(request)
  //     .then((res) => {
  //       getPropertyOpenRequests(state.currentUser);
  //     })
  //     .catch((err) => console.log(err));
  // }
  return (
    <div className="list-group">
      <Accordion>
        {state.propertyopenrequests.length > 0
          ? state.propertyopenrequests.map((request, index) => {
              return (
                <Card
                  key={request.id}
                  onClick={() => {
                    selectRequest(request);
                  }}
                >
                  <Card.Header>
                    <Accordion.Toggle
                      as={Button}
                      variant="link"
                      eventKey={request.id}
                      className="accordion"
                    >
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
                    </Accordion.Toggle>
                    {request.closed === false ? (
                      <button
                        className="view-notification--read-btn"
                        onClick={() => {
                          markRequestAsClosed(request.id);
                        }}
                      >
                        Close
                      </button>
                    ) : (
                      ""
                    )}
                  </Card.Header>
                  {/* <Accordion.Collapse eventKey={request.id}>
                    <Card.Body>
                      <Form className="request--note-form">
                        <Form.Group controlId="noteForm">
                          <Form.Label>Add Note</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows="5"
                            ref={noteRef}
                            defaultValue={request.notes}
                          />
                        </Form.Group>

                        <Button
                          className="button"
                          onClick={() => {
                            createRequestNote(request.id);
                          }}
                        >
                          Add
                        </Button>
                      </Form>
                    </Card.Body>
                  </Accordion.Collapse> */}
                </Card>
              );
            })
          : ""}
      </Accordion>
      {renderRedirect()}
    </div>
  );
}
