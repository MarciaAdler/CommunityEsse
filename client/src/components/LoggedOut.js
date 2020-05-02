import React from "react";
import { Container } from "react-bootstrap";

import { useStoreContext } from "../utils/GlobalState";

export default function Profile() {
  const [state, dispatch] = useStoreContext();
  return (
    <div>
      <div className="loggedout--container">
        <h2 className="loggedout--title">
          <a href="/">Click here</a> to login
        </h2>
      </div>
    </div>
  );
}
