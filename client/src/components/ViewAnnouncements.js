import React, { useEffect, useState } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import SideNav from "./SideNav";
import API from "../utils/API";
import dateFormat from "dateformat";
import { SET_ANNOUNCEMENTS } from "../utils/actions";
import { useStoreContext } from "../utils/GlobalState";

export default function ViewAnnouncements() {
  const [state, dispatch] = useStoreContext();
  const [propertyName, setPropertyName] = useState("");

  useEffect(() => {
    getAnnouncements(state.currentproperty);
    getPropertyName(state.currentproperty);
  }, []);
  function getAnnouncements(currentproperty) {
    API.getAnnouncements(currentproperty).then((response) => {
      dispatch({ type: SET_ANNOUNCEMENTS, announcements: response.data });
    });
  }
  function deleteAnnouncement(announcement) {
    API.deleteAnnouncement(announcement)
      .then((res) => {
        getAnnouncements(state.announcements);
      })
      .catch((err) => console.log(err));
  }
  function getPropertyName(currentproperty) {
    API.getPropertyName(currentproperty).then((response) => {
      console.log(response.data.name);
      setPropertyName(response.data.name);
    });
  }
  return (
    <div>
      <h2>
        <i className="fas fa-building"></i> {propertyName} Building
        Announcements
      </h2>
      <ListGroup>
        {state.announcements.length
          ? state.announcements.map((announcement, index) => {
              return (
                <ListGroup.Item key={announcement.id}>
                  {announcement.message}
                  {state.currentUser.role === "Admin" ? (
                    <button
                      className="view-bulletin--delete-btn"
                      onClick={() => {
                        deleteAnnouncement(announcement.id);
                      }}
                    >
                      X
                    </button>
                  ) : (
                    ""
                  )}{" "}
                  <br></br>
                  <span className="view-announcement--date">
                    <small>
                      {dateFormat(
                        `${announcement.createdAt}`,
                        "dddd, mmmm, dS, yyyy, h:MM TT"
                      )}{" "}
                      {"EST"}
                    </small>
                  </span>
                </ListGroup.Item>
              );
            })
          : ""}
      </ListGroup>
    </div>
  );
}
