import React from "react";
import { Nav, Container } from "react-bootstrap";

export default function SideNav() {
  return (
    <Container fluid className="side-nav--container">
      <Nav
        defaultActiveKey="/home"
        className="flex-column align-items-end mr-5 mt-5 side-nav--nav"
      >
        <Nav.Link href="/home">Announcements</Nav.Link>
        <Nav.Link eventKey="link-1">Messages</Nav.Link>
        <Nav.Link eventKey="link-2">Notifications</Nav.Link>
      </Nav>
    </Container>
  );
}
