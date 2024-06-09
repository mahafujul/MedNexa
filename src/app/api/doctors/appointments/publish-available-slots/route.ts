// Import necessary modules and dependencies
import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/config/dbConfig";
import { Doctor } from "@/models/doctorModel";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

// Connect to the database
connect();

// Endpoint to update available slots for a specific doctor
export async function POST(request: NextRequest) {
  try {
    // Retrieve session information to get the logged-in user's ID
    const session = await getServerSession(authOptions);
    const userId = session?.user?.userId;

    // Check if the logged-in user is a doctor
    const doctor = await Doctor.findOne({ _id: userId });
    if (!doctor) {
      // Return unauthorized response if the user is not a doctor
      return NextResponse.json(
        { message: "Unauthorized", success: false },
        { status: 401 }
      );
    }

    // Extract date and slots from the request body
    const { date, slots } = await request.json();

    // Update the doctor's available slots
    doctor.availableSlots.set(date, slots);
    await doctor.save();

    // Return success response after updating available slots
    return NextResponse.json(
      { message: "Available slots updated successfully", success: true },
      { status: 200 }
    );
  } catch (err: any) {
    // Return JSON response for internal server error
    return NextResponse.json(
      { message: err.message, success: false },
      { status: 500 }
    );
  }
}
