import { NextResponse } from "next/server";
import { connect } from '@/config/dbConfig'; // Import database connection function
import { Doctor } from '@/models/doctorModel'; // Import Doctor model

// Connect to the MongoDB database
connect();

// Endpoint to get all the doctors
export default async function GET() {
    try {
        // Find all doctors in the database
        const doctors = await Doctor.find({});

        // Check if doctors exist
        if (!doctors || doctors.length === 0) {
            return NextResponse.json({ message: "No doctors present", success: false }, { status: 404 });
        }

        // Return success response with doctors data
        return NextResponse.json({ message: "All the doctors retrieved successfully.", doctors, success: true }, { status: 200 });
    } catch (err: any) {
        // Return a JSON response for internal server error with a status code (500)
        return NextResponse.json({ message: "Internal server error", err: err.message }, { status: 500 });
    }
}
