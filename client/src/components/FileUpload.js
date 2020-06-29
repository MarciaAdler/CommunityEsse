import React, { useState, useRef, useEffect } from "react";
import { Container } from "react-bootstrap";
import API from "../utils/API";
import { SET_FILES } from "../utils/actions";
import { useStoreContext } from "../utils/GlobalState";

export default function FileUpload() {
  const [file, setFile] = useState(""); // storing the uploaded file    // storing the recived file from backend
  const [data, getFile] = useState({ name: "", property: "", path: "" });
  const [progress, setProgess] = useState(0); // progess bar
  const el = useRef(); // accesing input element
  const [state, dispatch] = useStoreContext();
  const [propertyName, setPropertyName] = useState(""); // storing the property name
  useEffect(() => {
    if (state.currentproperty !== 0) {
      findFiles(state.currentproperty);
      getPropertyName(state.currentproperty);
    } else {
      findFiles(JSON.parse(localStorage.getItem("currentProperty")));
      getPropertyName(JSON.parse(localStorage.getItem("currentProperty")));
    }
  }, []);

  // get property name
  function getPropertyName(currentproperty) {
    API.getPropertyName(currentproperty).then((response) => {
      setPropertyName(response.data.name);
    });
  }
  // get all files for specific property
  function findFiles(currentproperty) {
    API.getFiles(currentproperty)
      .then((res) => {
        dispatch({
          type: SET_FILES,
          uploadedfiles: res.data,
        });
      })
      .catch((err) => console.log(err));
  }
  const handleChange = (e) => {
    setProgess(0);
    const file = e.target.files[0]; // accesing file

    setFile(file); // storing file
  };

  const uploadFile = () => {
    const formData = new FormData();
    formData.append("file", file); // appending file
    formData.append("property", propertyName); // appending file name

    API.uploadPdfFile(formData, {
      onUploadProgress: (ProgressEvent) => {
        let progress =
          Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) + "%";
        setProgess(progress);
      },
    })
      .then((res) => {
        console.log(res);
        getFile({
          name: propertyName + "-" + res.data.name,
          property: state.currentproperty,
          path: process.env.PUBLIC_URL + "/files" + res.data.path,
        });
        API.fileUpload({
          name: propertyName + "-" + res.data.name,
          property: state.currentproperty,
        }).then((response) => {
          findFiles(state.currentproperty);
        });
      })
      .catch((err) => console.log(err));
  };

  // deleting files from database (not from server)
  function deletefile(file) {
    API.deleteFile(file)
      .then((res) => {
        findFiles(state.currentproperty);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
      {state.currentUser.role === "Admin" ? (
        <div>
          <div className="file-upload">
            <input type="file" ref={el} onChange={handleChange} />{" "}
            <button
              type="submit"
              onClick={uploadFile}
              className="upbutton mb-3 mt-3"
            >
              {" "}
              Upload
            </button>
            {/* displaying received image*/}
            {/* {data.path && <img src={data.path} alt={data.name} />} */}
            {data.name}
          </div>

          <hr />
        </div>
      ) : (
        ""
      )}
      <div className="view-files">
        {state.uploadedfiles.length > 0
          ? state.uploadedfiles.map((file, index) => {
              return (
                <h6 key={file.id}>
                  <a
                    href={process.env.PUBLIC_URL + `/files/${file.name}`}
                    target="_blank"
                    key={file.id}
                  >
                    <i className="fas fa-file-pdf"></i>&nbsp;
                    {file.name}
                  </a>
                  {state.currentUser.role === "Admin" ? (
                    <button
                      className="file--delete-btn"
                      onClick={() => {
                        deletefile(file.id);
                      }}
                    >
                      X
                    </button>
                  ) : (
                    ""
                  )}
                </h6>
              );
            })
          : ""}
      </div>
    </div>
  );
}
