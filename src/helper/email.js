import nodemailer from "nodemailer";

// Create a Nodemailer transporter using SMTP with Gmail
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use SSL
  auth: {
    user: process.env.EMAIL, // Email address from environment variables
    pass: process.env.EMAIL_PASSWORD, // Email password from environment variables
  },
});

/**
 * Sends a feedback request email to the user.
 *
 * @param {Object} user - The user object containing user details.
 * @param {string} user.email - The email address of the user.
 * @param {string} user.firstName - The first name of the user.
 * @param {Object} doctor - The doctor object containing doctor details.
 * @param {string} doctor.firstName - The first name of the doctor.
 * @param {string} doctor.lastName - The last name of the doctor.
 * @param {string} feedbackLink - The link to the feedback form.
 * @returns {Promise<void>} - A promise that resolves when the email is sent.
 */
export const sendFeedbackEmail = async (user, doctor, feedbackLink) => {
  // Define the email options
  const mailOptions = {
    from: process.env.EMAIL, // Sender address
    to: user.email, // Receiver email
    subject: "We value your feedback", // Subject line
    text: `Dear ${user.firstName},

Your appointment with Dr. ${doctor.firstName} ${doctor.lastName} has been completed. We would love to hear your feedback.

Please provide your feedback by clicking on the following link:
${feedbackLink}

Thank you!
`, // Email body
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};

/**
 * Sends an appointment confirmation email to the user.
 *
 * @param {string} to - The email address of the user.
 * @param {Object} appointmentDetails - The object containing appointment details.
 * @param {string} appointmentDetails.doctorName - The name of the doctor.
 * @param {string} appointmentDetails.date - The date of the appointment.
 * @param {string} appointmentDetails.selectedTimeSlot - The time slot of the appointment.
 * @param {string} appointmentDetails.address - The address of the appointment location.
 * @param {string} appointmentDetails.contact - The contact information of the doctor.
 * @returns {Promise<void>} - A promise that resolves when the email is sent.
 */
export async function sendAppointmentConfirmationEmail(to, appointmentDetails) {
  // Define the email options
  const mailOptions = {
    from: process.env.EMAIL, // Sender address
    to, // Receiver email
    subject: "Appointment Confirmation", // Subject line
    text: `Your appointment has been booked successfully. Here are the details:

Doctor: ${appointmentDetails.doctorName}
Date: ${appointmentDetails.date}
Time: ${appointmentDetails.selectedTimeSlot}

Address: ${appointmentDetails.address}
Contact: ${appointmentDetails.contact}`, // Email body
  };

  // Send the email
  await transporter.sendMail(mailOptions);
}
