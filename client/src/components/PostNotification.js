import React, { useRef, useEffect, useState } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { Form, Button } from "react-bootstrap";
import API from "../utils/API";
import { SET_USERS, SET_NOTIFICATIONS } from "../utils/actions";

export default function PostNotification() {
  const [state, dispatch] = useStoreContext();
  const postRef = useRef();
  const receiverRef = useRef();
  const [receiverId, setReceiverId] = useState({});
  const [formObject, setFormObject] = useState({});
  let receiveId = "";
  useEffect(() => {
    getAllUsers();
  }, []);
  // function findIdbyApt(receiverRef) {
  //   API.findIdByApt(receiverRef)
  //     .then((response) => {
  //       console.log(response.data.id);
  //       receiveId = response.data.id;
  //     })
  //     .catch((err) => console.log(err));
  // }
  function createPost() {
    API.findIdByApt(formObject.apt).then((response) => {
      console.log(response.data.id);
      receiveId = response.data.id;
      console.log(response);
      API.createNotification({
        message: postRef.current.value,
        SenderId: state.currentUser.id,
        ReceiverId: receiveId,
      })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    });
  }

  // async function createPost(event) {
  //   const { data } = await API.findIdByApt(receiverRef.current.value);
  // .then((response) => {
  // console.log(data.id);
  // receiveId = data.id;
  // console.log(receiveId);
  // const notification = await API.createNotification({
  //   message: postRef.current.value,
  //   SenderId: state.currentUser.id,
  //   ReceiverId: receiveId,
  // });
  // .then((results) => {
  // console.log(notification.data);
  // })
  // .catch((err) => console.log(err));
  // })
  // .catch((err) => console.log(err));
  // }

  function getAllUsers() {
    API.getAllUsers()
      .then((response) => {
        dispatch({ type: SET_USERS, users: response.data });
      })

      .catch((err) => console.log(err));
  }

  function getNotifications(message) {
    API.getNotifications(message).then((response) => {
      dispatch({ type: SET_NOTIFICATIONS, notifications: response.data });
    });
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ [name]: value });
  }
  function handleFormSubmit(event) {
    // event.preventDefault();
    // findIdbyApt(receiverRef.current.value);
    createPost();
    getNotifications(state.notifications);
  }
  return (
    <div className="post-bulletin--container">
      <h2>Post Notification Here</h2>
      <Form className="post-bulletin--form">
        <Form.Group controlId="notication-form">
          <Form.Label>To</Form.Label>
          {/* <Form.Control
            as="textarea"
            name="apt"
            rows="1"
            required
            ref={receiverRef}
            onChange={handleInputChange}
          /> */}
          <Form.Control
            as="select"
            defaultValue="Choose..."
            required
            ref={receiverRef}
            name="apt"
            onChange={handleInputChange}
          >
            <option>Choose Apt...</option>
            {state.users.length
              ? state.users.map((user) => (
                  <option key={user.id}>{user.aptNumber}</option>
                ))
              : ""}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="bulletin-form">
          <Form.Control as="textarea" rows="5" ref={postRef} />
        </Form.Group>
        <button className="btn" onClick={handleFormSubmit}>
          Submit
        </button>
      </Form>
    </div>
  );
}
