import challenge from "@/models/challenge";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    const body = await req.json();
    const { status, level } = body;
    if (!status ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    await connectToDatabase();
    let challenges = {};
    if(status==="All" && level === null ) challenges = await challenge.find({ status: status });
    else if (status!=="All" && level === null) challenges = await challenge.find({ status: status });
    else challenges = await challenge.find({ status: status, level: level });

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
