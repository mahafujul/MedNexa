import { NextRequest, NextResponse } from "next/server";
import { Appointment } from "@/models/appointmentModel";
import { User } from "@/models/userModel";
import { Doctor } from "@/models/doctorModel";
import { connect } from "@/config/dbConfig";

// Connect to the database
connect();

export async function GET(request: NextRequest) {
  try {
    // Check total numbers of users
    const totalUsersResult = await User.aggregate([
      {
        $count: "totalNumberOfUsers",
      },
    ]);
    const totalNumberOfUsers = totalUsersResult[0]?.totalNumberOfUsers || 0;

    // Combine the total number of doctors and total number of pending applications in one aggregation
    const doctorStatsResult = await Doctor.aggregate([
      {
        $facet: {
          totalDoctors: [{ $count: "totalNumberOfDoctors" }],
          pendingApplications: [
            { $match: { pending: true } },
            { $count: "totalNumberOfPendingApplications" },
          ],
        },
      },
    ]);

    const totalNumberOfDoctors =
      doctorStatsResult[0].totalDoctors[0]?.totalNumberOfDoctors || 0;
    const totalNumberOfPendingApplications =
      doctorStatsResult[0].pendingApplications[0]
        ?.totalNumberOfPendingApplications || 0;

    // Check total number of appointments
    const totalAppointmentsResult = await Appointment.aggregate([
      {
        $count: "totalNumberOfAppointments",
      },
    ]);
    const totalNumberOfAppointments =
      totalAppointmentsResult[0]?.totalNumberOfAppointments || 0;

    // Return the aggregated results
    return NextResponse.json(
      {
        totalNumberOfUsers,
        totalNumberOfDoctors,
        totalNumberOfPendingApplications,
        totalNumberOfAppointments,
        success: true
      },
      { status: 200 }
    );
  } catch (err: any) {
    // Respond back with internal server error status code 500
    return NextResponse.json(
      { message: "Internal Server Error", error: err.message, success: false },
      { status: 500 }
    );
  }
}
