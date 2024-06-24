// Import necessary modules and dependencies
import { NextRequest, NextResponse } from "next/server"; // Next.js server-side request and response modules
import { Appointment } from "@/models/appointmentModel"; // Import Appointment model
import { sendFeedbackEmail } from "@/helper/email";

// Define the PUT endpoint to mark an appointment as completed
export async function PUT(request: NextRequest) {
  try {
    // Retrieve the appointmentId from the request URL
    const pathname = request.nextUrl.pathname.split("/");
    const appointmentId = pathname[pathname.length - 1];

    // Find and update the appointment
    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { completed: true },
      { new: true }
    )
      .populate("userInfo")
      .populate("doctorInfo");

    if (!appointment) {
      return NextResponse.json(
        {
          message: "No appointment found with the given appointment Id.",
          success: false,
        },
        { status: 400 }
      );
    }

    // Send feedback email
    const user = appointment.userInfo;
    const doctor = appointment.doctorInfo;

    const feedbackLink = `${process.env.BASE_URL}/feedback/${appointmentId}`; // Generate the actual feedback link

    await sendFeedbackEmail(user, doctor, feedbackLink);

    // Return success response indicating the appointment has been successfully completed
    return NextResponse.json(
      { message: "Appointment successfully completed.", success: true },
      { status: 200 }
    );
  } catch (err: any) {
    // Return a JSON response for internal server error
    return NextResponse.json(
      { message: err.message, success: false },
      { status: 500 }
    );
  }
}
