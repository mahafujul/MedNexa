// Import necessary modules and dependencies
import { NextResponse } from "next/server";
import { Doctor } from "@/models/doctorModel";
import {connect} from '@/config/dbConfig';

// Connect to the database
connect();

// Endpoint to get all popular doctors sorted by numberOfFeedback in descending order
export async function GET() {
    try {
        // Aggregate popular doctors
        const popularDoctors = await Doctor.aggregate([
            { $match: { popular: true } }, // Filter only popular doctors
            { $sort: { numberOfFeedback: -1 } } // Sort by numberOfFeedback in descending order
        ]);

        // Check if any popular doctors found
        if (popularDoctors.length === 0) {
            return NextResponse.json({ message: "No popular doctors found", success: false }, { status: 404 });
        }

        // Return a JSON response with popular doctors
        return NextResponse.json({ popularDoctors, message: "All popular doctors retrieved successfully", success: true }, { status: 200 });
    } catch (err: any) {
        // Return a JSON response for internal server error with a status code (500)
        return NextResponse.json({ message: err.message, success: false }, { status: 500 });
    }
}
