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

    // Unwind appointments to populate doctorInfo
    { $unwind: { path: "$allAppointments", preserveNullAndEmptyArrays: true } },

    // Lookup doctor info
    {
      $lookup: {
        from: "doctors",
        localField: "allAppointments.doctorInfo",
        foreignField: "_id",
        as: "allAppointments.doctorInfo",
      },
    },

    // Add a single doctorInfo object back to each appointment
    {
      $addFields: {
        "allAppointments.doctorInfo": {
          $arrayElemAt: ["$allAppointments.doctorInfo", 0],
        },
      },
    },

    // Group back to reconstruct allAppointments array
    {
      $group: {
        _id: "$_id",
        username: { $first: "$username" },
        email: { $first: "$email" },
        firstName: { $first: "$firstName" },
        lastName: { $first: "$lastName" },
        mobileNumber: { $first: "$mobileNumber" },
        role: { $first: "$role" },
        feedbacks: { $first: "$feedbacks" },
        allAppointments: { $push: "$allAppointments" },
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
        feedbacks: 1,
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
