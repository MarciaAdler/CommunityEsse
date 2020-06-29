import React from "react";
import ViewAnnouncements from "../components/ViewAnnouncements";
import PostAnnouncement from "../components/PostAnnouncement";
import LoggedOut from "../components/LoggedOut";
import { Container, Tabs, Tab } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";

export default function Announcements() {
  const [state, dispatch] = useStoreContext();

  return (
    <Container className="announcements--container">
      {state.loggedIn === true ? (
        <div>
          <h2>
            <i className="fas fa-building"></i> Building Announcements
          </h2>
          <Tabs defaultActiveKey="Announcements" id="uncontrolled-tab-example">
            <Tab eventKey="Announcements" title="Announcements">
              <ViewAnnouncements />
            </Tab>

            {state.currentUser.role === "Admin" && state.loggedIn === true ? (
              <Tab eventKey="Post" title="Post Announcement">
                <PostAnnouncement />
              </Tab>
            ) : (
              ""
            )}
          </Tabs>
        </div>
      ) : (
        <LoggedOut />
      )}
    </Container>
  );
}
