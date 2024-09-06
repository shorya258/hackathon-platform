"use client"
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const DashboardCards = ({ imgSrc, title, description }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        width: "40%",
        m: 4,
        px: 4,
        py: 8,
        borderRadius: "12px",
        backgroundColor: "rgba(248, 249, 253, 1)",
      }}
    >
      <Box>
        <Image src={imgSrc} alt="media card" height={50} width={50} />
      </Box>
        <Typography
        sx={{
            fontSize:"24px",
            fontWeight:"bold"
        }}
        >{title}</Typography>
        <Typography
          sx={{
            textWrap: "wrap",
          }}
        >
          {description}
        </Typography>
    </Box>
  );
};

export default DashboardCards;
