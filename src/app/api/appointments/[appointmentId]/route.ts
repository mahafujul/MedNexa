import { NextRequest, NextResponse } from "next/server";
import { Appointment } from "@/models/appointmentModel";
import { connect } from "@/config/dbConfig";
import mongoose from "mongoose";
//Connect to the database
connect();

//Retrieve deatils about a specific appointment
export async function GET(request: NextRequest) {
  try {
    const ObjectId = mongoose.Types.ObjectId;
    // Retrieve the appointmentId from the URL
    const pathname = request.nextUrl.pathname.split("/");
    const appointmentId = pathname[pathname.length - 1];

    const appointment = await Appointment.aggregate([
      {
        $match: {
          _id: new ObjectId(appointmentId),
        },
      },
      {
        $project: {
          feedbackDone: 1,
        },
      },
    ]);

    if (!appointment.length) {
      return NextResponse.json(
        {
          message: "No appointment found with the given appointmentId",
          success: false,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { appointment: appointment[0], success: true },
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
