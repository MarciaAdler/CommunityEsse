import React from "react";
import { Row, Tabs, Tab } from "react-bootstrap";
import ViewPropertyClosedRequests from "../components/ViewPropertyClosedRequests";
import PostRequest from "../components/PostRequest";
import ViewMyRequests from "../components/ViewMyRequests";
import ViewMyClosedRequests from "../components/ViewMyClosedRequests";
import ViewPropertyOpenRequests from "../components/ViewPropertyOpenRequests";
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
      {state.currentUser.role === "User" ? (
        <div>
          <h2>
            <i className="fas fa-toolbox"></i> Maintenance Requests
          </h2>

          <Tabs defaultActiveKey="Submit" id="uncontrolled-tab-example">
            <Tab eventKey="Submit" title="Submit Requests">
              <PostRequest />
            </Tab>
            <Tab eventKey="Open" title="Open Requests">
              <ViewMyRequests />
            </Tab>
            <Tab eventKey="Closed" title="Closed Requests">
              <ViewMyClosedRequests />
            </Tab>
          </Tabs>
        </div>
      ) : (
        <div>
          <h2>
            <i className="fas fa-toolbox"></i> Maintenance Requests
          </h2>
          <Tabs>
            <Tab eventKey="Open" title="Open Requests">
              <ViewPropertyOpenRequests />
            </Tab>
            <Tab eventKey="Closed" title="Closed Requests">
              <ViewPropertyClosedRequests />
            </Tab>
          </Tabs>
        </div>
      )}
    </Container>
  );
}
