"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Search } from "@mui/icons-material";
import ChallengeCard from "./ChallengeCard";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  Box,
  Button,
  Typography,
  Divider,
  FormGroup,
  Popover,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ExploreChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [statusFilters, setStatusFilters] = useState([]);
  const [levelFilters, setLevelFilters] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  // Status options
  const statusOptions = ['All', 'Active', 'Upcoming', 'Past'];
  // Level options
  const levelOptions = ["Easy", "Medium", "Hard"];

  // Handle change for Status filters
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "filter-popover" : undefined;

  // Handle change for Status filters
  const handleStatusChange = (event) => {
    const value = event.target.name;
    setStatusFilters((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // Handle change for Level filters
  const handleLevelChange = (event) => {
    const value = event.target.name;
    setLevelFilters((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

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
          zIndex: 0,
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
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
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
            {/* Button to trigger the dropdown */}
            <Button sx={{ backgroundColor:"white", color:"black", mx:4, px:4  }}  onClick={handleClick}>
              Filter
            </Button>

            {/* Popover that acts like a dropdown modal */}
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <div style={{ padding: "20px", width: "250px" }}>
                <Typography>Status</Typography>
                <FormGroup>
                  {statusOptions.map((status) => (
                    <FormControlLabel
                      key={status}
                      control={
                        <Checkbox
                          checked={statusFilters.includes(status)}
                          onChange={handleStatusChange}
                          name={status}
                        />
                      }
                      label={status}
                    />
                  ))}
                </FormGroup>

                <Divider style={{ margin: "10px 0" }} />

                <Typography>Level</Typography>
                <FormGroup>
                  {levelOptions.map((level) => (
                    <FormControlLabel
                      key={level}
                      control={
                        <Checkbox
                          checked={levelFilters.includes(level)}
                          onChange={handleLevelChange}
                          name={level}
                        />
                      }
                      label={level}
                    />
                  ))}
                </FormGroup>
              </div>
            </Popover>
          </Box>
          </Box>

          <Box sx={{}} >
            {statusFilters?.map((filterItem)=>{
              {console.log(filterItem)}
              return(
              <Typography  sx={{borderRadius:1, backgroundColor:"rgba(248, 249, 253, 0.49)", color:"white", display:"inline", p:1, m:2, borderRadius:2 }} >
                {filterItem}
                <Image src={"/media/cross-icon.svg"} alt={"cross icon"} height={20} width={20} />
              </Typography>
              )
            })}
            {levelFilters?.map((filterItem)=>{
              {console.log(filterItem)}
              return(
                <Typography  sx={{borderRadius:1, backgroundColor:"rgba(248, 249, 253, 0.49)", color:"white", display:"inline", p:1, m:2, borderRadius:2 }} >
                {filterItem}
                <Image src={"/media/cross-icon.svg"} alt={"cross icon"} height={20} width={20} />
              </Typography>
              )
            })}
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
