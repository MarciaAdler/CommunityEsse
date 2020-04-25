import React from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import SideNav from "./SideNav";
export default function ViewAnnouncements() {
  return (
    <div>
      <h2>Announcements</h2>
      <ListGroup>
        <ListGroup.Item>
          This is where building announcements will show
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
