import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import axios from "axios";

const calculatePercent = (loaded, total) => {
  return Math.round((loaded / total) * 100);
};

const FileUpload = ({ setFileId }) => {
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitUpload, setSubmitUpload] = useState(false);

  const handleOnChangeFile = (e) => {
    setSubmitUpload(false);
    setFile(e.target.files[0]);
  };

  const handleUploadFile = async () => {
    setLoading(true);
    setSubmitUpload(true);
    const data = new FormData();
    data.append("files", file);

    const upload_res = await axios({
      method: "POST",
      url: "http://localhost:1337/upload",
      data,
      onUploadProgress: (progress) =>
        setPercent(calculatePercent(progress.loaded, progress.total)),
    });

    setFileId(upload_res.data[0].id);
    setLoading(false);
  };

  return (
    <div className="uploadContainer">
      <div className="upload">
        <TextField
          required
          accept="image/png, image/jpeg"
          type="file"
          onChange={handleOnChangeFile}
        />
        <Button onClick={handleUploadFile} variant="contained">
          Upload Image
        </Button>
      </div>
      {submitUpload && (
        <div className="progress">
          <div className="progressSeek" style={{ width: `${percent}%` }}></div>
          {loading && <div>Uploading...</div>}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
