import React, { useEffect, useRef } from "react";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";
import { SET_REQUEST } from "../utils/actions";
import { FORM, Form, Button } from "react-bootstrap";

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
  return (
    <div>
      <h2>
        <i className="fas fa-toolbox"></i> Request #{state.selectedrequest.id}{" "}
        from Apt: {state.selectedrequest.senderAptNum}
      </h2>
      <div className="viewrequest--body">
        <h4>
          Requester Name: {state.selectedrequest.senderFirstName}{" "}
          {state.selectedrequest.senderLastName}
        </h4>
        <h5>Phone Number: {state.selectedrequest.senderPhone}</h5>
        <p>{state.selectedrequest.request}</p>
      </div>
      <Form className="request--note-form">
        <Form.Group controlId="noteForm">
          <Form.Label>Add Note</Form.Label>
          <Form.Control
            as="textarea"
            rows="5"
            ref={noteRef}
            defaultValue={state.selectedrequest.notes}
          />
        </Form.Group>

        <Button
          className="button"
          onClick={() => {
            createRequestNote(state.selectedrequest.id);
          }}
        >
          Add
        </Button>
      </Form>
    </div>
  );
}
