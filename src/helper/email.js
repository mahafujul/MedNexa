import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});
/**
 * Sends a feedback request email to the user.
 * @param {Object} user - The user object containing user details.
 * @param {Object} doctor - The doctor object containing doctor details.
 * @param {string} feedbackLink - The link to the feedback form.
 * @returns {Promise<void>}
 */
export const sendFeedbackEmail = async (user, doctor, feedbackLink) => {
  const mailOptions = {
    from: process.env.EMAIL, // sender address
    to: user.email, // receiver email
    subject: "We value your feedback",
    text: `Dear ${user.firstName},

Your appointment with Dr. ${doctor.firstName} ${doctor.lastName} has been completed. We would love to hear your feedback.

Please provide your feedback by clicking on the following link:
${feedbackLink}

Thank you!
`,
  };

  await transporter.sendMail(mailOptions);
};
