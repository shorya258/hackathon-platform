"use client";
import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { Search } from "@mui/icons-material";
import ChallengeCard from "./ChallengeCard";

const ExploreChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const challengeDetails = {
    challengeName: "Data Sprint 72 - Butterfly Identification",
    challengeImg: "/media/challenge-card.svg",
    challengeDescription:
      "Identify the class to which each butterfly belongs to",
    level: "easy",
    startDate: "2023-11-12",
    endDate: "2025-01-31",
  };
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
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
        {/* {
            challenges.length===0?
            <Box 
            sx={{
                color:"white",
                fontSize:"32px",
                fontWeight:"bold",
                textAlign:"center"
            }}
            >
                No challenges to display!
            </Box>:
            <Box>
               {challenges.map((singleChallengeDetails, key)=>{
                return (
                    <ChallengeCard key={key} challengeDetails={singleChallengeDetails} />
                )
               })}
            </Box>
        } */}
        <ChallengeCard challengeDetails={challengeDetails} />
        <ChallengeCard challengeDetails={challengeDetails} />
        <ChallengeCard challengeDetails={challengeDetails} />
        <ChallengeCard challengeDetails={challengeDetails} />
        <ChallengeCard challengeDetails={challengeDetails} />
      </Box>
    </Box>
  );
};

export default ExploreChallenges;
