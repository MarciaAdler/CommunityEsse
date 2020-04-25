import React, { useEffect } from "react";
import Header from "../components/Header";
import SideNav from "../components/SideNav";
import ViewAnnouncements from "../components/ViewAnnouncements";
import BulletinBoard from "../components/BulletinBoard";
import { Row, Col, Container, ListGroup } from "react-bootstrap";
import { SET_ANNOUNCEMENTS } from "../utils/actions";
import { useStoreContext } from "../utils/GlobalState";
import dateFormat from "dateformat";
import API from "../utils/API";

export default function Home() {
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    getAnnouncements(state.announcements);
  }, []);
  function getAnnouncements(message) {
    API.getAnnouncements(message).then((response) => {
      dispatch({ type: SET_ANNOUNCEMENTS, announcements: response.data });
    });
  }

  return (
    <div>
      <Container className="homepage--container">
        <Row>
          <Col className="homepage--col col-md-8 col-sm-6">
            <h2>Announcements</h2>
            <ListGroup>
              {state.announcements.length > 0
                ? state.announcements.slice(0, 5).map((announcement, index) => {
                    return (
                      <ListGroup.Item key={index}>
                        {announcement.message}
                        <br></br>
                        <span className="view-announcement--date">
                          <small>
                            {dateFormat(
                              `${announcement.createdAt}`,
                              "dddd, mmmm, dS, yyyy, h:MM TT"
                            )}{" "}
                            {"EST"}
                          </small>
                        </span>
                      </ListGroup.Item>
                    );
                  })
                : "no announcements"}
            </ListGroup>
          </Col>
          <Col className="col-sm-6 col-md-4">
            <SideNav />
          </Col>
        </Row>
        <div className="homepage--bulletinboard">
          <Row>
            <Col className="col-md-6">
              <BulletinBoard />
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}
