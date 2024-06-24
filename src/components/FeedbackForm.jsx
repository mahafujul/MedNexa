import { useState } from "react";
import axios from "axios";
import StarRating from "./StarRating";

const FeedbackForm = ({ appointmentId }) => {
  const [rating, setRating] = useState(0);
  const [patientFeedback, setPatientFeedback] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`/api/feedback/${appointmentId}`, {
        params: {
          appointmentId,
        },
        rating,
        patientFeedback,
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error submitting feedback");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
        Provide Your Feedback
      </h2>
      {message && (
        <p
          className={`text-center mb-4 ${
            message.includes("Error") ? "text-red-500" : "text-green-500"
          }`}
        >
          {message}
        </p>
      )}
      <div className="mb-4">
        <label htmlFor="rating" className="block text-gray-700">
          Rating:
        </label>
        <StarRating rating={rating} setRating={setRating} />
      </div>
      <div className="mb-4">
        <label htmlFor="patientFeedback" className="block text-gray-700">
          Your Feedback:
        </label>
        <textarea
          id="patientFeedback"
          value={patientFeedback}
          onChange={(e) => setPatientFeedback(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg resize-none"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-blue-700"
      >
        Submit Feedback
      </button>
    </form>
  );
};

export default FeedbackForm;
