import React from "react";
import Header from "../components/Header";
import SideNav from "../components/SideNav";
import ViewAnnouncements from "../components/ViewAnnouncements";
import BulletinBoard from "../components/BulletinBoard";
import { Row, Col, Container } from "react-bootstrap";
export default function Home() {
  return (
    <div>
      <Container className="homepage--container">
        <Row>
          <Col className="homepage--col col-md-8 col-sm-6">
            <ViewAnnouncements />
          </Col>
          <Col className="col-sm-6 col-md-4">
            <SideNav />
          </Col>
        </Row>
        <div className="homepage--bulletinboard">
          <Row>
            <Col className="col-md-6">
              <BulletinBoard />
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}
