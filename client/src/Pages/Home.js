import React from "react";
import Header from "../components/Header";
import SideNav from "../components/SideNav";
import Announcements from "../components/Announcements";
import BulletinBoard from "../components/BulletinBoard";
import { Row, Col, Container } from "react-bootstrap";
export default function Home() {
  return (
    <div>
      <Container className="homepage--container">
        <Row>
          <Col className="homepage--col col-md-6">
            <Announcements />
          </Col>
          <Col>
            <SideNav />
          </Col>
        </Row>
        <Row>
          <Col className="col-md-6">
            <BulletinBoard />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
