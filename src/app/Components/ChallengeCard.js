"use client";
import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Box, Button, CardActions } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
const ChallengeCard = ({ challengeDetails }) => {
  const {
    _id,
    challengeName,
    startDate,
    endDate,
    challengeDescription,
    level,
    image,
  } = challengeDetails;
  const [status, setStatus] = useState("");
  const [timeLeft, setTimeLeft] = useState({});
  const router=useRouter();
  useEffect(() => {
    // Convert startTime and endTime to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    const timerInterval = setInterval(() => {
      const now = new Date();

      if (now < start) {
        setStatus("upcoming");
        const remainingTime = start - now; // Calculate remaining time in milliseconds
        const seconds = Math.floor((remainingTime / 1000) % 60);
        const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
        const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
        });
      } else if (now >= start && now <= end) {
        setStatus("active");
        const remainingTime = end - now; // Calculate remaining time in milliseconds
        const seconds = Math.floor((remainingTime / 1000) % 60);
        const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
        const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
        });
      } else if (now > end) {
        setStatus("past");
        setTimeLeft({});
        clearInterval(timerInterval); // Stop the timer
      }
    }, 1000); // Update every second

    return () => clearInterval(timerInterval); // Cleanup interval on component unmount
  }, [startDate, endDate]);

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

  return (
    <div
          onClick={()=>router.push(`/ChallengeDetails?requestId=${_id}`)}
     >
      <Card sx={{ width: 345, m: 4, height: "auto", borderRadius: "14px" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={image}
            alt="challenge img"
          />
          <CardContent
            sx={{
              // p: 5,
            }}
          >
            <Typography
              sx={{
                py: {
                  sm: "5px",
                  md: "8px",
                },
                mt: {
                  sm: "6px",
                  md: "10px",
                },
                textAlign: "center",
                borderRadius: "10px",
                width: "50%",
                display: "block",
                margin: "0 auto",
                ...statusStyles[status],
              }}
              // component={"span"}
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
                textAlign:"center"
              }}
            >
              {challengeName}
            </Typography>
            {status === "upcoming" && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                }}
              >
                <Typography sx={{my:2}} >Starting In</Typography>

                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        width: "50px",
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "24px",
                      }}
                    >
                      {timeLeft.days}
                    </Typography>
                    <Typography
                      sx={{
                        width: "20px",
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "24px",
                      }}
                    >
                      :
                    </Typography>
                    <Typography
                      sx={{
                        width: "50px",
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "24px",
                      }}
                    >
                      {timeLeft.hours}
                    </Typography>
                    <Typography
                      sx={{
                        width: "20px",
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "24px",
                      }}
                    >
                      :
                    </Typography>
                    <Typography
                      sx={{
                        width: "50px",
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "24px",
                      }}
                    >
                      {timeLeft.minutes}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Typography sx={{ width: "50px", textAlign: "center" }}>
                      Days
                    </Typography>
                    <Typography sx={{ width: "20px", textAlign: "center" }}>
                      :
                    </Typography>
                    <Typography sx={{ width: "50px", textAlign: "center" }}>
                      Hours
                    </Typography>
                    <Typography sx={{ width: "20px", textAlign: "center" }}>
                      :
                    </Typography>
                    <Typography sx={{ width: "50px", textAlign: "center" }}>
                      Minutes
                    </Typography>
                  </Box>
                </Box>
                {/* {startTimer(startDate, endDate)} */}
              </Box>
            )}
            {status === "active" && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                }}
              >
                <Typography sx={{my:2}} >Ending In</Typography>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        width: "50px",
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "24px",
                      }}
                    >
                      {timeLeft.days}
                    </Typography>
                    <Typography
                      sx={{
                        width: "20px",
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "24px",
                      }}
                    >
                      :
                    </Typography>
                    <Typography
                      sx={{
                        width: "50px",
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "24px",
                      }}
                    >
                      {timeLeft.hours}
                    </Typography>
                    <Typography
                      sx={{
                        width: "20px",
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "24px",
                      }}
                    >
                      :
                    </Typography>
                    <Typography
                      sx={{
                        width: "50px",
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "24px",
                      }}
                    >
                      {timeLeft.minutes}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Typography sx={{ width: "50px", textAlign: "center" }}>
                      Days
                    </Typography>
                    <Typography sx={{ width: "20px", textAlign: "center" }}>
                      :
                    </Typography>
                    <Typography sx={{ width: "50px", textAlign: "center" }}>
                      Hours
                    </Typography>
                    <Typography sx={{ width: "20px", textAlign: "center" }}>
                      :
                    </Typography>
                    <Typography sx={{ width: "50px", textAlign: "center" }}>
                      Minutes
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
            {status === "past" && (
              <Box>
                <Typography
                 sx={{my:2}} 
                >
                  Ended On
                </Typography>
                {/* {startTimer(startDate, endDate)} */}
                <p>{new Date(endDate).toString()}</p>
                {/* <Typography> {new Date(endDate).toString()} </Typography> */}
              </Box>
            )}
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <Button
            sx={{
              color: "white",
              background: "rgba(68, 146, 76, 1)",
              height: "auto",
              borderRadius: "18px",
            }}
          // onClick={()=>router.push(`/ChallengeForm?requestId=${_id}`)}
          >
            <Image
              src={"/media/participate-now.svg"}
              alt={"participate"}
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
        </CardActions>
      </Card>
    </div>
  );
};

export default ChallengeCard;
