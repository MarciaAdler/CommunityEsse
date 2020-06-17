import React, { useEffect, useRef } from "react";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";
import { SET_REQUEST } from "../utils/actions";
import { FORM, Form, Button } from "react-bootstrap";
import dateFormat from "dateformat";

export default function ViewRequest() {
  const [state, dispatch] = useStoreContext();
  const noteRef = useRef();
  useEffect(() => {
    loadRequest(window.location.search);
  }, []);

  function loadRequest(url) {
    console.log("From loadRequest function: ");
    console.log(url);

    if (state.selectedrequest.id === 0) {
      API.getRequestFromURL(url.replace("?", ""))
        .then((res) => {
          console.log(res);
          const request = {
            id: res.data.id,
            request: res.data.request,
            notes: res.data.notes,
            SenderId: res.data.SenderId,
            senderFirstName: res.data.Sender.firstName,
            senderLastName: res.data.Sender.lastName,
            senderPhone: res.data.Sender.phoneNumber,
            senderAptNum: res.data.Sender.aptNumber,
            status: res.data.closed,
          };
          dispatch({
            type: SET_REQUEST,
            selectedrequest: request,
          });
        })
        .catch((err) => console.log(err));
    } else {
      dispatch({
        type: SET_REQUEST,
        selectedrequest: state.selectedrequest,
      });
    }
  }
  function createRequestNote(request) {
    console.log(request);
    console.log(noteRef.current.value);
    API.addNote({
      id: request,
      notes: noteRef.current.value,
    })
      .then((req) => {
        console.log(req);
      })
      .catch((err) => console.log(err));
  }
  function markRequestAsClosed(request) {
    console.log(request);
    API.markRequestAsClosed(request)
      .then((response) => {})
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <h2>
        <i className="fas fa-toolbox"></i> Request #{state.selectedrequest.id}{" "}
        from Apt: {state.selectedrequest.senderAptNum}
      </h2>
      {state.selectedrequest.status === false ? (
        <Button
          className="request--read-btn mb-2"
          onClick={() => {
            markRequestAsClosed(state.selectedrequest.id);
          }}
        >
          Close Request
        </Button>
      ) : (
        <div className="mb-2">
          <strong>Status: </strong>"Closed"
        </div>
      )}
      <div className="viewrequest--body">
        <h4>
          Requester Name: {state.selectedrequest.senderFirstName}{" "}
          {state.selectedrequest.senderLastName}
        </h4>
        <h5>Phone Number: {state.selectedrequest.senderPhone}</h5>

        <p>
          <strong>
            Request:
            <br />
          </strong>{" "}
          {state.selectedrequest.request}
        </p>
      </div>
      {state.selectedrequest.status === false ? (
        <Form className="request--note-form">
          <Form.Group controlId="noteForm">
            <Form.Label className="mb-0">
              <strong>Add Note Below:</strong>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows="5"
              ref={noteRef}
              defaultValue={state.selectedrequest.notes}
            />
          </Form.Group>

          <Button
            className="button mb-3"
            onClick={() => {
              createRequestNote(state.selectedrequest.id);
            }}
          >
            Add Note
          </Button>
        </Form>
      ) : (
        <div>
          <p>
            <strong>Notes: </strong>
            <br />
            {state.selectedrequest.notes}
          </p>
        </div>
      )}
      <a href="/maintenance">Back to Maintenance Requests</a>
    </div>
  );
}
