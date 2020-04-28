import React, { useEffect } from "react";
import { Row, ListGroup } from "react-bootstrap";
import dateFormat from "dateformat";
import { SET_BULLETINS } from "../utils/actions";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";
export default function ViewBulletinBoard() {
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    getBulletins(state.bulletins);
  }, []);
  function getBulletins(message) {
    API.getBulletins(message).then((response) => {
      dispatch({ type: SET_BULLETINS, bulletins: response.data });
    });
  }
  function deleteBulletin(bulletin) {
    API.deleteBulletin(bulletin)
      .then((res) => {
        getBulletins(state.bulletins);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <h2>
        <i class="fas fa-clipboard-list"></i> Bulletin Board
      </h2>
      <ListGroup>
        {state.bulletins.length
          ? state.bulletins.map((bulletin, index) => {
              return (
                <ListGroup.Item key={bulletin.id}>
                  {bulletin.message}
                  <br />
                  <span className="view-bulletin--author-title">
                    <small>
                      Posted By: {bulletin.User.firstName}{" "}
                      {bulletin.User.lastName}
                    </small>
                  </span>
                  {bulletin.UserId === state.currentUser.id ? (
                    <button
                      className="view-bulletin--delete-btn"
                      onClick={() => deleteBulletin(bulletin.id)}
                    >
                      X
                    </button>
                  ) : (
                    ""
                  )}
                  <br></br>
                  <span className="view-bulletin--date">
                    <small>
                      {dateFormat(
                        `${bulletin.createdAt}`,
                        "dddd, mmmm, dS, yyyy, h:MM TT"
                      )}{" "}
                      {"EST"}
                    </small>
                  </span>
                </ListGroup.Item>
              );
            })
          : "No Bulletins"}
      </ListGroup>
    </div>
  );
}
