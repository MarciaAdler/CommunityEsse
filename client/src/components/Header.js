import React from "react";
import { Navbar, Nav } from "react-bootstrap";
export default function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">Community Life</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#features">Building Home</Nav.Link>
          <Nav.Link href="#pricing">Building Contacts</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="#deets">Profile</Nav.Link>

          <Nav.Link eventKey={2} href="/Signin">
            Logout
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
