import challenge from "@/models/challenge";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    const body = await req.json();
    const { challengeDetails } = body;
    if (
      !challengeDetails.challengeName ||
      !challengeDetails.challengeDescription ||
      !challengeDetails.startDate ||
      !challengeDetails.endDate ||
      !challengeDetails.level ||
      !challengeDetails.image ||
      !challengeDetails.status
    ) {
      console.log(challengeDetails);
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    await connectToDatabase();
    const newChallenge = new challenge({
      challengeName: challengeDetails.challengeName,
      startDate: new Date(challengeDetails.startDate),
      endDate: new Date(challengeDetails.endDate),
      challengeDescription: challengeDetails.challengeDescription,
      level: challengeDetails.level,
      image: challengeDetails.image,
      status: challengeDetails.status,
    });
    await newChallenge.save();
    return NextResponse.json(
      { message: "Challenge registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to register challenge" },
      { status: 500 }
    );
  }
}
export async function PUT(req) {
  try {
    const body = await req.json();
    const { challengeDetails } = body;
    // console.log("product",product);
    if (
      !challengeDetails.challengeName ||
      !challengeDetails.challengeDescription ||
      !challengeDetails.startDate ||
      !challengeDetails.endDate ||
      !challengeDetails.level ||
      !challengeDetails.image ||
      !challengeDetails.status
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    await connectToDatabase();
    const objectId = challengeDetails._id;
    console.log(objectId);
    const updatedChallenge = await challenge.findByIdAndUpdate(
      objectId,
      {
        challengeName: challengeDetails.challengeName,
        startDate: challengeDetails.startDate,
        endDate: challengeDetails.endDate,
        challengeDescription: challengeDetails.challengeDescription,
        level: challengeDetails.level,
        image: challengeDetails.image,
        status: challengeDetails.status,
      },
      { new: true }
    );

    if (!updatedChallenge) {
      return NextResponse.json(
        { error: "Could not change the product" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Challenge changed successfully by the admin" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to change the product" },
      { status: 500 }
    );
  }
}

// .catch((e)=>{
//   console.log(e)
//   return NextResponse.json(
//     { error: "Failed to change the product" },
//     { status: 500 }
//   );
// })
