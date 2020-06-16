import React from "react";
import { Row, Tabs, Tab } from "react-bootstrap";
import ViewAnnouncements from "../components/ViewAnnouncements";
import PostRequest from "../components/PostRequest";
import LoggedOut from "../components/LoggedOut";
import { Container } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";

export default function MaintenanceRequests() {
  const [state, dispatch] = useStoreContext();
  return (
    <Container className="messages--container">
      {/* {state.loggedIn === true ? <ViewRequests /> : <LoggedOut />} */}

      {/* {state.currentUser.role === "User" && state.loggedIn === true ? (
        <PostRequest />
      ) : (
        ""
      )} */}
      <div>
        <h2>
          <i className="fas fa-toolbox"></i> Maintenance Requests
        </h2>
        <Tabs defaultActiveKey="Submit" id="uncontrolled-tab-example">
          <Tab eventKey="Submit" title="Submit Requests">
            <PostRequest />
          </Tab>
          {/* <Tab eventKey="Sent" title="Sent Messages">
            <Sent />
          </Tab>
          <Tab eventKey="Write" title="Write Message">
            <PostMessages />
          </Tab> */}
        </Tabs>
      </div>
    </Container>
  );
}
