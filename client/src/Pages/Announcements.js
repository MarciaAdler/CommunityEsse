import React, { useEffect, useState } from "react";
import ViewAnnouncements from "../components/ViewAnnouncements";
import PostAnnouncement from "../components/PostAnnouncement";
import LoggedOut from "../components/LoggedOut";
import { Container, Tabs, Tab } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";

export default function Announcements() {
  const [state, dispatch] = useStoreContext();
  const [propertyName, setPropertyName] = useState("");

  useEffect(() => {
    if (state.currentproperty !== 0) {
      getPropertyName(state.currentproperty);
    } else {
      getPropertyName(localStorage.getItem("currentProperty"));
    }
  }, []);

  function getPropertyName(currentproperty) {
    API.getPropertyName(currentproperty).then((response) => {
      console.log(response.data.name);
      setPropertyName(response.data.name);
    });
  }
  return (
    <Container className="announcements--container">
      <h2>
        <i className="fas fa-building"></i> {propertyName} Building
        Announcements
      </h2>
      <Tabs defaultActiveKey="Announcements" id="uncontrolled-tab-example">
        {state.loggedIn === true ? (
          <Tab eventKey="Announcements" title="Announcements">
            <ViewAnnouncements />
          </Tab>
        ) : (
          <LoggedOut />
        )}

        {state.currentUser.role === "Admin" && state.loggedIn === true ? (
          <Tab eventKey="Post" title="Post Announcement">
            <PostAnnouncement />
          </Tab>
        ) : (
          ""
        )}
      </Tabs>
    </Container>
  );
}
