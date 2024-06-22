import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/config/dbConfig";
import { Doctor } from "@/models/doctorModel";

// Connect to the database
connect();

// Endpoint to extract doctors of a specialization category
export async function GET(request: NextRequest) {
  try {
    // Extract specialization name from query parameter
    const reqUrl = request.url;
    const { searchParams } = new URL(reqUrl);
    const specialization = searchParams.get("specialization");

    // Aggregate doctors based on the specialization
    const doctors = await Doctor.aggregate([
      {
        $match: {
          specialization: specialization,
          pending: false,
        },
      },
      {
        $project: {
          _id: 1,
          name: {
            $concat: ["Dr ", "$firstName", " ", "$lastName"],
          },
          url: 1,
          feePerConsultation: 1,
          experience: 1,
          specialization: 1,
          city: 1,
          degrees: 1,
        },
      },
    ]);

    // Check if any doctors are found
    if (!doctors.length) {
      return NextResponse.json(
        {
          message: "No doctors available with the given specialization.",
          success: false,
        },
        { status: 404 } // Not Found status code is more appropriate here
      );
    }

    // Return the list of doctors if found
    return NextResponse.json(
      { doctors, message: "Doctors retrieved successfully", success: true },
      { status: 200 }
    );
  } catch (err: any) {
    // Handle internal server error
    return NextResponse.json(
      { message: "Internal server error.", success: false },
      { status: 500 }
    );
  }
}
