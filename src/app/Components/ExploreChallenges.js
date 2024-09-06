"use client"
import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { Search } from "@mui/icons-material";
import ChallengeCard from "./ChallengeCard";

const ExploreChallenges = () => {
    const [challenges, setChallenges] =useState([]);
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
            display:"flex",
            flexDirection:"row",
            justifyContent:"center"
        }}
        >
        <Box
        sx={{
            backgroundColor:"white",
            borderRadius:"12px",
            width:"30%",
            height:"30px"
        }}
        > 
            {/* <SearchIcon */}
            <Search
            sx={{
                color:"black"
            }}
            />
            <Typography
             sx={{
                color:"black"
            }}
            >
                Search
            </Typography>
        </Box>

        <Box>
            <Button sx={{backgroundColor:"white", color:"black"}} >Filter</Button>
        </Box>
        </Box>
      </Box>

      {/* challenges cards */}
      <Box
      sx={{
        backgroundColor:"rgba(0, 49, 69, 1)",
        p:4
      }}
      >
        {
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
        }
      </Box>
    </Box>
  );
};

export default ExploreChallenges;
