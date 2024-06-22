import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/config/dbConfig";
import { Doctor } from "@/models/doctorModel";
import mongoose from "mongoose";

// Connect to the database
connect();

// Endpoint to retrieve all or a specific pending doctor onboarding application
export async function GET(request: NextRequest) {
  try {
    const ObjectId = mongoose.Types.ObjectId;
    const reqUrl = request.url;
    const { searchParams } = new URL(reqUrl);
    const applicationId = searchParams.get("applicationId");

    // If request is coming without applicationId as query params, retrieve all pending applications
    if (!applicationId) {
      const doctors = await Doctor.aggregate([
        {
          $match: {
            pending: true,
          },
        },
        {
          $project: {
            username: 1,
            name: {
              $concat: ["Dr. ", "$firstName", " ", "$lastName"],
            },
            url: 1,
            email: 1,
            phoneNumber: 1,
            specialization: 1,
            degrees: 1,
            pending: 1,
            address: 1,
            city: 1,
            experience: 1,
            feePerConsultation: 1,
          },
        },
      ]);

      if (!doctors.length) {
        // Return response indicating no pending applications available
        return NextResponse.json(
          { message: "No pending applications are available.", success: false },
          { status: 400 }
        );
      }

      // Return success response with all pending applications
      return NextResponse.json(
        {
          message:
            "All pending applications of doctor registration retrieved successfully",
          doctors,
          success: true,
        },
        { status: 200 }
      );
    }

    // Retrieve specific doctor application by applicationId
    const doctor = await Doctor.aggregate([
      {
        $match: {
          _id: new ObjectId(applicationId),
        },
      },
      {
        $project: {
          username: 1,
          firstName: 1,
          lastName: 1,
          url: 1,
          email: 1,
          phoneNumber: 1,
          about: 1,
          specialization: 1,
          degrees: 1,
          address: 1,
          city: 1,
          experience: 1,
          feePerConsultation: 1,
        },
      },
    ]);

    if (!doctor.length) {
      // Return response indicating the specific application was not found
      return NextResponse.json(
        { message: "Not found", success: false },
        { status: 400 }
      );
    }

    // Return success response with the specific doctor application details
    return NextResponse.json(
      {
        message: "Application details retrieved successfully",
        doctor,
        success: true,
      },
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
