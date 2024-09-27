// Import necessary modules and dependencies
import { NextRequest, NextResponse } from "next/server"; // Next.js server-side request and response modules
import { Appointment } from "@/models/appointmentModel"; // Import Appointment model

// Define the PUT endpoint to mark an appointment as completed
export async function PUT(request: NextRequest) {
    try {
        // Retrieve the appointmentId from the request URL
        const pathname = request.nextUrl.pathname.split('/');
        const appointmentId = pathname[pathname.length - 1];

        // Find the appointment by its ID and mark it as completed
        const appointmentAfterUpdate = await Appointment.findByIdAndUpdate(appointmentId, { completed: true });

        // Check if the appointment was found and updated
        if (!appointmentAfterUpdate) {
            // Return a JSON response indicating no appointment found with the given appointment Id
            return NextResponse.json({ message: "No appointment found with the given appointment Id.", success: false }, { status: 400 });
        }

        // Return success response indicating the appointment has been successfully completed
        return NextResponse.json({ message: "Appointment successfully completed.", success: true }, { status: 200 });
    } catch (err: any) {
        // Return a JSON response for internal server error
        return NextResponse.json({ message: err.message, success: false }, { status: 500 });
    }
}
