// POST /api/feedback: Submit feedback and ratings for doctors and the application.

// Import Next.js server functions and necessary models
import { NextRequest, NextResponse } from "next/server";
import { Feedback } from "@/models/feedbackModel";
import { Appointment } from "@/models/appointmentModel";
import { connect } from "@/config/dbConfig";

// Connect to the database
connect();

// Endpoint to submit feedback and ratings for doctors
export async function POST(request: NextRequest) {
  try {
    // Retrieve the appointmentId from the URL
    const pathname = request.nextUrl.pathname.split("/");
    const appointmentId = pathname[pathname.length - 1];

    // Destructure request body to extract patient feedback and rating
    const reqBody = await request.json();
    const { patientFeedback, rating } = reqBody;

    // Find the appointment for which the patient is giving feedback
    const appointment = await Appointment.findById(appointmentId).populate([
      "userInfo",
      "doctorInfo",
    ]);

    if (!appointment) {
      return NextResponse.json(
        {
          message: "No appointment found with the given appointment Id.",
          success: false,
        },
        { status: 404 }
      );
    }

    // Check whether feedback is already given for this appointment
    if (appointment.feedbackDone) {
      return NextResponse.json(
        { message: "Feedback is already given.", success: false },
        { status: 400 }
      );
    }

    // Create feedback document
    const feedback = new Feedback({
      patient: patientFeedback,
      doctorInfo: appointment.doctorInfo._id,
      userInfo: appointment.userInfo._id,
      rating,
    });

    // Save the feedback document to the database
    await feedback.save();

    // Update the doctor's feedback and rating info
    appointment.doctorInfo.feedbacks.push(feedback._id);
    appointment.doctorInfo.numberOfFeedback =
      (appointment.doctorInfo.numberOfFeedback || 0) + 1;
    appointment.doctorInfo.sumOfRatings =
      (appointment.doctorInfo.sumOfRatings || 0) + rating;
    await appointment.doctorInfo.save();

    // Add the feedback to the user
    appointment.userInfo.feedbacks.push(feedback._id);
    await appointment.userInfo.save();

    // Mark feedback as done for the appointment
    appointment.feedbackDone = true;
    appointment.feedback = feedback._id;
    await appointment.save();

    // Respond back to the user with a success status code 200
    return NextResponse.json(
      { message: "Feedback submitted successfully.", success: true },
      { status: 200 }
    );
  } catch (err: any) {
    // Log the error to the server console for debugging
    console.error("Error submitting feedback:", err);

    // Return a JSON response for internal server error
    return NextResponse.json(
      { message: err.message, success: false },
      { status: 500 }
    );
  }
}
