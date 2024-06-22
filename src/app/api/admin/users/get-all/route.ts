import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/config/dbConfig";
import { User } from "@/models/userModel";

// Connect to the database
connect();

// Endpoint to retrieve all users
export async function GET() {
  try {
    // Aggregate to project necessary fields for users
    const users = await User.aggregate([
      {
        $project: {
          username: 1,
          email: 1,
          mobileNumber: 1,
          name: {
            $concat: ["$firstName", " ", "$lastName"],
          },
        },
      },
    ]);

    // Return success response indicating users have been successfully retrieved
    return NextResponse.json(
      { message: "Users retrieved successfully", success: true, users },
      { status: 200 }
    );
  } catch (err: any) {
    // Return a JSON response for internal server error
    return NextResponse.json(
      { message: err.message, success: false },
      { status: 500 }
    );
  }
}
