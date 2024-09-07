"use client";
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Search } from "@mui/icons-material";
import ChallengeCard from "./ChallengeCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ExploreChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const challengeDetails = {
    challengeName: "Data Sprint 72 - Butterfly Identification",
    challengeImg: "/media/challenge-card.svg",
    challengeDescription:
      "Identify the class to which each butterfly belongs to",
    level: "easy",
    startDate: "2024-09-09",
    endDate: "2025-04-04",
  };
  const getChallenges = async (status, level) => {
    const response = await fetch(`/api/get-challenges`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: status,
        level: level,
      }),
    });
    const json = await response.json();
    console.log(json.challenges);
    const statusCode = response.status;

    //console.log(json.status);
    if (statusCode === 201) {
      console.log("success");
      setChallenges(json.challenges);
    } else if (statusCode === 400) {
      toast.error(json.error);
    } else {
      toast.error("Failed to add the item!");
    }
  };

  useEffect(() => {
    getChallenges("All", null);
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <ToastContainer />
      {/* explore challenges box */}

      <Box
        sx={{
          backgroundColor: "rgba(0, 42, 59, 1)",
          color: "white",
          width: "100%",
          p: 4,
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "32px",
            fontWeight: "bold",
          }}
        >
          Explore Challenges
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "12px",
              width: "30%",
              height: "30px",
            }}
          >
            {/* <SearchIcon */}
            <Search
              sx={{
                color: "black",
              }}
            />
            <Typography
              sx={{
                color: "black",
              }}
            >
              Search
            </Typography>
          </Box>

          <Box>
            <Button sx={{ backgroundColor: "white", color: "black" }}>
              Filter
            </Button>
          </Box>
        </Box>
      </Box>

      {/* challenges cards */}
      <Box
        sx={{
          backgroundColor: "rgba(0, 49, 69, 1)",
          p: 4,
          display: "flex",
          flexDirection: {
            sm: "column",
            md: "row",
          },
          flexWrap: "wrap",
          alignItems: "flex-start",
          // justifyContent: "center",
          gap: 2,
          margin: "auto auto",
        }}
      >
        {challenges.length === 0 ? (
          <Box
            sx={{
              color: "white",
              fontSize: "32px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            No challenges to display yet!
          </Box>
        ) : (
        <>
            {challenges?.map((singleChallengeDetails, key) => {
              // console.log(first)
              return (
                <ChallengeCard
                  key={key}
                  challengeDetails={singleChallengeDetails}
                />
              );
            })}
        
        </>
        )}
      </Box>
    </Box>
  );
};

export default ExploreChallenges;
