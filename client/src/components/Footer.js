import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
  return (
    <Container fluid className="footer--container py-2 text-center">
      <Row>
        <Col>Community Life</Col>
        <Col>About</Col>
      </Row>
    </Container>
  );
}
