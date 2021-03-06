import React, { useEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import {
  SET_CURRENT_USER,
  LOGGEDIN,
  CLEAR_ALL,
  SET_PROPERTY,
} from "../utils/actions";
import { useStoreContext } from "../utils/GlobalState";
import { Link, Redirect } from "react-router-dom";

export default function Header() {
  const [state, dispatch] = useStoreContext();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (state.currentUser.id === 0 && localStorage.getItem("currentUser")) {
      const currentUserLs = JSON.parse(localStorage.getItem("currentUser"));

      dispatch({
        type: SET_CURRENT_USER,
        currentUser: currentUserLs,
      });
      if (
        state.currentproperty === 0 &&
        localStorage.getItem("currentProperty")
      ) {
        const currentPropertyLs = JSON.parse(
          localStorage.getItem("currentProperty")
        );
        dispatch({
          type: SET_PROPERTY,
          currentproperty: currentPropertyLs,
        });
      }

      dispatch({
        type: LOGGEDIN,
      });
    }
  });

  function logOut() {
    dispatch({
      type: CLEAR_ALL,
    });
    localStorage.clear();
    setRedirect(true);
    renderRedirect();
  }

  const renderRedirect = () => {
    if (redirect === true) {
      return <Redirect to="/" />;
    }
  };
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        className="fixed-top header--navbar"
      >
        {state.loggedIn === true ? (
          <Navbar.Brand href="/home">
            <img
              src={require("./images/communitylifeicon-2.png")}
              alt="community life"
              className="header--icon"
            />
            Community Esse
          </Navbar.Brand>
        ) : (
          <Navbar.Brand href="/">
            <img
              src={require("./images/communitylifeicon-2.png")}
              alt="community life"
              className="header--icon"
            />
            Community Esse
          </Navbar.Brand>
        )}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        {state.loggedIn ? (
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/home">Building Home</Nav.Link>
              <Nav.Link href="/contacts">Building Contacts</Nav.Link>
              <Nav.Link href="/files">Building Files</Nav.Link>
              {state.currentUser.role === "Admin" ? (
                <Nav.Link href="/signup">Register New User</Nav.Link>
              ) : (
                ""
              )}
            </Nav>
            <Nav>
              <Nav.Link href="/profile">Profile</Nav.Link>

              <Nav.Link eventKey={2} href="/" onClick={logOut}>
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        ) : (
          // <Navbar.Collapse id="responsive-navbar-nav">
          //   <Nav className="mr-auto">
          //     <Nav.Link href="/signup">Signup</Nav.Link>
          //   </Nav>
          // </Navbar.Collapse>
          ""
        )}
      </Navbar>
      {renderRedirect()}
    </div>
  );
}
