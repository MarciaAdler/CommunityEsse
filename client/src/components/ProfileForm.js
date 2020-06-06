import React, { Fragment, useEffect, useRef, useState } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { Form, Col, Button, Row } from "react-bootstrap";
import API from "../utils/API";
import { SET_CURRENT_USER } from "../utils/actions";
import { Next } from "react-bootstrap/PageItem";
const fs = require("fs");
export default function ProfileForm() {
  const [state, dispatch] = useStoreContext();
  const [file, setFile] = useState("");
  const [filename, setFileName] = useState(state.currentUser.file);
  const [currentId, setCurrentId] = useState(state.currentUser.id);
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const roleRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const instructionsRef = useRef();
  let date = "";

  function updatePassword() {
    if (passwordRef.current.value !== "") {
      if (passwordRef.current.value === confirmPasswordRef.current.value) {
        API.resetPassword({
          id: state.currentUser.id,
          password: passwordRef.current.value,
        }).then((req) => {
          document.getElementById("formGridPassword").value = "";
          document.getElementById("formGridConfirmPassword").value = "";
        });
      } else {
        alert("passwords do not match");
      }
    }
  }

  function updateUser(profile) {
    API.updateProfile({
      id: state.currentUser.id,
      username: usernameRef.current.value,
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      role: roleRef.current.value,
      instructions: instructionsRef.current.value,
      file: filename,
    }).then((response) => {
      refreshUser();
      updatePassword();
    });
  }
  function refreshUser() {
    API.refreshCurrentUser(state.currentUser.id)
      .then((results) => {
        dispatch({
          type: SET_CURRENT_USER,
          currentUser: {
            id: results.data.id,
            username: results.data.username,
            role: results.data.role,
            firstName: results.data.firstName,
            lastName: results.data.lastName,
            aptNumber: results.data.aptNumber,
            email: results.data.email,
            instructions: results.data.instructions,
            file: results.data.file,
          },
        });
        let localStorageUser = {
          id: results.data.id,
          username: results.data.username,
          role: results.data.role,
          firstName: results.data.firstName,
          lastName: results.data.lastName,
          aptNumber: results.data.aptNumber,
          email: results.data.email,
          instructions: results.data.instructions,
          file: results.data.file,
        };
        window.localStorage.setItem(
          "currentUser",
          JSON.stringify(localStorageUser)
        );
      })
      .catch((err) => console.log(err));
  }
  function getFormattedDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    var hh = today.getUTCHours();
    var min = today.getUTCMinutes();
    date = mm + "-" + dd + "-" + yyyy;
  }
  const onChange = (e) => {
    getFormattedDate();

    setFile(e.target.files[0]);
    setFileName(state.currentUser.id + "-" + e.target.files[0].name);
  };

  //   const uploadImage = (event) => {
  //     event.preventDefault();
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     API.uploadFile(formData, {
  //       headers: {
  //         "Content Type": "multipart/form-data",
  //       },
  //     })
  //       .then((res) => {
  //         console.log(res.statusText);
  //       })
  //       .catch((err) => console.log(err));
  //   };

  // code to download image from database
  // function downloadImage(image) {
  //   API.getImage(image)
  //     .then((response) => {
  //       console.log(response);
  //       setImage(response.data[0].image.data);
  //     })
  //     .catch((err) => console.log(err));
  // }
  // function uploadImageFile(e) {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   formData.append("file", file);
  //   // formData.append("id", currentId);
  //   console.log(file);
  //   // to store image in database
  //   // API.uploadImage(formData)
  //   //   .then((res) => {
  //   //     console.log(res.data);
  //   //     downloadImage(res.data);
  //   //   })

  //   //   .catch((err) => console.log(err))
  //   API.uploadFile(formData, {
  //     headers: {
  //       "Content Type": "multipart/form-data",
  //     },
  //   })
  //     .then((res) => {
  //       console.log(res.statusText);
  //     })

  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
  function uploadImageFile(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("id", currentId);
    API.uploadFile(formData, {
      headers: {
        "Content Type": "multipart/form-data",
      },
    })
      .then((res) => {
        console.log(file);
        console.log(res.statusText);
      })

      .catch((err) => {
        console.log(err);
      });
  }
  // function to delete uploaded images
  // function deleteImage(e) {
  //   if (state.currentUser.file !== "no image") {
  //     API.deleteImage(state.currentUser.file)
  //       .then((response) => {
  //         console.log(response);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }
  return (
    <div className="profileform--container">
      <Form className="profile--form">
        <Form.Row>
          <Form.Group as={Col} controlId="formGridFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              ref={firstNameRef}
              defaultValue={`${state.currentUser.firstName}`}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              ref={lastNameRef}
              defaultValue={`${state.currentUser.lastName}`}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              ref={usernameRef}
              defaultValue={`${state.currentUser.username}`}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              ref={emailRef}
              defaultValue={state.currentUser.email}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} className="col-6" controlId="formGridAptNumber">
            <Form.Label>Apt Number</Form.Label>
            <Form.Control
              type="text"
              name="aptNum"
              disabled
              value={state.currentUser.aptNumber}
            />
          </Form.Group>

          <Form.Group as={Col} className="col-6" controlId="formGridRole">
            <Form.Label>Role</Form.Label>
            <Form.Control
              type="text"
              name="role"
              disabled
              ref={roleRef}
              defaultValue={state.currentUser.role}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} className="col-6" controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" ref={passwordRef} />
          </Form.Group>

          <Form.Group
            as={Col}
            className="col-6"
            controlId="formGridConfirmPassword"
          >
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirm password"
              ref={confirmPasswordRef}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group controlId="instructionsForm" className="col-12 pl-0">
            <Form.Label>Front Desk Instructions</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              ref={instructionsRef}
              defaultValue={state.currentUser.instructions}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Col className="col-md-10 col-sm-12">
            <label className="mt-2">Upload Image</label>
            <Fragment>
              <div className="custom-file mb-4">
                <input
                  type="file"
                  onChange={onChange}
                  className="custom-file-input"
                  id="customFile"
                />

                <label className="custom-file-label" htmlFor="customFile">
                  {filename}
                </label>
                <Button
                  type="button"
                  className="profileform--upload-button ml-3"
                  onClick={uploadImageFile}
                >
                  Upload
                </Button>
              </div>
            </Fragment>
          </Col>

          {state.currentUser.file !== "no image" ? (
            <Col className="col-12 col-md-2 col-sm-12 mt-2 d-flex justify-content-center ">
              <img
                className="profile-image"
                alt="profile image"
                src={
                  process.env.PUBLIC_URL + `/uploads/${state.currentUser.file}`
                }
              />

              {/* <button
                type="button"
                className="profileform--delete-img"
                onClick={() => {
                  deleteImage(state.currentUser.file);
                }}
              >
                X
              </button> */}
            </Col>
          ) : (
            ""
          )}
        </Form.Row>
        <Button
          className="button"
          onClick={() => {
            updateUser(state.currentUser.id);
          }}
        >
          Update
        </Button>
      </Form>
    </div>
  );
}
