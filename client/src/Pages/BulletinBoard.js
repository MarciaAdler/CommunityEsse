import React from "react";
import ViewBulletinBoard from "../components/ViewBulletinBoard";
import PostBulletinBoard from "../components/PostBulletinBoard";
import LoggedOut from "../components/LoggedOut";
import { useStoreContext } from "../utils/GlobalState";
import { Container, Tabs, Tab } from "react-bootstrap";
export default function BulletinBoard() {
  const [state, dispatch] = useStoreContext();

  return (
    <Container className="bulletin--container">
      {state.loggedIn === true ? (
        <div>
          <h2>
            <i className="fas fa-clipboard-list"></i> Bulletin Board
          </h2>
          <Tabs defaultActiveKey="Bulletins" id="uncontrolled-tab-example">
            {state.loggedIn === true ? (
              <Tab eventKey="Bulletins" title="Bulletins">
                <ViewBulletinBoard />
              </Tab>
            ) : (
              <LoggedOut />
            )}
            {state.currentUser.role === "User" && state.loggedIn === true ? (
              <Tab eventKey="Post" title="Post Bulletin">
                <PostBulletinBoard />
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
