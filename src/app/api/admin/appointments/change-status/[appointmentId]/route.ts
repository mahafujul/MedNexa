// Import necessary modules and dependencies
import { NextRequest, NextResponse } from "next/server"; // Next.js server-side request and response modules
import { Appointment } from "@/models/appointmentModel"; // Import Appointment model

// Define the PUT endpoint to change the status of a specific appointment.
export async function PUT(request: NextRequest) {
  try {
    // Retrieve the appointmentId from the request URL
    const pathname = request.nextUrl.pathname.split("/");
    const appointmentId = pathname[pathname.length - 1].toString();

    // Find the appointment by its ID and toggle its completion status
    const appointment = await Appointment.findOne({ _id: appointmentId });

    // Check if the appointment was found
    if (!appointment) {
      // Return a JSON response indicating no appointment found with the given appointment Id
      return NextResponse.json(
        {
          message: "No appointment found with the given appointment Id.",
          success: false,
        },
        { status: 400 }
      );
    }

    // Toggle the completed status of the appointment
    appointment.completed = !appointment.completed;

    // Save the updated appointment
    await appointment.save();

    // Return success response indicating the status of the appointment has been successfully changed
    return NextResponse.json(
      {
        message: "Status of the appointment has been successfully changed.",
        success: true,
      },
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
