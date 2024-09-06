import challenge from "@/models/challenge";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    const body = await req.json();
    console.log(body)
    const { challengeDetails } = body;
    if (
      !challengeDetails.challengeName ||
      !challengeDetails.challengeDescription ||
      !challengeDetails.startDate ||
      !challengeDetails.endDate
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    await connectToDatabase();
    const newChallenge = new challenge({
        challengeName:challengeDetails.challengeName,
        startDate:challengeDetails.startDate,
        endDate:challengeDetails.endDate,
        challengeDescription:challengeDetails.challengeDescription
    });
    await newChallenge.save();
    return NextResponse.json(
      { message: "Challenge registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Failed to register challenge" },
      { status: 500 }
    );
  }
}
