import nodemailer from "nodemailer";
import nodemailerConfig from "./nodemailerConfig";

const sendEmail = async (to: string, subject: string, html: string) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport(nodemailerConfig);

  return transporter.sendMail({
    from: '"Coding Addict" <codingaddict@gmail.com>', // sender address
    to,
    subject,
    html,
  });
};

export default sendEmail;
