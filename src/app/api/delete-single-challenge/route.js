import challenge from "@/models/challenge";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";
export async function DELETE(req) {
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
      challenge.deleteOne(challengeId)
      .then(()=>{
        return NextResponse.json({ message: "Challenge deleted" }, { status: 201 });
      })
      .catch((e)=>{
        return NextResponse.json({ error: e }, { status: 400 });
      })
      
    } catch (error) {
      console.error("Error occurred:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }
  