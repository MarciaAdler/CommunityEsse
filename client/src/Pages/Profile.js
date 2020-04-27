import React from "react";
import { Container } from "react-bootstrap";
import ProfileForm from "../components/ProfileForm";
export default function Profile() {
  return (
    <div>
      <Container className="profile--container">
        <h2>Profile</h2>
        <ProfileForm />
      </Container>
    </div>
  );
}
