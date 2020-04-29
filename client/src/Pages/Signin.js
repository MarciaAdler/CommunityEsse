import React from "react";
import LoginForm from "../components/LoginForm";
import { Container } from "react-bootstrap";

export default function Signin() {
  return (
    <Container className="signin--container">
      <img
        src={require("../components/images/communitylifeicon-white.png")}
        alt="Community Life"
        className="signin--icon"
      />
      <div className="loginform--div">
        <LoginForm />
      </div>
    </Container>
  );
}
