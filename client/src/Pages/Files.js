import React, { useState, useRef, useEffect } from "react";
import { Container } from "react-bootstrap";
import FileUpload from "../components/FileUpload";
import ViewFiles from "../components/ViewFiles";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";

export default function Files() {
  const [state, dispatch] = useStoreContext();
  const [propertyName, setPropertyName] = useState(""); // storing the property name

  useEffect(() => {
    if (state.currentproperty !== 0) {
      getPropertyName(state.currentproperty);
    } else {
      getPropertyName(JSON.parse(localStorage.getItem("currentProperty")));
    }
  }, []);

  // get property name
  function getPropertyName(currentproperty) {
    API.getPropertyName(currentproperty).then((response) => {
      setPropertyName(response.data.name);
    });
  }
  return (
    <div>
      <Container className="files--container">
        <h2>
          <i className="fas fa-folder-open"></i> {propertyName} Building Files
        </h2>
        <FileUpload />
      </Container>
    </div>
  );
}
