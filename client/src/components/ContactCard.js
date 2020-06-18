import React, { useEffect } from "react";
import { Container, Card, Col, Row, Button } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";
import { SET_NOTIFICATIONS, SET_USERS } from "../utils/actions";
import API from "../utils/API";

export default function ContactCard() {
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    getUsers(state.currentproperty);
  }, []);

  function getUsers(currentproperty) {
    API.getAll(currentproperty)
      .then((response) => {
        dispatch({ type: SET_USERS, users: response.data });
      })
      .catch((err) => console.log(err));
  }
  function inactiveUser(user) {
    console.log(user);
    API.inactiveUser(user)
      .then((res) => {
        getUsers(state.users);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <h2>
        <i className="fas fa-id-card"></i> Building Contacts
      </h2>

      <Row>
        {state.users.length
          ? state.users.map((user) => {
              return (
                <Col className="col-12 col-md-6 mb-3" key={user.id}>
                  <Card className="contactcard--card">
                    <Card.Body>
                      <Card.Title>
                        {user.firstName} {user.lastName}
                      </Card.Title>

                      {user.role === "Admin" ||
                      user.role === "Front Desk" ||
                      user.role === "Maintenance" ? (
                        <Card.Subtitle className="mb-3 text-muted">
                          Role: {user.role}
                        </Card.Subtitle>
                      ) : (
                        <Card.Subtitle className="mb-3 text-muted">
                          Apt: {user.aptNumber}
                        </Card.Subtitle>
                      )}
                      {user.phoneNumber !== null ? (
                        <Card.Subtitle className="mb-3 text-muted">
                          Phone Number: {user.phoneNumber}
                        </Card.Subtitle>
                      ) : (
                        ""
                      )}
                      {state.currentUser.role !== "User" &&
                      user.instructions !== "" ? (
                        <Card.Subtitle className="mb-3 text-muted">
                          <strong>Front Desk Instructions:</strong>{" "}
                          {user.instructions}
                        </Card.Subtitle>
                      ) : (
                        ""
                      )}
                      {user.file !== "no image" ? (
                        <img
                          className="contactcard--profile-image"
                          alt="profile image"
                          src={process.env.PUBLIC_URL + `/uploads/${user.file}`}
                        />
                      ) : (
                        ""
                      )}
                      <br />
                      {state.currentUser.role === "Admin" ? (
                        <button
                          className="contactcard--delete-btn"
                          onClick={() => {
                            inactiveUser(user.id);
                          }}
                        >
                          X
                        </button>
                      ) : (
                        ""
                      )}
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
