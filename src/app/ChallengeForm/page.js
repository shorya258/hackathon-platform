"use client";
import React, { useState, useEffect } from "react";
import FormLabel from "@mui/material/FormLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Box, Button, TextField, Typography } from "@mui/material";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { storage, db } from "../../../firebaseConfig";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter,useSearchParams } from "next/navigation";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
const ChallengeForm = () => {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const searchParams = useSearchParams();
  const [challengeId, setChallengeId] = useState(searchParams.get("requestId"));
  const [challengeDetails, setChallengeDetails] = useState({
    challengeName: "",
    startDate: null,
    endDate: null,
    challengeDescription: "",
    level: "Easy",
    image: "",
    status: "",
  });
  useEffect(() => {
    getChallengeById();
  }, [])
  const getChallengeById = async () => {
    if(!challengeId) {
      return;
    }
    const response = await fetch(`/api/get-single-challenge`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },      
      body: JSON.stringify({
        challengeId
      }),
    });
    const responseJson = await response.json();
    const statusCode = response.status;

    //console.log(json.status);
    if (statusCode === 201) {
      console.log("success");
      console.log("SINGLE CHALLENGE" , responseJson);
      setChallengeDetails(responseJson.foundChallenge)
    } else if (statusCode === 400) {
      toast.error(json.error);
    } else {
      toast.error("Failed to add the item!");
    }
  };

  async function uploadFileToFirebaseStorage(file) {
    const storageRef = ref(storage, `images/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  }
  async function handleUpload(image) {
    if (!image) {
      alert("Please select an image to upload");
      return;
    }
    try {
      const downloadURL = await uploadFileToFirebaseStorage(image);
      console.log(downloadURL, "DOWNLOAD URL");
      let oldChallenge = challengeDetails;
      oldChallenge.image = downloadURL;
      setChallengeDetails(oldChallenge);
      setImage(null);
      console.log("File uploaded and URL saved successfully:", downloadURL);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file);
      let value = URL.createObjectURL(file);
      setImage(file);
      handleUpload(file)
    }
  };

  const createChallenge = async (challengeDetails) => {
    const oldChallengeDetails = challengeDetails;
    const start = new Date(challengeDetails.startDate);
    const end = new Date(challengeDetails.endDate);
    const now = new Date();
    if (now < start) {
      oldChallengeDetails.status = "upcoming";
    } else if (now >= start && now <= end) {
      oldChallengeDetails.status = "active";
    } else if (now > end) {
      oldChallengeDetails.status = "past";
    }
    setChallengeDetails(oldChallengeDetails);
    const response = await fetch(`/api/create-challenge`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        challengeDetails: challengeDetails,
      }),
    });
    const json = await response.json();
    console.log(json);
    const statusCode = response.status;

    //console.log(json.status);
    if (statusCode === 201) {
      toast.success("Challenge added!");
      router.push("/");
    } else if (statusCode === 400) {
      toast.error(json.error);
    } else {
      toast.error("Failed to add the item!");
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target; // Destructure the name and value for normal inputs
    setChallengeDetails({
      ...challengeDetails,
      [name]: value, // Dynamically update the value for the input
    });
  };

  // onChange handler for DatePicker
  const onDateChange = (name, newValue) => {
    const formattedDate = dayjs(newValue).format("YYYY-MM-DD");
    if (newValue) {
      setChallengeDetails({
        ...challengeDetails,
        [name]: formattedDate, // Update the specific date field
      });
    } else {
      console.log("Invalid date");
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    createChallenge(challengeDetails);
  };
  const handleEdit = (e) => {
    e.preventDefault();
    editChallenge(challengeDetails);
  };
  async function editChallenge() {
    const response = await fetch(`/api/create-challenge`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        challengeDetails: challengeDetails,
      }),
    });
    const json = await response.json();
    console.log(json);
    const statusCode = response.status;
    if (statusCode === 201) {
      toast.success("Challenge edited!");
      router.push("/");
    } else if (statusCode === 400) {
      toast.error(json.error);
    } else {
      toast.error("Failed to add the item!");
    }
  }
  return (
    <Box sx={{}}>
      <ToastContainer />
      <Typography
        sx={{
          backgroundColor: "rgba(248, 249, 253, 1)",
          fontSize: "24px",
          fontWeight: "bold",
          px: 10,
          py: 4,
          mb: 4,
        }}
      >
        Challenge Details
      </Typography>

      <Box
        sx={{
          px: 10,
          my: 4,
          display: "flex",
          flexDirection: "column",
          gap: { sm: 4, md: 4 },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <FormLabel htmlFor="challenge-name" required sx={{color : 'black'}}>
            Challenge name
          </FormLabel>
          <OutlinedInput
            id="challengename"
            name="challengeName"
            type="text"
            required
            size="small"
            value={challengeDetails.challengeName}
            onChange={onChange}
            sx={{ width: "300px" }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <FormLabel htmlFor="startDate" required sx={{color : 'black'}}>
              Start Date
            </FormLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  label="Add start date"
                  name="startDate"
                  value={
                    challengeDetails.startDate
                      ? dayjs(challengeDetails.startDate)
                      : null
                  }
                  onChange={(newValue) => onDateChange("startDate", newValue)}
                  sx={{ width: "300px" }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <FormLabel htmlFor="endDate" required sx={{color : 'black'}}>
              End Date
            </FormLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  label="Add end date"
                  name="endDate"
                  value={
                    challengeDetails.endDate
                      ? dayjs(challengeDetails.endDate)
                      : null
                  }
                  onChange={(newValue) => onDateChange("endDate", newValue)}
                  sx={{ width: "300px" }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <FormLabel htmlFor="challenge-description" required sx={{color : 'black'}}>
            Description
          </FormLabel>
          <TextField
            multiline
            rows={6}
            variant="outlined"
            sx={{ display: "block" }}
            InputProps={{
              sx: { width: "800px" }, // Set your desired width for the input element
            }}
            name="challengeDescription"
            value={challengeDetails.challengeDescription}
            onChange={onChange}
            required
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <FormLabel htmlFor="challenge-description" required sx={{color : 'black'}}>
            Image
          </FormLabel>
          <Button
            variant="contained"
            component="label"
            sx={{
              color: "white",
              backgroundColor: "grey",
              "&:hover": {
                backgroundColor: "cyan",
              },
              width : '200px'
            }}
          >
            Upload
            <input
              type="file"
              hidden // Hides the actual file input
              onChange={handleFileChange} // Handles file selection
            />
                      <CloudUploadIcon sx={{marginLeft : 1 , fontSize : "1rem"}}/>
          </Button>

        </Box>

        {/* level */}
        <Box
          sx={{
            minWidth: { sm: 50, md: "180px" },
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <FormLabel htmlFor="challenge-description" required sx={{color : 'black'}}>
            Level Type
          </FormLabel>
          <FormControl sx={{ display: "block" }}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="level"
              value={challengeDetails.level}
              label="level"
              required
              onChange={onChange}
              sx={{ width: "200px" }}
            >
              <MenuItem value={"Easy"}>Easy</MenuItem>
              <MenuItem value={"Medium"}>Medium</MenuItem>
              <MenuItem value={"Hard"}>Hard</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button
          onClick={challengeId ? handleEdit : handleCreate}
          sx={{
            color: "white",
            backgroundColor: " rgba(68, 146, 76, 1)",
            display: "inline",
            width: "200px",
            px: 2,
            py: 1,
            fontSize: "14px",
            mt: 4,
            borderRadius: 3,
          }}
        >
          {challengeId ? "Edit Challenge" : "Create Challenge"}
        </Button>
      </Box>
    </Box>
  );
};

export default ChallengeForm;
