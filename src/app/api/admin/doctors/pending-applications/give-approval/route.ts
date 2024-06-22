import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/config/dbConfig";
import { Doctor } from "@/models/doctorModel";

// Connect to the database
connect();

// Endpoint to approve a specific doctor onboarding application
export async function PUT(request: NextRequest) {
  try {
    const reqUrl = request.url;
    const { searchParams } = new URL(reqUrl);
    const applicationId = searchParams.get("applicationId");

    // Extract data from request body
    const reqBody = await request.json();

    // Find and update the doctor application by ID, setting pending to false
    const updatedDoctor = await Doctor.findOneAndUpdate(
      { _id: applicationId },
      { ...reqBody, pending: false },
      { new: true }
    );

    // Return success response indicating the application has been approved successfully
    return NextResponse.json(
      { message: "Application approved successfully", success: true },
      { status: 200 }
    );
  } catch (err: any) {
    // Return a JSON response for internal server error with a status code (500)
    return NextResponse.json(
      { message: "Internal Server Error", success: false, err: err.message },
      { status: 500 }
    );
  }
}
