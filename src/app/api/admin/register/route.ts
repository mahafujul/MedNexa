// Import necessary modules and dependencies
import { NextResponse,NextRequest } from "next/server";
import bcrypt from 'bcryptjs'
import { Admin } from '@/models/adminModel'
import {connect} from '@/config/dbConfig'

//Connet to the database
connect();
export async function POST(request: NextRequest){
    try{
        // Retrieve data from the request body
        const reqBody = await request.json();
        const { username, password, email, firstName, lastName } = reqBody;
        // Check if an admin already exists with the same username
        const adminExists = await Admin.findOne({ username });
        if (adminExists) {
            // Return a JSON response indicating that the username is taken with a bad request status code (400)
            return NextResponse.json({ message: "Username is taken, please try with another one", success: false }, { status: 400 });
        }

        // Hash the login password before storing it in the database
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the admin
        const newAdmin = new Admin({ username, password: hashedPassword, firstName, lastName, email });
        const savedAdmin = await newAdmin.save();
        // Return a JSON response indicating successful user creation with the saved user data and a success status code (201)
        return NextResponse.json({ message: 'Admin created successfully.', success: true, admin: {firstName, lastName, username, email} }, { status: 201 });
    }catch(err: any){
        // Return a JSON response for internal server error if an error occurs
        return NextResponse.json({ message: err.message, success: false }, { status: 500 });
    }
}