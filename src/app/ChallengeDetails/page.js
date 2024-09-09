"use client";
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { shadows } from "@mui/system";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import dayjs from "dayjs";
const ChallengeDetails = () => {
  const router = useRouter();
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
  const handleDateFormat = (date) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    console.log("handle date format called", formattedDate)
    const [year, month, day] = formattedDate.split("-");

    // Create an array of month names to map the month number
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Convert the month to the full name and format the result array
    const dateArr = [
      parseInt(year.slice(2)),
      monthNames[parseInt(month) - 1],
      parseInt(day),
    ];
    const result =
    dateArr[2].toString() + " " + dateArr[1].toString() + " '" + dateArr[0].toString();
    return result;
  };
  const getChallengeById = async () => {
    if (!challengeId) {
      return;
    }
    const response = await fetch(`/api/get-single-challenge`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        challengeId,
      }),
    });
    const responseJson = await response.json();
    const statusCode = response.status;

    //console.log(json.status);
    if (statusCode === 201) {
      console.log("success");
      console.log("SINGLE CHALLENGE", responseJson);
      setChallengeDetails(responseJson.foundChallenge);
    } else if (statusCode === 400) {
      toast.error(json.error);
    } else {
      toast.error("Failed to add the item!");
    }
  };
  const handleDeleteChallenge=async()=>{
    console.log("delete challenge called")
    if (!challengeId) {
      console.log("challenge id not found")
      return;
    }
    const response = await fetch(`/api/delete-single-challenge`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        challengeId
      }),
    });
    const responseJson = await response.json();
    console.log(responseJson)
    const statusCode = response.status;

    //console.log(json.status);
    if (statusCode === 201) {
      console.log("success");
      toast.success("Deleted the challenge successfully!")
      router.push("/")
      setChallengeDetails(responseJson.foundChallenge);
    } else if (statusCode === 400) {
      toast.error(json.error);
    } else {
      toast.error("Failed to add the item!");
    }
  }
  useEffect(() => {
    getChallengeById();
  }, []);
  return (
    <Box sx={{ height: "100vh" }}>
      <ToastContainer />

      <Box
        sx={{
          backgroundColor: "rgba(0, 49, 69, 1)",
          display:"flex",
          flexDirection:"column",
          justifyContent:"space-evenly" ,
          color: "white",
          height: "50%",
          px: 15,
          py: 4,
        }}
      >
        <Box
          sx={{ backgroundColor: "rgba(255, 206, 92, 1) ", display: "inline-flex ", justifyContent:"flex-start", alignItems:"center" , color:"black", p:1, borderRadius:"12px",  width: "fit-content", }}
        >
          <Image src={"/media/clock.svg"} alt="clock" height={15} width={15} />
          {challengeDetails?.status.toLowerCase() === "upcoming" && (
            <Typography sx={{display: "inline"}} >
              &nbsp; Starts at &nbsp;
              {handleDateFormat(challengeDetails?.startDate)} 9:00 PM IST Indian Standard Time
            </Typography>
          )}
          {challengeDetails?.status.toLowerCase() === "active" && (
            <Typography sx={{display: "inline"}}>
              &nbsp; Ends on &nbsp;
              {handleDateFormat(challengeDetails?.endDate)} &nbsp;9:00 PM
            </Typography>
          )}
          {challengeDetails?.status.toLowerCase() === "past" && (
            <Typography sx={{display: "inline"}}>
              &nbsp; Ended on &nbsp;
              {handleDateFormat(challengeDetails?.endDate)} 9:00 PM IST Indian Standard Time
            </Typography>
          )}
        </Box>

        <Typography sx={{ fontSize: "32px", fontWeight: "bold",  width: "fit-content" }}>
          {challengeDetails?.challengeName}
        </Typography>

        <Typography sx={{ width: "fit-content",}} >{challengeDetails?.challengeDescription}</Typography>
        <Typography
          sx={{
            fontSize: "18px",
            backgroundColor: "white",
            color: "black",
            display: "inline",
            p: 1,
            width: "fit-content",
            borderRadius: 2,
          }}
        >
          {challengeDetails?.level.toLowerCase()  === "easy" && (
            <Image
              src={"/media/easy-level.svg"}
              alt={"easy-lvl"}
              height={15}
              width={15}
            />
          )}
          {challengeDetails?.level.toLowerCase()  === "medium" && (
            <Image
              src={"/media/medium-level.svg"}
              alt={"medium-lvl"}
              height={15}
              width={15}
            />
          )}
          {challengeDetails?.level.toLowerCase() === "hard" && (
            <Image
              src={"/media/hard-level.svg"}
              alt={"hard-lvl"}
              height={15}
              width={15}
            />
          )}
          &nbsp; {challengeDetails?.level}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between ",
          pt: 2,
          px: 15,
          mb: 2,
          boxShadow: 2,
        }}
      >
        <Typography
          sx={{
            borderBottom: 4,
            borderColor: "green",
            pb: 1,
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          Overview
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            pb: 1,
          }}
        >
          <Button
            onClick={() =>
              router.push(`/ChallengeForm?requestId=${challengeId}`)
            }
            variant="outlined"
            sx={{ bgcolor: "green", color: "white", mx: 1 }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            sx={{ borderColor: "red", color: "red", mx: 1 }}
            onClick={handleDeleteChallenge}
          >
            Delete
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          px: 15,
          color: "rgba(100, 96, 125, 1)",
          fontWeight: 500,
          width: "90%",
          textAlign: "left",
        }}
      >
        <Typography>
          Butterflies are the adult flying stage of certain insects belonging to
          an order or group called Lepidoptera. The word "Lepidoptera" means
          "scaly wings" in Greek. This name perfectly suits the insects in this
          group because their wings are covered with thousands of tiny scales
          overlapping in rows.
        </Typography>
        <br />
        <Typography>
          An agency of the Governmental Wildlife Conservation is planning to
          implement an automated system based on computer vision so that it can
          identify butterflies based on captured images. As a consultant for
          this project, you are responsible for developing an efficient model.
        </Typography>
        <br />
        <Typography>
          Your Task is to build an Image Classification Model using CNN that
          classifies to which class of weather each image belongs to.
        </Typography>
      </Box>
    </Box>
  );
};

export default ChallengeDetails;
