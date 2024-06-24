import { Doctor } from "../models/doctorModel"; // Adjust the import path as necessary
import { connect } from "../config/dbConfig";
// Schedule the function to run periodically
import schedule from "node-schedule";
const MIN_FEEDBACKS = 10; // Minimum number of feedbacks to be considered for popularity
const MIN_AVERAGE_RATING = 4.5; // Minimum average rating to be considered popular

export const updateDoctorPopularity = async () => {
  try {
    //Connect to the database
    connect();

    const doctors = await Doctor.find();

    for (const doctor of doctors) {
      const { numberOfFeedback, sumOfRatings } = doctor;
      const averageRating =
        numberOfFeedback > 0 ? sumOfRatings / numberOfFeedback : 0;

      if (
        numberOfFeedback >= MIN_FEEDBACKS &&
        averageRating >= MIN_AVERAGE_RATING
      ) {
        doctor.popular = true;
      } else {
        doctor.popular = false;
      }

      await doctor.save();
    }

    console.log("Doctor popularity updated successfully.");
  } catch (error) {
    console.error("Error updating doctor popularity: ", error);
  }
};

// // Runs every day at midnight
schedule.scheduleJob("0 0 * * *", updateDoctorPopularity);

updateDoctorPopularity(); // Run once at the start
