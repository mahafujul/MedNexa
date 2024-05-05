// Import necessary modules and dependencies
import { NextResponse, NextRequest } from "next/server";
import { Doctor } from "@/models/doctorModel"; // Import the Doctor model
import jwt, { JwtPayload } from 'jsonwebtoken'; // Import JWT for token decoding
import { connect } from '@/config/dbConfig'; // Import the database connection function

// Connect to the database
connect();

// Endpoint to get details about a specific doctor
export async function GET(request: NextRequest) {
    try {
        // Retrieve the doctorId from params
        const pathname = request.nextUrl.pathname.split('/');
        const doctorId = pathname[pathname.length - 1];

        // Extract the token from the request cookies
        const token = request.cookies.get("token");
        
        // Check if token exists
        if (!token) {
            // Return a JSON response indicating token-related issue
            return NextResponse.json({ message: "Token related issue", success: false });
        }
        
        // Decode the token to get user information
        const decodedToken = jwt.verify(token?.value, `${process.env.TOKEN_SECRET}`) as JwtPayload;
        const { username, role } = decodedToken;

        // Find the doctor user by doctorId
        const doctor = await Doctor.findOne({ _id: doctorId })

        if(!doctor){
            // Return a JSON response indicating no doctor found with the given doctor ID
            return NextResponse.json({ message: "No doctor found with the given doctor ID", success: false }, { status: 404 });
        }
        
        // Return the package details as JSON response
        return NextResponse.json({ message: "Doctor details successfully fetched", doctor, success: true }, { status: 200 });

    } catch (err: any) {
        // Return a JSON response for internal server error
        return NextResponse.json({ message: err.message, success: false }, { status: 500 });
    }
}