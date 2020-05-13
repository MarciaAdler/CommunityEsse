import React from "react";
import { Container } from "react-bootstrap";
import ProfileForm from "../components/ProfileForm";
import LoggedOut from "../components/LoggedOut";

import { useStoreContext } from "../utils/GlobalState";

export default function Profile() {
  const [state, dispatch] = useStoreContext();
  return (
    <div>
      {state.loggedIn === true ? (
        <Container className="profile--container">
          <h2>
            <i class="fas fa-id-badge"></i> Profile
          </h2>
          <ProfileForm />
        </Container>
      ) : (
        <Container>
          <LoggedOut />
        </Container>
      )}
    </div>
  );
}
