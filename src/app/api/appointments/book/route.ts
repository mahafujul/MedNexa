// Import necessary modules and dependencies
import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/config/dbConfig"; // Import the database connection function
import { Appointment } from "@/models/appointmentModel"; // Import the Appointment model
import { User } from "@/models/userModel"; // Import the User model
import { Doctor } from "@/models/doctorModel";
import { authOptions } from "@/app/api/auth/[...nextauth]/options"; // Import NextAuth options
import { getServerSession } from "next-auth/next"; // Import the getServerSession function from NextAuth
import { sendAppointmentConfirmationEmail } from "@/helper/email";

// Connect to the database
connect();

// Endpoint to book an appointment
export async function POST(request: NextRequest) {
  try {
    // Retrieve the session information
    const session = await getServerSession(authOptions);
    const userId = session?.user?.userId;

    // Retrieve data from request body
    const reqBody = await request.json();
    const { doctorId, date, selectedTimeSlot, note } = reqBody;

    // Find the user with the userId that we retrieved from the session
    const user = await User.findOne({ _id: userId });

    // Check if the user exists who is trying to create the appointment
    if (!user) {
      return NextResponse.json(
        { message: "No user found with the given userId", success: false },
        { status: 400 }
      );
    }

    //Find the doctor with the doctorId that we retrived from the request body
    const doctor = await Doctor.findOne({ _id: doctorId });

    //Check if the doctor exist to whom th user/patiant is trying to book an appointment
    if (!doctor) {
      return NextResponse.json(
        {
          message: "No doctor found with the given doctorId",
          success: false,
        },
        { status: 400 }
      );
    }

    // Check if the selected time slot is available
    const availableSlots = doctor.availableSlots.get(date);
    if (!availableSlots || !availableSlots.includes(selectedTimeSlot)) {
      return NextResponse.json(
        { message: "Selected time slot is not available", success: false },
        { status: 400 }
      );
    }

    // Create the appointment
    const appointment = new Appointment({
      doctorInfo: doctorId,
      userInfo: userId,
      date,
      selectedTimeSlot,
      note,
    });

    // Save the newly created appointment
    await appointment.save();

    // Add the newly created appointment to the 'allAppointments' array of the user
    user.allAppointments.push(appointment._id);

    // Save the user after adding the _id of the appointment
    await user.save();

    // Update doctor's available slots
    doctor.availableSlots.set(
      date,
      availableSlots.filter((slot: any) => slot !== selectedTimeSlot)
    );

    // add the newly created appointment to the 'allAppointments' array of the doctor
    doctor.allAppointments.push(appointment._id);

    // Save the doctor after adding the _id of the appointment and updating doctor's available slots
    await doctor.save();

    // Send appointment confirmation email
    await sendAppointmentConfirmationEmail(user.email, {
      doctorName: `${doctor.firstName} ${doctor.lastName}`,
      date,
      selectedTimeSlot,
      address: doctor.address,
      contact: doctor.phoneNumber,
    });

    // Respond with a success message
    return NextResponse.json(
      {
        message: `Appointment booked successfully!`,
      },
      { status: 201 }
    );
  } catch (err: any) {
    // Return a JSON response for internal server error
    return NextResponse.json(
      { message: err.message, success: false },
      { status: 500 }
    );
  }
}
