import React, { useState, useRef, useEffect } from "react";
import { Container } from "react-bootstrap";
import FileUpload from "../components/FileUpload";
import ViewFiles from "../components/ViewFiles";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";

import LoggedOut from "../components/LoggedOut";

export default function Files() {
  const [state, dispatch] = useStoreContext();

  return (
    <div>
      {state.loggedIn === true ? (
        <Container className="files--container">
          <h2>
            <i className="fas fa-folder-open"></i> Building Files
          </h2>
          <FileUpload />
        </Container>
      ) : (
        <LoggedOut />
      )}
    </div>
  );
}
