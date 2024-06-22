// Import the necessary modules
import React from "react";

// Define the RecentAppointments component, accepting allAppointments as a prop
export function RecentAppointments({ allAppointments }: any) {
  return (
    <div className="space-y-5">
      {allAppointments?.length > 1 ? (
        // Map through the last 4 appointments in reverse order
        allAppointments
          .slice(-4)
          .reverse()
          .map((appointment: any, index: number) => (
            // Each appointment is represented as a div with a unique key
            <div key={index} className="flex items-center gap-4">
              <div className="ml-4 space-y-1">
                {/* Display the first and last name of the doctor or user */}
                <p className="text-sm font-medium leading-none">
                  {`${
                    appointment?.doctorInfo?.firstName || // If doctorInfo is available, use the doctor's first name
                    appointment?.userInfo?.firstName // Otherwise, use the user's first name
                  } ${
                    appointment?.doctorInfo?.lastName || // If doctorInfo is available, use the doctor's last name
                    appointment?.userInfo?.lastName // Otherwise, use the user's last name
                  }`}
                </p>
              </div>
              <div className="ml-auto font-medium">
                {/* Display the status of the appointment as 'Completed' or 'Pending' */}
                <p
                  className={`text-sm text-muted-foreground p-1 rounded-sm ${
                    appointment.completed ? "bg-green-200" : "bg-red-200"
                  }`}
                >
                  {appointment.completed ? "Completed" : "Pending"}
                </p>
              </div>
              <div className="ml-auto text-sm font-medium">
                {/* Display the date of the appointment */}
                {new Date(appointment.date).toLocaleDateString()}
              </div>
              <div className="ml-auto text-sm font-medium">
                {/* Display the selected time slot of the appointment */}
                {appointment.selectedTimeSlot}
              </div>
            </div>
          ))
      ) : (
        // Display a message if there are no appointments
        <div className="text-gray-500">No appointments...</div>
      )}
    </div>
  );
}
