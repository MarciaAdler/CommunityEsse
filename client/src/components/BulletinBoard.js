import React from "react";
import { Row, ListGroup } from "react-bootstrap";

export default function BulletinBoard() {
  return (
    <div>
      <h2>Bulletin Board</h2>
      <ListGroup>
        <ListGroup.Item>
          This is where posts from tenants to the building will show
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
