import nodemailer from 'nodemailer';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const emailOwner = process.env.EMAIL_OWNER;

const passOwner = process.env.PASS_OWNER;
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: emailOwner,
    pass: passOwner,
  },
});

export function sendVerificationEmail(userEmail, verificationToken) {
  const mailOptions = {
    from: 'LangChainAcademy',
    to: userEmail,
    subject: 'Email Verification',
    html: `
    <p>This is an automated message. Please do not reply to it. If you are not the author of this message, please contact the sender.</p>
    <p>Click the following link to verify your email in the LangChain Academy service: <a href="http://localhost:5173/LangChain-LearningPlatform/verify/${verificationToken}">Verify Email</a></p>
    <p>Test LangChainAcademy</p>
  `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

export function generateVerificationToken() {
  return crypto.randomBytes(20).toString('hex');
}
