"use client"
import React from "react";
import Image from "next/image";
import { Box, Button, Typography } from "@mui/material";
import DashboardCards from "./DashboardCards";
import { useRouter } from "next/navigation";
const Dashboard = () => {
  const router=useRouter();
  return (
    <div>
      {/* blue section 1 */}
      <Box
        className="hero-page"
        sx={{
          backgroundColor: "rgba(0, 49, 69, 1)",
          display: "flex",
          flexDirection: "row",
          color: "white",
          px: 4,
          py: 4,
        }}
      >
        <Box
          sx={{
            width: "60%",
            whiteSpace: "normal",
            wordWrap: "break-word",
            px: 4,
            py: 4,
            mx: 4,
            my: 4,
          }}
        >
          <Typography
            sx={{
              fontSize: "48px",
              fontWeight: "bold",
              my: 4,
              px: 4,
              borderLeft: 10,
              borderColor: "yellow",
            }}
          >
            Accelerate Innovation with Global AI Challenges
          </Typography>
          <Typography
            // component="span"
            sx={{
              fontSize: "18px",
              py: 4,
              mx: 4,
              textAlign: "left",
              whiteSpace: "normal", // Ensure text wraps within the container
              wordBreak: "break-word", // Break long words if necessary
              width: "100%",
            }}
          >
            AI Challenges at DPhi simulate real-world problems. It is a great
            place to put your AI/Data Science skills to test on diverse datasets
            allowing you to foster learning through competitions.
          </Typography>
          <Button
            variant="outlined"
            sx={{
              backgroundColor: "white",
              color: "rgba(0, 49, 69, 1)",
              my: 4,
              mx: 4,
              height: 50,
              fontSize: "18px",
              borderRadius: "10px",
              fontWeight: "bold",
            }}
            onClick={()=>(route.push('/ChallengeForm'))}
          >
            Create Challenge
          </Button>
        </Box>
        <Box
          sx={{
            display: {
              sm: "none",
              md: "flex",
            },
          }}
        >
          <Image
            src={"/media/rocket.svg"}
            alt="rocket"
            height={500}
            width={300}
          />
        </Box>
      </Box>
      {/* blue section 2 */}
      <Box
        sx={{
          backgroundColor: "rgba(0, 42, 59, 1)",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          color: "white",
          px: 4,
          py: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            borderRight: 2,
            borderColor: "white",
            px: 4,
          }}
        >
          <Image
            src={"/media/row-icon-1.svg"}
            alt="ai icon"
            height={60}
            width={60}
          />
          <Box
            sx={{
              mx: 4,
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: 24,
              }}
            >
              100K+
            </Typography>
            <Typography>AI model submissions</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            borderRight: 2,
            borderColor: "white",
            px: 4,
          }}
        >
          <Image
            src={"/media/row-icon-2.svg"}
            alt="user icon"
            height={60}
            width={60}
          />
          <Box
            sx={{
              mx: 4,
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: 24,
              }}
            >
              50K+
            </Typography>
            <Typography>Data Scientists</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            px: 4,
          }}
        >
          <Image
            src={"/media/row-icon-3.svg"}
            alt="robot icon"
            height={60}
            width={60}
          />
          <Box
            sx={{
              mx: 4,
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: 24,
              }}
            >
              100+
            </Typography>
            <Typography>AI Challenges hosted</Typography>
          </Box>
        </Box>
      </Box>
      {/* why participate challenges */}
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            mx: 5,
            my: 5,
          }}
        >
          <Typography
            sx={{
              fontSize: 32,
              fontWeight: "bold",
            }}
          >
            Why participate in &nbsp;
          </Typography>
          <Typography
            sx={{
              color: "rgba(68, 146, 76, 1)",
              fontSize: 32,
              fontWeight: "bold",
            }}
          >
            AI Challenges
          </Typography>
        </Box>
        {/* four cards */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent:"center"
          }}
        >
          <DashboardCards
            imgSrc={"/media/card-icon-2.svg"}
            title={"Prove your skills"}
            description={
              "Gain substantial experience by solving real-world problems and pit against others to come up with innovative solutions."
            }
          />
          <DashboardCards
            imgSrc={"/media/card-icon-1.svg"}
            title={"Learn from community"}
            description={
              "One can look and analyze the solutions submitted by the other Data Scientists in the community and learn from them."
            }
          />
          <DashboardCards
            imgSrc={"/media/card-icon-3.svg"}
            title={"Challenge yourself"}
            description={
              "There is nothing for you to lose by participating in a challenge. You can fail safe, learn out of the entire experience and bounce back harder."
            }
          />
          <DashboardCards
            imgSrc={"/media/card-icon-4.svg"}
            title={"Earn recognition"}
            description={
              "You will stand out from the crowd if you do well in AI challenges, it not only helps you shine in the community but also earns rewards."
            }
          />
        </Box>
      </Box>
    </div>
  );
};

export default Dashboard;
