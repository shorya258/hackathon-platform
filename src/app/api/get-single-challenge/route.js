import challenge from "@/models/challenge";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";
export async function POST(req) {
    try {
      const body = await req.json();
      const { challengeId } = body;
      if (!challengeId) {
        return NextResponse.json(
          { error: "Missing required fields" },
          { status: 400 }
        );
      }
      await connectToDatabase();
      const foundChallenge = await challenge.findById(challengeId);
      if(!foundChallenge) {
        return NextResponse.json({ error: "Challenge not found" }, { status: 400 });
      }
      else {
        return NextResponse.json({ foundChallenge }, { status: 201 });
      }
      // console.log(reviews)
      
    } catch (error) {
      console.error("Error occurred:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }
  