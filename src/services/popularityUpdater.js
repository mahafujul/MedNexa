import mongoose from "mongoose";
import { Doctor } from "../models/Doctor"; // Adjust the import path as necessary
import schedule from 'node-schedule'

const MIN_FEEDBACKS = 10; // Minimum number of feedbacks to be considered for popularity
const MIN_AVERAGE_RATING = 4.5; // Minimum average rating to be considered popular

const updateDoctorPopularity = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

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
    mongoose.connection.close();
  } catch (error) {
    console.error("Error updating doctor popularity: ", error);
    mongoose.connection.close();
  }
};

// Schedule the function to run periodically
schedule.scheduleJob("* * * * *", ()=>{
    console.log("This function is running every minuts")
});

export default updateDoctorPopularity;
