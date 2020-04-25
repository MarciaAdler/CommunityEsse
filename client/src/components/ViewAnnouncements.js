import React, { useEffect, useState } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import SideNav from "./SideNav";
import API from "../utils/API";
export default function ViewAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    getAnnouncements(announcements);
  }, []);
  function getAnnouncements(message) {
    API.getAnnouncements(message).then((response) => {
      console.log(response.data);
      setAnnouncements(response.data);
    });
  }
  return (
    <div>
      <h2>Announcements</h2>

      <ListGroup>
        {announcements.length
          ? announcements.map((announcement) => {
              return <ListGroup.Item>{announcement.message}</ListGroup.Item>;
            })
          : ""}
      </ListGroup>
    </div>
  );
}
