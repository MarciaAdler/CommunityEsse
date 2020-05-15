import React, { useState, useRef } from "react";
import { Container } from "react-bootstrap";
import FileUpload from "../components/FileUpload";
import ViewFiles from "../components/ViewFiles";
import API from "../utils/API";
export default function Files() {
  return (
    <div>
      <Container className="files--container">
        <FileUpload />
        <hr />
        <ViewFiles />
      </Container>
    </div>
  );
}
