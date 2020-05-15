import React, { useState, useRef } from "react";
import { Container } from "react-bootstrap";
import API from "../utils/API";
export default function FileUpload() {
  const [file, setFile] = useState(""); // storing the uploaded file    // storing the recived file from backend
  const [data, getFile] = useState({ name: "", path: "" });
  const [progress, setProgess] = useState(0); // progess bar
  const el = useRef(); // accesing input element
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
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h2>
        <i className="fas fa-folder-open"></i> Building Files
      </h2>
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
