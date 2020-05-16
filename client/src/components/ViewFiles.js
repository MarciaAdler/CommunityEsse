import React, { useEffect, useState } from "react";
import API from "../utils/API";
import { SET_FILES } from "../utils/actions";
import { useStoreContext } from "../utils/GlobalState";
export default function ViewFiles() {
  const [state, dispatch] = useStoreContext();
  useEffect(() => {
    getFiles();
  }, []);
  function getFiles() {
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
  return (
    <div>
      <div className="view-files">
        {state.uploadedfiles.length > 0
          ? state.uploadedfiles.map((file, index) => {
              return (
                <h6 key={file.id}>
                  <a href={file.name} target="_blank" key={file.id}>
                    <i className="fas fa-file-pdf"></i>&nbsp;
                    {file.name}
                  </a>
                </h6>
              );
            })
          : ""}
      </div>
    </div>
  );
}
