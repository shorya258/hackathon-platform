"use client"
import React, { useState } from "react";
import { Button, TextField } from '@mui/material';
import { storage, db } from "../../../firebaseConfig";
import {
  ref,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";

const ChallengeForm = () => {
  const [image, setImage] = useState(null);

  async function uploadFileToFirebaseStorage(file) {
    const storageRef = ref(storage, `images/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  }
  async function handleUpload() {
    if (!image) {
      alert("Please select an image to upload");
      return;
    }
    try {
      const downloadURL = await uploadFileToFirebaseStorage(image);
      console.log(downloadURL , "DOWNLOAD URL")
      // console.log("File uploaded and URL saved successfully:", downloadURL);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected file:', file);
      let value = URL.createObjectURL(file);
      setImage(file);
    }
  };
  return (
    <div>
    {/* File Input using TextField */}
    <TextField
      type="file"
      variant="outlined"
      onChange={handleFileChange}
      InputLabelProps={{
        shrink: true,
      }}
    />
    <label htmlFor="contained-button-file">
      <Button variant="contained" component="span" onClick={handleUpload}>
        Upload
      </Button>
    </label>
  </div>
  )
}

export default ChallengeForm;