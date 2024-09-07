import challenge from "@/models/challenge";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    const body = await req.json();
    const { statusOptions, leveloptions } = body;
    if (!statusOptions) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    await connectToDatabase();
    let challenges = {};
    if (status === "All") {
      if (level === null) {
        challenges = await challenge.find({});
      } else {
        challenges = await challenge.find({ level });
      }
    } else {
      if (level === null) {
        challenges = await challenge.find({ status });
      } else {
        challenges = await challenge.find({ level, status });
      }
    }

    if (!challenges) {
      return NextResponse.json(
        { error: "No challenges match the filters." },
        { status: 400 }
      );
    }
    // console.log(reviews)
    return NextResponse.json({ challenges }, { status: 201 });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
