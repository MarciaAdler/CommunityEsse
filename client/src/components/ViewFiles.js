import React, { useEffect, useState } from "react";
import API from "../utils/API";

export default function ViewFiles() {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    getFiles();
  }, []);
  function getFiles() {
    API.getFiles()
      .then((res) => {
        console.log(res);

        setFiles(res.data);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
      {files.length > 0
        ? files.map((file, index) => {
            return (
              <a href={file.name} target="_blank" key={file.id}>
                <i class="fas fa-file-pdf"></i>&nbsp;
                {file.name}
              </a>
            );
          })
        : ""}
    </div>
  );
}
