import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

export const getUserAppointmentsAggregation = (userId) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  return [
    // Match the user by userId
    { $match: { _id: new ObjectId(userId) } },

    // Lookup appointments
    {
      $lookup: {
        from: "appointments",
        localField: "allAppointments",
        foreignField: "_id",
        as: "allAppointments",
      },
    },

    // Project fields and categorize appointments
    {
      $project: {
        username: 1,
        email: 1,
        firstName: 1,
        lastName: 1,
        mobileNumber: 1,
        role: 1,
        seenNotifications: 1,
        unseenNotifications: 1,
        feedbacks: 1,
        createdAt: 1,
        updatedAt: 1,
        forgotPasswordToken: 1,
        forgotPasswordTokenExpiry: 1,
        allAppointments: 1,
        todaySessions: {
          $filter: {
            input: "$allAppointments",
            as: "appointment",
            cond: {
              $and: [
                { $gte: ["$$appointment.date", today] },
                { $lt: ["$$appointment.date", tomorrow] },
              ],
            },
          },
        },
        upcomingSessions: {
          $filter: {
            input: "$allAppointments",
            as: "appointment",
            cond: { $gte: ["$$appointment.date", tomorrow] },
          },
        },
      },
    },
  ];
};
