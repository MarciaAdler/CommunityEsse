import React from "react";
import { Nav, Container, Col } from "react-bootstrap";

export default function SideNav() {
  return (
    <Container className="side-nav--container">
      <Nav
        defaultActiveKey="/home"
        className="flex-column align-items-end mr-5 mt-5 side-nav--nav"
      >
        <Nav.Link href="/announcements">Announcements</Nav.Link>
        <Nav.Link href="/bulletinboard">Bulletin Board</Nav.Link>
        <Nav.Link eventKey="link-1">Messages</Nav.Link>
        <Nav.Link eventKey="link-2">Notifications</Nav.Link>
      </Nav>
    </Container>
  );
}
