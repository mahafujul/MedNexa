export function RecentAppointments({ allAppointments }: any) {

  return (
    <div className="space-y-8">
      {allAppointments?.length > 0 ? (
        allAppointments.slice(0, 4).map((appointment: any, index: number) => (
          <div key={index} className="flex items-center gap-4">
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {`${appointment.doctorInfo.firstName} ${appointment.doctorInfo.lastName}`}
              </p>
            </div>
            <div className="ml-auto font-medium">
              <p className="text-sm text-muted-foreground">
                {appointment.status}
              </p>
            </div>
            <div className="ml-auto font-medium">
              {new Date(appointment.date).toLocaleDateString()}
            </div>
          </div>
        ))
      ) : (
        <div className="text-gray-500">No appointments...</div>
      )}
    </div>
  );
}
