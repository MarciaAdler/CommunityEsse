import React, { useEffect } from "react";
import { Container, Card, Col, Row } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";
import ContactCard from "../components/ContactCard";
import LoggedOut from "../components/LoggedOut";
import { SET_NOTIFICATIONS, SET_USERS } from "../utils/actions";
import API from "../utils/API";

export default function Contacts() {
  const [state, dispatch] = useStoreContext();

  return (
    <Container className="contacts--container">
      {state.loggedIn === true ? <ContactCard /> : <LoggedOut />}
    </Container>
  );
}
