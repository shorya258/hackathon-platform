import challenge from "@/models/challenge";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    const body = await req.json();
    const { statusOptions, levelOptions } = body;
    // [All, Upcoming, Ended, Active]= status
    console.log(body)
    // [Hard, easy, medium]=level
    if (!statusOptions) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    await connectToDatabase();

    let challenges = {};

    if (statusOptions.includes( "All")) {
      console.log(true)
      if (levelOptions === null) {
        challenges = await challenge.find({});
      } else {
        challenges= await challenge.find({
          level: { $in: levelOptions }
        })
      }
    }
    else{
      let statusFilter = { status: { $in: statusOptions } };
      if(levelOptions===null){
        challenges= await challenge.find(statusFilter)
      }
      else{
      let levelFilter = { level: { $in: levelOptions } };
      console.log(statusFilter, levelFilter)
      const filter = {
        ...statusFilter,
        ...levelFilter,
      };
      challenges= await challenge.find(filter);
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
