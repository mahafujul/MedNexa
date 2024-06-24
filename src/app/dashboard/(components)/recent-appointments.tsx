import React from "react";

export function RecentAppointments({ allAppointments }: any) {
  return (
    <div className="space-y-8">
      {allAppointments?.length > 1 ? (
        <div className="grid grid-cols-4 gap-4">
          {allAppointments
            .slice(-4)
            .reverse()
            .map((appointment: any, index: number) => (
              <React.Fragment key={index}>
                <div className="ml-4 space-y-1 w-full">
                  <p className="text-xs md:text-sm font-medium leading-none">
                    {`${
                      appointment?.doctorInfo?.firstName ||
                      appointment?.userInfo?.firstName
                    } ${
                      appointment?.doctorInfo?.lastName ||
                      appointment?.userInfo?.lastName
                    }`}
                  </p>
                </div>
                <div className="font-medium">
                  <p
                    className={`flex justify-center text-xs md:text-sm text-muted-foreground p-1 rounded-sm ${
                      appointment.completed ? "bg-green-200" : "bg-red-200"
                    }`}
                  >
                    {appointment.completed ? "Completed" : "Pending"}
                  </p>
                </div>
                <div className="text-xs md:text-sm font-medium flex justify-center">
                  {new Date(appointment.date).toLocaleDateString()}
                </div>
                <div className="text-xs md:text-sm font-medium flex justify-center">
                  {appointment.selectedTimeSlot}
                </div>
              </React.Fragment>
            ))}
        </div>
      ) : (
        <div className="text-gray-500">No appointments...</div>
      )}
    </div>
  );
}
