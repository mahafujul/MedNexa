// Import necessary modules and dependencies
import { NextRequest,NextResponse } from "next/server";
import jwt,{JwtPayload} from 'jsonwebtoken'
import {Doctor} from '@/models/doctorModel'
import {connect} from '@/config/dbConfig'

//Connect to the database
connect();

//Endpoint to update a Doctor's account
export default async function PUT(request: NextRequest){
    try{
        // Retrieve the doctorId from params
        const pathname = request.nextUrl.pathname.split('/');
        const doctorId = pathname[pathname.length - 1];

        //Retrive updated data from requestBody
        const reqBody = await request.json();
        const { password, firstName, lastName, email, about, specialization, phoneNumber, address, city, experience, feePerCunsultation, facebook, linkedin, twitter, youtube} = reqBody;


        // Extract the token from the request cookies
        const token = request.cookies.get("token");
        
        // Check if token exists
        if (!token) {
            // Return a JSON response indicating token-related issue
            return NextResponse.json({ message: "Token related issue", success: false });
        }
        
        // Decode the token to get user information
        const decodedToken = jwt.verify(token?.value, `${process.env.TOKEN_SECRET}`) as JwtPayload;
        const { username, role} = decodedToken;

        // Find the doctor user by doctorId and update
        const doctor = await Doctor.findByIdAndUpdate(doctorId,{username, password, firstName, lastName, email, about, specialization, phoneNumber, address, city, experience, feePerCunsultation, facebook, linkedin, twitter, youtube})

        if(!doctor){
            // Return a JSON response indicating no doctor found with the given doctor ID
            return NextResponse.json({ message: "No doctor found with the given doctor ID", success: false }, { status: 404 });
        }
        
        return NextResponse.json({message: "Profine successfully updated.", updatedDoctor: doctor, success: true},{status: 200})
    }catch(err: any){
        // Return a JSON response for internal server error
        return NextResponse.json({ message: err.message, success: false }, { status: 500 });
    }
}