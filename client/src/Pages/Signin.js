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
        <Col className="col-12 col-sm-6 signin--login-form">
          <div className="loginform--div">
            <LoginForm />
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="col-12">
          <div className="test-accounts mt-5">
            <h5 className="mt-2 ml-2">
              <strong>
                If you are interested in testing out the app, please use the
                test accounts listed below
              </strong>
            </h5>
            <p className="ml-2">
              <strong>Usernames:</strong>
              <br />
              adminHenry
              <br />
              HenryUser
              <br />
              HenryFrontDesk
              <br />
              MaintenanceHenry
            </p>
            <p className="ml-2">
              <strong>Password for test accounts*:</strong> Test
              <br />
              <small>
                *Please note, the usernames are not case sensitive, but the
                password is
              </small>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
