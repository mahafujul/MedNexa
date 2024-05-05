// Import necessary modules and dependencies
import { NextResponse } from "next/server"; // Next.js server-side response module
import { connect } from '@/config/dbConfig'; // Import database connection function
import { User } from '@/models/userModel'; // Import User model

// Connect to the MongoDB database
connect();

// Endpoint to get all the users
export default async function GET() {
    try {
        // Find all users in the database
        const users = await User.find({});

        // Check if users exist
        if (!users || users.length === 0) {
            // Return a JSON response indicating no users are present
            return NextResponse.json({ message: "No users present", success: false }, { status: 404 });
        }

        // Return success response with users data
        return NextResponse.json({ message: "Successfully retrieved users.", users, success: true }, { status: 200 });
    } catch (err: any) {
        // Return a JSON response for internal server error with a status code (500)
        return NextResponse.json({ message: "Internal server error", err: err.message }, { status: 500 });
    }
}
