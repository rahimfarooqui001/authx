

import dotenv from "dotenv";
dotenv.config();

import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendMail = async ({ to, subject, html }) => {
  const msg = {
    to,
    from: { 
    email: process.env.FROM_EMAIL, 
    name: "AuthX" 
  },
    subject,
    html,
  };

  const response = await sgMail.send(msg);
  return response;
};
