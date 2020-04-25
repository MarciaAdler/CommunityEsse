import React from "react";
import LoginForm from "../components/LoginForm";
import { Container } from "react-bootstrap";

export default function Signin() {
  return (
    <Container className="signin--container">
      <LoginForm />
    </Container>
  );
}
