import React, { useEffect } from "react";
import Header from "../components/Header";
import SideNav from "../components/SideNav";
import ViewAnnouncements from "../components/ViewAnnouncements";
import ViewBulletinBoard from "../components/ViewBulletinBoard";
import LoggedOut from "../components/LoggedOut";
import { Row, Col, Container, ListGroup } from "react-bootstrap";
import {
  SET_ANNOUNCEMENTS,
  SET_BULLETINS,
  SET_NOTIFICATIONS,
  SET_RECEIVED_MESSAGES,
} from "../utils/actions";
import { useStoreContext } from "../utils/GlobalState";
import dateFormat from "dateformat";
import API from "../utils/API";
import { Redirect, Link } from "react-router-dom";
import { stat } from "fs";

export default function Home() {
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    if (state.currentproperty !== 0) {
      getAnnouncements(state.currentproperty);
      getBulletins(state.currentproperty);
    } else if (JSON.parse(localStorage.getItem("currentProperty"))) {
      getAnnouncements(JSON.parse(localStorage.getItem("currentProperty")));
      getBulletins(JSON.parse(localStorage.getItem("currentProperty")));
    }

    if (state.currentUser.id !== 0) {
      getMyNotifications(state.currentUser);
      getReceivedMessages(state.currentUser);
    } else if (JSON.parse(localStorage.getItem("currentUser"))) {
      getMyNotifications(JSON.parse(localStorage.getItem("currentUser")));
      getReceivedMessages(JSON.parse(localStorage.getItem("currentUser")));
    } else {
      getNotifications(state.notifications);
      getReceivedMessages(state.receivedmessages);
    }
  }, []);
  function getAnnouncements(currentproperty) {
    API.getAnnouncements(currentproperty).then((response) => {
      dispatch({ type: SET_ANNOUNCEMENTS, announcements: response.data });
    });
  }
  function getBulletins(currentproperty) {
    API.getBulletins(currentproperty).then((response) => {
      dispatch({ type: SET_BULLETINS, bulletins: response.data });
    });
  }
  function getMyNotifications(currentUser) {
    API.getMyNotifications(currentUser.id)
      .then((response) => {
        dispatch({ type: SET_NOTIFICATIONS, notifications: response.data });
      })
      .catch((err) => console.log(err));
  }
  function getNotifications(message) {
    API.getNotifications(message).then((response) => {
      dispatch({ type: SET_NOTIFICATIONS, notifications: response.data });
    });
  }
  function getReceivedMessages(currentUser) {
    API.getReceivedMessages(currentUser.id)
      .then((response) => {
        dispatch({
          type: SET_RECEIVED_MESSAGES,
          receivedmessages: response.data,
        });
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
      {state.loggedIn === true ? (
        <Container className="homepage--container">
          <div>
            <div className="homepage--col">
              <h2 className="homepage--announcements-title">
                <i className="fas fa-building"></i> Building Announcements
                <small>
                  &nbsp;
                  <Link to="/announcements">
                    View All <i className="fas fa-angle-double-right"></i>
                  </Link>
                </small>
              </h2>
              <ListGroup>
                {state.announcements.length > 0
                  ? state.announcements.slice(0, 5).map((announcement) => {
                      return (
                        <ListGroup.Item key={announcement.id}>
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
            </div>
          </div>
          <div className="homepage--bulletinboard">
            <div>
              <div className="homepage--col">
                <h2 className="homepage--announcements-title">
                  <i className="fas fa-clipboard-list"></i> Bulletin Board
                  <small>
                    &nbsp;
                    <Link to="/bulletinboard">
                      View All <i className="fas fa-angle-double-right"></i>
                    </Link>
                  </small>
                </h2>
                <ListGroup>
                  {state.bulletins.length > 0
                    ? state.bulletins.slice(0, 5).map((bulletin) => {
                        return (
                          <ListGroup.Item key={bulletin.id}>
                            {bulletin.message}
                            <br />
                            <span className="view-bulletin--author-title">
                              <small>
                                Posted By: {bulletin.User.firstName}{" "}
                                {bulletin.User.lastName}
                              </small>
                            </span>
                            <br />
                            <span className="view-bulletin--date">
                              <small>
                                {dateFormat(
                                  `${bulletin.createdAt}`,
                                  "dddd, mmmm, dS, yyyy, h:MM TT"
                                )}{" "}
                                {"EST"}
                              </small>
                            </span>
                          </ListGroup.Item>
                        );
                      })
                    : "no bulletins"}
                </ListGroup>
              </div>
            </div>
          </div>
        </Container>
      ) : (
        <LoggedOut />
      )}
    </div>
  );
}
