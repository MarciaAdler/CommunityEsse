import React, { useState, useRef } from "react";
import { Container } from "react-bootstrap";
import FileUpload from "../components/FileUpload";
import ViewFiles from "../components/ViewFiles";
import { useStoreContext } from "../utils/GlobalState";

export default function Files() {
  const [state, dispatch] = useStoreContext();
  return (
    <div>
      <Container className="files--container">
        <h2>
          <i className="fas fa-folder-open"></i> Building Files
        </h2>
        {state.currentUser.role === "Admin" ? <FileUpload /> : ""}
        <hr />
        <ViewFiles />
      </Container>
    </div>
  );
}