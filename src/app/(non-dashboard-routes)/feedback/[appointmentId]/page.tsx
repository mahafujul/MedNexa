"use client";
import FeedbackForm from "@/components/FeedbackForm";
import { useState, useEffect } from "react";
import axios from "axios";
const FeedbackPage = ({ params }: any) => {
  const appointmentId = params.appointmentId;
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackDone, setFeedbackDone] = useState(false);
  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/appointments/${appointmentId}`, {
          params: { appointmentId },
        });
        if (response.data.appointment.feedbackDone) {
          setFeedbackDone(true);
        }
      } catch (error) {
        console.error("Error fetching appointment deatils:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center h-screen items-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (feedbackDone) {
    return (
      <div className="flex justify-center h-screen items-center">
        <h1 className="text-3xl font-semibold text-gray-700 mb-4">
          Feedback Already Given For The Appointment
        </h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center flex-col items-center h-screen w-full">
      <h1 className="text-3xl font-semibold text-gray-700 mb-4">
        Feedback Page
      </h1>
      {appointmentId && <FeedbackForm appointmentId={appointmentId} />}
    </div>
  );
};

export default FeedbackPage;
