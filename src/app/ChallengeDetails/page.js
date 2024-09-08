import { Box, Button } from "@mui/material";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
const ChallengeDetails = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [challengeId, setChallengeId] = useState(searchParams.get("requestId"));

  return (
    <Box>
      <Button
        onClick={() => router.push(`/ChallengeForm?requestId=${challengeId}`)}
        variant="outlined"
      >
        Edit
      </Button>
      <Button>Delete</Button>
    </Box>
  );
};

export default ChallengeDetails;
