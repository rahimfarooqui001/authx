

import dotenv from "dotenv";
dotenv.config({ path: "./.env" });  // force loading here

import nodemailer from "nodemailer";

// console.log("MAIL.JS ENV CHECK:");
// console.log("SMTP_HOST:", process.env.SMTP_HOST);
// console.log("SMTP_PORT:", process.env.SMTP_PORT);
// console.log("SMTP_USER:", process.env.SMTP_USER);
// console.log("SMTP_PASS:", process.env.SMTP_PASS ? "OK (hidden)" : "MISSING");
// console.log("FROM_EMAIL:", process.env.FROM_EMAIL);
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  tls: {
    rejectUnauthorized: false
  },
  family: 4
});


export const sendMail = async ({ to, subject, html, text, attachments }) => {
  const from = process.env.FROM_EMAIL;
  const info = await transporter.sendMail({ from, to, subject, html, text, attachments });
  return info;
};