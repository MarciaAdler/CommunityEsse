import React, { useEffect, useState } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import SideNav from "./SideNav";
import API from "../utils/API";
import dateFormat from "dateformat";
import { SET_ANNOUNCEMENTS } from "../utils/actions";
import { useStoreContext } from "../utils/GlobalState";

export default function ViewAnnouncements() {
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
      <h2>Announcements</h2>

      <ListGroup>
        {state.announcements.length
          ? state.announcements.map((announcement, index) => {
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
          : ""}
      </ListGroup>
    </div>
  );
}
