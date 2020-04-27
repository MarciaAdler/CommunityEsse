import React, { useEffect } from "react";
import { Container, Card, Col, Row } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";
import { SET_NOTIFICATIONS, SET_USERS } from "../utils/actions";
import API from "../utils/API";

export default function ContactCard() {
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    getUsers(state.users);
  }, []);

  function getUsers() {
    API.getAll()
      .then((response) => {
        dispatch({ type: SET_USERS, users: response.data });
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <h2>Building Contacts</h2>
      <Row>
        {state.users.length
          ? state.users.map((user) => {
              return (
                <Col className="col-6 mb-3">
                  <Card>
                    <Card.Body>
                      <Card.Title>
                        {user.firstName} {user.lastName}
                      </Card.Title>
                      <Card.Subtitle className="mb-3 text-muted">
                        username: {user.username}
                      </Card.Subtitle>
                      {user.role === "Admin" || user.role === "Front Desk" ? (
                        <Card.Subtitle className="mb-3 text-muted">
                          Role: {user.role}
                        </Card.Subtitle>
                      ) : (
                        <Card.Subtitle className="mb-3 text-muted">
                          Apt: {user.aptNumber}
                        </Card.Subtitle>
                      )}

                      <Card.Link href="/message">Message</Card.Link>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          : "No Contacts"}
      </Row>
    </div>
  );
}
