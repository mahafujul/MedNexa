import { connect } from "@/config/dbConfig";
import { User } from "@/models/userModel"; // Import the User model
import { Appointment } from "@/models/appointmentModel"; // Import the Appointment model
import { authOptions } from "@/app/api/auth/[...nextauth]/options"; // Import NextAuth options
import { getServerSession } from "next-auth/next"; // Import the getServerSession function from NextAuth
import { NextResponse } from "next/server";

//Connect to the database
connect();

//Endpoint to get all the appointments of a specific user
export async function GET() {
  try {
    // Retrieve the session information
    const session = await getServerSession(authOptions);
    const userId = session?.user?.userId;

    // Find the user with the userId that we retrieved from the session
    const user = await User.findOne({ _id: userId }).populate({
      path: "allAppointments",
      populate: {
        path: "doctorInfo",
      },
    });

    // Check if the user exists who is trying to create the appointment
    if (!user) {
      return NextResponse.json(
        { message: "No user is found with the given userId", success: false },
        { status: 400 }
      );
    }

    // Respond with a success message
    return NextResponse.json(
      {
        message: `Appointment successfully retrieved.`,
        appointments: user?.allAppointments,
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
