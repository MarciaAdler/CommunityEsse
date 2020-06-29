import React, { useState, useRef, useEffect } from "react";
import { Container } from "react-bootstrap";
import FileUpload from "../components/FileUpload";
import ViewFiles from "../components/ViewFiles";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";

import LoggedOut from "../components/LoggedOut";

export default function Files() {
  const [state, dispatch] = useStoreContext();
  const [propertyName, setPropertyName] = useState(""); // storing the property name

  // useEffect(() => {
  //   if (state.currentproperty !== 0) {
  //     getPropertyName(state.currentproperty);
  //   } else if (state.loggedIn === true) {
  //     getPropertyName(JSON.parse(localStorage.getItem("currentProperty")));
  //   }
  // }, []);

  // get property name
  // function getPropertyName(currentproperty) {
  //   API.getPropertyName(currentproperty).then((response) => {
  //     setPropertyName(response.data.name);
  //   });
  // }
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
