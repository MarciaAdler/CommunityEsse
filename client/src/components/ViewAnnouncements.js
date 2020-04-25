import React, { useEffect, useState } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import SideNav from "./SideNav";
import API from "../utils/API";
import dateFormat from "dateformat";
export default function ViewAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    getAnnouncements(announcements);
  }, []);
  function getAnnouncements(message) {
    API.getAnnouncements(message).then((response) => {
      setAnnouncements(response.data);
    });
  }

  return (
    <div>
      <h2>Announcements</h2>

      <ListGroup>
        {announcements.length
          ? announcements.map((announcement, index) => {
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
