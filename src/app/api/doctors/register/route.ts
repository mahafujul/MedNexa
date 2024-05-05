// Import necessary modules
import bcrypt from 'bcryptjs'; // Module for password hashing
import { NextResponse, NextRequest } from 'next/server'; // Next.js server-side request and response modules
import { Doctor } from '@/models/doctorModel'; // Import Doctor model
import { connect } from '@/config/dbConfig'; // Import database connection function

// Connect to the MongoDB database
connect();

// Endpoint for doctor creation
export default async function POST(request: NextRequest) {
    try {
        // Parse request body
        const reqBody = await request.json();
        
        // Destructure request body to extract data
        const { 
            username, password, firstName, lastName, email, about, specialization, 
            phoneNumber, address, city, experience, feePerCunsultation, 
            facebook, linkedin, twitter, youtube 
        } = reqBody;
        
        // Check if a user with the given username already exists
        const userExists = await Doctor.findOne({ username });
        if (userExists) {
            return NextResponse.json({ message: "Doctor already exists with the given username", success: false }, { status: 200 });
        }
        
        // Generate salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Create a new Doctor instance with the provided data
        const newUser = new Doctor({
            username, password: hashedPassword, firstName, lastName, email, 
            about, specialization, phoneNumber, address, city, experience, 
            feePerCunsultation, facebook, linkedin, twitter, youtube
        });
        
        // Save the new doctor to the database
        await newUser.save();
        
        // Return success response
        return NextResponse.json({ message: "Doctor created successfully", success: true }, { status: 200 });
    } catch (err: any) {
        // Return a JSON response for internal server error with a status code (500)
        return NextResponse.json({ message: 'Internal Server Error', success: false }, { status: 500 });
    }
}
