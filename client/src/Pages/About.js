import React from "react";
import { Container, Col } from "react-bootstrap";

export default function Signup() {
  return (
    <div>
      <Container className="about--container">
        <h2 className="about--title">About</h2>
        <Col className="about--col">
          <p>
            If you are interested in learning more about the app or other
            inquiries, please email Marcia at&nbsp;
            <a href="mailto:marcia@appsbymarcia.com">marcia@appsbymarcia.com</a>
          </p>
        </Col>
      </Container>
    </div>
  );
}
