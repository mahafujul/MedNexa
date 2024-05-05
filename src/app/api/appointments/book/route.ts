// Import necessary modules and dependencies
import { NextResponse,NextRequest } from "next/server";
import {connect} from '@/config/dbConfig'
import {Appointment} from '@/models/appointmentModel'
import {User} from '@/models/userModel'
import jwt,{JwtPayload} from 'jsonwebtoken'

// connect to the database
connect();

//Endpoitn to book an appointment
export default async function POST(request: NextRequest){
    try{
        //Retrive data from requets body
        const reqBody = await request.json();
        const {doctorId, date, selectedTimeSlot, note} = reqBody;

        // Extract the token from the request cookies
        const token = request.cookies.get("token");
        
        // Check if token exists
        if (!token) {
            // Return a JSON response indicating token-related issue
            return NextResponse.json({ message: "Token related issue", success: false });
        }
        
        // Decode the token to get user information
        const decodedToken = jwt.verify(token?.value, `${process.env.TOKEN_SECRET}`) as JwtPayload;
        const { username, role, userId } = decodedToken;

        // Find the user with userId taht we retrived from cookie
        const user = await User.findOne({_id: userId})

        //check if user available who is trying to create the appointment
        if(!user){
            return NextResponse.json({message: "No user is found with the given userId", succes: false},{status: 400})
        }

        //Create the appointment
        const appointment = new Appointment({doctorInfo: doctorId, userInfo: userId, date, selectedTimeSlot, note})

        //save the newly created appointment
        await appointment.save();

        //Add the newly created appoint to the 'allAppointments' array
        user.allAppointments.push(appointment._id);

        // save the user after adding the _id of the appointment
        await user.save();
        
        return NextResponse.json({message: "Appointment successfully created for {doctor anme} on {date information}"},{status: 201});
    }catch(err: any){
        return NextResponse.json({message: err.message, success: false},{status: 500})
    }
}