// Import necessary modules and dependencies
import { NextRequest,NextResponse } from "next/server";
import { Admin } from "@/models/adminModel";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {connect} from '@/config/dbConfig'

//Connet to the database
connect();
export default async function POST(request: NextRequest){
    try {
        // Parse request body
        const reqBody = await request.json();
        const { username, password } = reqBody;

        // Check if admin exists
        const admin = await Admin.findOne({ username });
        if (!admin) {
            // Return a JSON response indicating that the user does not exist with a bad request status code (400)
            return NextResponse.json({ message: "User does not exist, please check your username.", success: false }, { status: 400 });
        }

        // Check if password is correct
        const validPassword = await bcrypt.compare(password, admin.password);
        if (!validPassword) {
            // Return a JSON response indicating an invalid password with a bad request status code (400)
            return NextResponse.json({ message: "Invalid password", success: false }, { status: 400 });
        }

        // Create token data
        const tokenData = {
            username: admin.username,
            adminId: admin._id,
            role: 'admin'
        };

        // Create token using jwt
        const token = jwt.sign(tokenData, `${process.env.TOKEN_SECRET}`, { expiresIn: '1d' });

        // Respond back to the user with a cookie containing the token
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            username: tokenData.username
        }, { status: 200 });

        // Set the token into the cookie on the response
        response.cookies.set("token", token, {
            httpOnly: true
        });

        return response;

    } catch (err: any) {
        // Return a JSON response for internal server error with a status code (500)
        return NextResponse.json({ message: err.message, success: false }, { status: 500 });
    }
}