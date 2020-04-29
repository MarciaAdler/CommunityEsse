import React, { useEffect } from "react";
import { Card, Accordion, Button } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";
import { SET_RECEIVED_MESSAGES } from "../utils/actions";
import dateFormat from "dateformat";

export default function Inbox() {
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    if (state.currentUser.id !== 0) {
      getReceivedMessages(state.currentUser);
    } else {
      getReceivedMessages(JSON.parse(localStorage.getItem("currentUser")));
    }
  }, []);

  function getReceivedMessages(currentUser) {
    console.log(currentUser);
    API.getReceivedMessages(currentUser.id)
      .then((response) => {
        console.log(response.data);
        dispatch({
          type: SET_RECEIVED_MESSAGES,
          receivedmessages: response.data,
        });
      })
      .catch((err) => console.log(err));
  }

  function markMessageAsRead(message) {
    API.markMessageAsRead(message)
      .then((res) => {
        getReceivedMessages(state.currentUser);
      })
      .catch((err) => console.log(err));
  }

  function inboxHide(message) {
    API.inboxHide(message)
      .then((res) => {
        getReceivedMessages(state.currentUser);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="list-group">
      <Accordion>
        {state.receivedmessages.length > 0
          ? state.receivedmessages.map((message) => {
              return (
                <Card key={message.id}>
                  <Card.Header>
                    <Accordion.Toggle
                      as={Button}
                      variant="link"
                      eventKey={message.id}
                      className="accordion"
                    >
                      Subject: {message.subject}
                      <br />
                      From: {message.Sender.firstName} {message.Sender.lastName}
                      <br></br>
                      <span className="view-bulletin--date">
                        <small>
                          {dateFormat(
                            `${message.createdAt}`,
                            "dddd, mmmm, dS, yyyy, h:MM TT"
                          )}{" "}
                          {"EST"}
                        </small>
                      </span>
                    </Accordion.Toggle>
                    {message.read === false ? (
                      <button
                        className="view-notification--read-btn"
                        onClick={() => {
                          markMessageAsRead(message.id);
                        }}
                      >
                        Mark as Read
                      </button>
                    ) : (
                      <button
                        className="view-notification--hide-btn"
                        onClick={() => {
                          inboxHide(message.id);
                        }}
                      >
                        Hide
                      </button>
                    )}
                  </Card.Header>
                  <Accordion.Collapse eventKey={message.id}>
                    <Card.Body>{message.message}</Card.Body>
                  </Accordion.Collapse>
                </Card>
              );
            })
          : "no messages"}
      </Accordion>
    </div>
  );
}
