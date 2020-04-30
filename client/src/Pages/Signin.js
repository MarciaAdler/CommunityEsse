import React from "react";
import LoginForm from "../components/LoginForm";
import { Container, Row, Col } from "react-bootstrap";

export default function Signin() {
  return (
    <Container className="signin--wrapper">
      <h1 className="signin--title">Community Esse</h1>
      <Row className="signin--container">
        <Col className="col-12 col-sm-6 d-flex justify-content-center">
          <img
            src={require("../components/images/communitylifeicon-white.png")}
            alt="Community Life"
            className="signin--icon"
          />
        </Col>
        <Col className="col-12 col-sm-6" className="signin--login-form">
          <div className="loginform--div">
            <LoginForm />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
