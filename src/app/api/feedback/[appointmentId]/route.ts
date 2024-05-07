// POST /api/feedback: Submit feedback and ratings for doctors and the application. 
// Import Next.js server functions and necessary models
import { NextRequest, NextResponse } from "next/server";
import { Feedback } from '@/models/feedbackModel';
import { Appointment } from '@/models/appointmentModel'
import { User } from '@/models/userModel';
import { connect } from '@/config/dbConfig';
import jwt, { JwtPayload } from "jsonwebtoken";
import { Doctor } from "@/models/doctorModel";

// Connect to the database
connect();


// Endpoint to submit feedback and ratings for doctors
export async function POST(request: NextRequest) {
    try {
        // Retrieve the appointmentId from the URL
        const pathname = request.nextUrl.pathname.split('/');
        const appointmentId = pathname[pathname.length - 1];

        // Destructure request body
        const reqBody = await request.json();
        const { feedbackByPatient, rating } = reqBody;

        // Find the appointment for which the patient is giving feedback
        const appointment = await Appointment.findById(appointmentId)
        if (!appointment) {
            return NextResponse.json({ message: "No appointment was found with the given appointment id", success: false }, { status: 404 });
        }

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

        // Find the user with the userId (i.e _id)
        const user = await User.findById(userId);

        // Find the doctor associated with the appointment
        const doctor = await Doctor.findById(appointment.doctorInfo);

        // Create an instance of feedback data model and save it to the database
        const newFeedback = new Feedback({ patient: feedbackByPatient, rating, userInfo: userId })
        const savedFeedback = await newFeedback.save();

        // Store the _id of the newly created feedback in the appointment, doctor, and user's document
        user.feedbacks.push(savedFeedback._id);
        appointment.feedback = savedFeedback._id;
        doctor.feedbacks.push(savedFeedback._id)
        await user.save();
        await appointment.save();
        await doctor.save();

        // Respond back to the user with a success status code 200
        return NextResponse.json({ message: "You have successfully given the feedback.", success: true }, { status: 200 })
    } catch (err: any) {
        // Return a JSON response for internal server error
        return NextResponse.json({ message: err.message, success: false }, { status: 500 });
    }
}
