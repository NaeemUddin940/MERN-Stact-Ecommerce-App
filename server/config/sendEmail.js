import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

export default async function sendEmail({ sendTo, subject, text, html }) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: sendTo,
      subject,
      text,
      html,
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error Sending email: ", error);
    return { success: false, error: error.message };
  }
}
