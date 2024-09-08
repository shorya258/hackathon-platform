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
  PopoverPaper,
  OutlinedInput,
  Input,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ExploreChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [statusFilters, setStatusFilters] = useState([]);
  const [levelFilters, setLevelFilters] = useState([]);
  const statusOptions = ["All", "active", "upcoming", "past"];
  const levelOptions = ["Easy", "Medium", "Hard"];
  const [anchorEl, setAnchorEl] = useState(null);
  const [showExpandIcon, toggleShowExpandIcon] = useState(true);
  const [searchedTerm, setSearchedTerm] = useState("");
  const [filteredChallenges, setFilteredChallenges] = useState([]);
  // Handle opening and closing of popover
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    toggleShowExpandIcon(false);
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "0px";
  };

  const handleClose = () => {
    setAnchorEl(null);
    toggleShowExpandIcon(true);
    document.body.style.overflow = "auto";
    document.body.style.paddingRight = "";
  };

  // Determine if the popover is open
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
  const getChallenges = async (statusOptions, levelOptions) => {
    const response = await fetch(`/api/get-challenges`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        statusOptions: statusOptions,
        levelOptions: levelOptions,
      }),
    });
    const json = await response.json();
    console.log(json.challenges);
    const statusCode = response.status;

    //console.log(json.status);
    if (statusCode === 201) {
      console.log("success");
      setChallenges(json.challenges);
      setFilteredChallenges(json.challenges);
    } else if (statusCode === 400) {
      toast.error(json.error);
    } else {
      toast.error("Failed to add the item!");
    }
  };
  const handleSearchBar = (searchedValue) => {
    console.log("searched val", searchedValue);
    setSearchedTerm(searchedValue);
    titleGotSearched(searchedValue);
  };
  const titleGotSearched = (searchedTerm) => {
    console.log(searchedTerm);
    if (searchedTerm !== "") {
      const searchedChallenges = challenges.filter((singleChallenge) => {
        return singleChallenge.challengeName
          .toLowerCase()
          .includes(searchedTerm.toLowerCase());
      });
      setFilteredChallenges(searchedChallenges);
    } else {
      setFilteredChallenges(challenges);
    }
  };

  const handleRemoveItem = (item, arrayName) => {
    console.log("handle remove item called");
    if (arrayName === "status") {
      setStatusFilters((statusFilters) =>
        statusFilters.filter((i) => i !== item)
      );
    } else {
      setLevelFilters((statusFilters) =>
        statusFilters.filter((i) => i !== item)
      );
    }
  };

  useEffect(() => {
    if (statusFilters.length === 0 || statusFilters.includes("All")) {
      if (levelFilters.length === 0) {
        getChallenges("All", null);
      } else {
        console.log(levelFilters);
        getChallenges("All", levelFilters);
      }
    } else {
      if (levelFilters.length === 0) {
        console.log(statusFilters);
        getChallenges(statusFilters, null);
      } else {
        console.log(statusFilters, levelFilters);

        getChallenges(statusFilters, levelFilters);
      }
    }
  }, [statusFilters, levelFilters]);

  return (
    <Box
      sx={{
        width: "100%",
        p: 0,
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
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              P: 2,
              m: 3,
            }}
          >
            <Box
              sx={{
                backgroundColor: "white",
                display: "flex",
                flexDirection: "row",
                borderRadius: "12px",
                width: "30%",
                height: "40px",
                alignItems: "center",
              }}
            >
              <Search
                sx={{
                  color: "black",
                }}
              />
              <Input
                type="text"
                value={searchedTerm}
                placeholder="Search"
                onChange={(e) => {
                  handleSearchBar(e.target.value);
                }}
              />
            </Box>

            <div>
              {open && (
                <div
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    zIndex: 1,
                  }}
                  onClick={handleClose}
                ></div>
              )}
              <Button
                sx={{ backgroundColor: "white", color: "black" }}
                onClick={handleClick}
              >
                Filter
                {showExpandIcon && <ExpandMoreIcon />}
                {!showExpandIcon && <ExpandLessIcon />}
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
                <div style={{ padding: "20px", width: "300px" }}>
                  {/* Status Section */}
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

                  {/* Level Section */}
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
            </div>
          </Box>

          <Box sx={{}}>
            {statusFilters?.map((filterItem) => {
              {
                console.log(filterItem);
              }
              return (
                <Typography
                  sx={{
                    borderRadius: 1,
                    backgroundColor: "rgba(248, 249, 253, 0.49)",
                    color: "white",
                    display: "inline",
                    p: 1,
                    m: 2,
                    borderRadius: 2,
                  }}
                >
                  {filterItem}
                  <Image
                    src={"/media/cross-icon.svg"}
                    alt={"cross icon"}
                    height={20}
                    width={20}
                    onClick={() => handleRemoveItem(filterItem, "status")}
                  />
                </Typography>
              );
            })}
            {levelFilters?.map((filterItem) => {
              {
                console.log(filterItem);
              }
              return (
                <Typography
                  sx={{
                    borderRadius: 1,
                    backgroundColor: "rgba(248, 249, 253, 0.49)",
                    color: "white",
                    display: "inline",
                    p: 1,
                    m: 2,
                    borderRadius: 2,
                  }}
                >
                  {filterItem}
                  <Image
                    src={"/media/cross-icon.svg"}
                    alt={"cross icon"}
                    height={20}
                    width={20}
                    onClick={() => handleRemoveItem(filterItem, "level")}
                  />
                </Typography>
              );
            })}
          </Box>
        </Box>
      </Box>

      {/* challenges cards */}
      <Box
      sx={{backgroundColor:"rgba(0, 49, 69, 1)" }}
       >
      <Box
          sx={{
            display: "grid",
            width:"90%",
            gridTemplateColumns:"repeat(3,1fr)",
            px:4,
            alignItems:"stretch" ,
            // backgroundColor:"blue",
            gap:1,
            margin: "auto",
          }}
        >
          {filteredChallenges.length === 0 ? (
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
              {filteredChallenges?.map((singleChallengeDetails, key) => {
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
    </Box>
  );
};

export default ExploreChallenges;
