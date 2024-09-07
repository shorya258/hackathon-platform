"use client";
import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Box, Button } from "@mui/material";
import Image from "next/image";
const ChallengeCard = ({ challengeDetails }) => {
  const {
    challengeName,
    startDate,
    endDate,
    challengeDescription,
    level,
    challengeImg,
  } = challengeDetails;
  const [status, setStatus] = useState("");
  const getStatus = () => {
    const formattedStartDate = new Date(startDate);
    const formattedEndDate = new Date(endDate);
    const current = new Date();
    if (current > formattedEndDate) {
      setStatus("past");
      console.log("past");
    } else if (current < formattedStartDate) {
      setStatus("upcoming");
      console.log("upcoming");
    } else {
      setStatus("active");
      console.log("active");
    }
  };

  

  const statusStyles = {
    upcoming: {
      color: "black",
      backgroundColor: " rgba(242, 201, 76, 0.25)",
    },
    active: {
      color: "rgba(68, 146, 76, 1)",
      backgroundColor: "rgba(68, 146, 76, 0.24)",
    },
    past: {
      color: "grey",
      backgroundColor: "rgba(255, 60, 0, 0.17)",
    },
  };

  useEffect(() => {
    getStatus();
  }, []);

  return (
    <div>
      <Card sx={{ maxWidth: 345, m: 4, height: "auto", borderRadius: "14px" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={challengeImg}
            alt="challenge img"
          />
          <CardContent
            sx={{
              p: 5,
            }}
          >
            <Typography
              sx={{
                px: {
                  sm: "10px",
                  md: "30px",
                },
                py: {
                  sm: "5px",
                  md: "8px",
                },
                my: {
                  sm: "6px",
                  md: "10px",
                },
                borderRadius: "10px",
                ...statusStyles[status],
              }}
              component={"span"}
            >
              {status}
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                fontWeight: "bold",
                fontSize: "20px",
                mt: 2,
              }}
            >
              {challengeName}
            </Typography>
            {status === "upcoming" && (
              <Box >
                <Typography>Starting In</Typography>
                {/* {startTimer(startDate, endDate)} */}
              </Box>
            )}
            {status === "active" && (
              <Box>
                <Typography>Ending In</Typography>
              </Box>
            )}
            {status === "past" && (
              <Box>
                <Typography>Ended On</Typography>
                {/* {startTimer(startDate, endDate)} */}
                {/* <Typography> {new Date(endDate).toString()} </Typography> */}
              </Box>
            )}

            <Button
              sx={{
                color: "white",
                background: "rgba(68, 146, 76, 1)",
                height: "auto",
                borderRadius: "18px",
              }}
            >
              <Image
                src={"/media/participate-now.svg"}
                alt={"button"}
                height={20}
                width={20}
              />
              <Typography
                sx={{
                  p: 1,
                  fontSize: "22",
                }}
              >
                Participate Now
              </Typography>
            </Button>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default ChallengeCard;
