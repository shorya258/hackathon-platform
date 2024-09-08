"use client"
import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
const ChallengeDetails = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [challengeId, setChallengeId] = useState(searchParams.get("requestId"));

  return (
    <Box>
      <Button
        onClick={() => router.push(`/ChallengeForm?requestId=${challengeId}`)}
        variant="outlined" sx={{bgcolor:"green", color:"white" }}
      >
        Edit
      </Button>
      <Button sx={{bgcolor:"red", color:"white" }} >Delete</Button>
    </Box>
  );
};

export default ChallengeDetails;
