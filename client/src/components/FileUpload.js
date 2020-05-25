import React, { useState, useRef, useEffect } from "react";
import { Container } from "react-bootstrap";
import API from "../utils/API";
import { SET_FILES } from "../utils/actions";
import { useStoreContext } from "../utils/GlobalState";

export default function FileUpload() {
  const [file, setFile] = useState(""); // storing the uploaded file    // storing the recived file from backend
  const [data, getFile] = useState({ name: "", path: "" });
  const [progress, setProgess] = useState(0); // progess bar
  const el = useRef(); // accesing input element
  const [state, dispatch] = useStoreContext();

  function findFiles() {
    API.getFiles()
      .then((res) => {
        console.log(res);
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
    console.log(file);
    setFile(file); // storing file
  };

  const uploadFile = () => {
    const formData = new FormData();
    formData.append("file", file); // appending file
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
          name: res.data.name,
          path: process.env.PUBLIC_URL + "/files" + res.data.path,
        });
        API.fileUpload({
          name: res.data.name,
        });
        findFiles();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div>
        <div className="file-upload">
          <input type="file" ref={el} onChange={handleChange} />{" "}
          <div className="progessBar" style={{ width: progress }}>
            {progress}
          </div>
          <button onClick={uploadFile} className="upbutton">
            {" "}
            Upload
          </button>
          {/* displaying received image*/}
          {data.path && <img src={data.path} alt={data.name} />}
        </div>
      </div>
    </div>
  );
}