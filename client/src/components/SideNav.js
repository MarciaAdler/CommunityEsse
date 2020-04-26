import React from "react";
import { Nav, Container, Col } from "react-bootstrap";

export default function SideNav() {
  return (
    <Container className="side-nav--container">
      <Nav defaultActiveKey="/home" className="align-items-start side-nav--nav">
        <Nav.Link className="side-nav--link" href="/announcements">
          Announcements
        </Nav.Link>
        <Nav.Link className="side-nav--link" href="/bulletinboard">
          Bulletin Board
        </Nav.Link>
        <Nav.Link className="side-nav--link" eventKey="link-1">
          Messages
        </Nav.Link>
        <Nav.Link className="side-nav--link" eventKey="link-2">
          Notifications
        </Nav.Link>
      </Nav>
    </Container>
  );
}
