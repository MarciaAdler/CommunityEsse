import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
  return (
    <Container fluid className="footer--container py-2 text-center">
      <Row>
        <Col>
          <img
            src={require("./images/communitylifeicon-2.png")}
            alt="community life"
            className="header--icon"
          />
          Community Life
        </Col>
        <Col>About</Col>
      </Row>
    </Container>
  );
}
