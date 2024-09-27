// pages/api/users/register.js
// Import necessary modules and dependencies
import bcrypt from 'bcryptjs'; // Module for password hashing
import { NextResponse, NextRequest } from 'next/server'; // Next.js server-side request and response modules
import { User } from '@/models/userModel'; // Import User model
import { connect } from '@/config/dbConfig'; // Import database connection function

// Connect to the MongoDB database
connect();

// Endpoint for user creation
export async function POST(request: NextRequest) {
    try {
        // Parse request body
        const reqBody = await request.json();
        
        // Destructure request body to extract data
        const { username, password, firstName, lastName, email, mobileNumber } = reqBody;
        
        // Check if a user with the given username already exists
        const userExists = await User.findOne({ username });
        if (userExists) {
            // Return a JSON response indicating that the user already exists
            return NextResponse.json({ message: "User already exists", success: false }, { status: 200 });
        }
        
        // Generate salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Create a new User instance with the provided data
        const newUser = new User({ username, password: hashedPassword, firstName, lastName, email, mobileNumber });
        
        // Save the new user to the database
        await newUser.save();
        
        // Return success response
        return NextResponse.json({ message: "User created successfully", success: true }, { status: 200 });
    } catch (err: any) {
        // Return a JSON response for internal server error with a status code (500)
        return NextResponse.json({ message: 'Internal Server Error', success: false }, { status: 500 });
    }
}

