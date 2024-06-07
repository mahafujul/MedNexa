// Import necessary modules and dependencies
import { NextResponse, NextRequest } from "next/server";
import { User } from "@/models/userModel"; // Import the User model
import { connect } from "@/config/dbConfig"; // Import the database connection function
import { getServerSession } from "next-auth/next"; // Import the getServerSession function from NextAuth
import { authOptions } from "@/app/api/auth/[...nextauth]/options"; // Import NextAuth options
import { getUserAppointmentsAggregation } from "@/helper/getUserAppointmentsAggregation"; // Import aggregation helper for user appointments

// Connect to the database
connect();

// Endpoint to get details about a specific user
export async function GET(request: NextRequest) {
  try {
    // Retrieve the userId from session
    const session = await getServerSession(authOptions);
    const userId = session?.user?.userId;

    // Check if userId is retrieved successfully
    if (!userId) {
      return NextResponse.json(
        { message: "User ID not found in session", success: false },
        { status: 400 }
      );
    }

    // Find the user by userId using an aggregation pipeline
    const user = await User.aggregate(getUserAppointmentsAggregation(userId));

    // Check if user exists
    if (!user) {
      // Return a JSON response indicating no user found with the given user ID
      return NextResponse.json(
        { message: "No user found with the given user ID", success: false },
        { status: 404 }
      );
    }

    // Return the user details as JSON response
    return NextResponse.json(
      { message: "User details successfully fetched", user, success: true },
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

// Endpoint to update user details.
export async function PUT(request: NextRequest) {
  try {
    // Retrieve the userId from session
    const session = await getServerSession(authOptions);
    const userId = session?.user?.userId; // Adjust how you get userId from session

    // Check if userId is retrieved successfully
    if (!userId) {
      return NextResponse.json(
        { message: "User ID not found in session", success: false },
        { status: 400 }
      );
    }

    // Parse request body
    const reqBody = await request.json();

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { ...reqBody },
      { new: true }
    ).populate({
      path: "allAppointments",
      populate: [
        {
          path: "doctorInfo",
        },
        {
          path: "userInfo",
        },
      ],
    });

    return NextResponse.json(
      {
        message: "User successfully updated",
        user: updatedUser,
        success: true,
      },
      { status: 200 }
    );
  } catch (err: any) {
    // Return a JSON response for internal server error
    console.log(err);
    return NextResponse.json(
      { message: err.message, success: false },
      { status: 500 }
    );
  }
}
