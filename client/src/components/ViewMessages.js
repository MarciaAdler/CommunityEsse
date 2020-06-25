import React, { useEffect } from "react";
import { Row, Tabs, Tab } from "react-bootstrap";
import dateFormat from "dateformat";
import { SET_NOTIFICATIONS, SET_SENT_MESSAGES } from "../utils/actions";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";
import Sent from "../components/Sent";
import Inbox from "../components/Inbox";
import PostMessages from "../components/PostMessages";
export default function ViewNotification() {
  const [state, dispatch] = useStoreContext();

  return (
    <div>
      <h2>
        <i className="fas fa-envelope-square"></i> Messages
      </h2>
      <Tabs defaultActiveKey="Inbox" id="uncontrolled-tab-example">
        <Tab eventKey="Inbox" title="Inbox">
          <Inbox />
        </Tab>
        <Tab eventKey="Sent" title="Sent Messages">
          <Sent />
        </Tab>
        <Tab eventKey="Write" title="Write Message">
          <PostMessages />
        </Tab>
      </Tabs>
    </div>
  );
}
