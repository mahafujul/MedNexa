import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/config/dbConfig";
import { Doctor } from "@/models/doctorModel";

// Connect with the database
connect();

// Endpoint to check whether a given username is available
export async function GET(request: NextRequest) {
  try {
    // Parse the data from the query parameters
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

    // Prefix 'dr-' with every username
    const newUsername = `dr-${username}`;

    // Check if a user with the given username already exists
    const doctorExist = await Doctor.findOne({ username: newUsername });

    if (!doctorExist) {
      // Return a response if the username is available
      return NextResponse.json(
        { message: "Username is available", success: true },
        { status: 200 }
      );
    }

    // Return a response if the username is taken
    return NextResponse.json(
      {
        message: "Username is taken by someone. Please try another one.",
        success: false,
      },
      { status: 200 }
    );
  } catch (err: any) {
    // Return a response in case of an internal server error
    return NextResponse.json(
      { message: "Internal server error.", success: false },
      { status: 500 }
    );
  }
}
