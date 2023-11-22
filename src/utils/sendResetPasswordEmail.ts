import sendEmail from "./sendEmail";

interface EmailParams {
  to: string;
  subject: string;
  html: string;
}

interface SendResetPasswordEmailParams {
  name: string;
  email: string;
  token: string;
  origin: string;
}

const sendResetPasswordEmail = async ({
  name,
  email,
  token,
  origin,
}: SendResetPasswordEmailParams): Promise<void> => {
  const resetURL = `${origin}/user/reset-password?token=${token}&email=${email}`;
  const message = `<p>Please reset password by clicking on the following link : 
  <a href="${resetURL}">Reset Password</a></p>`;

  const emailParams: EmailParams = {
    to: email,
    subject: "Reset Password", // Default subject
    html: `<h4>Hello, ${name}</h4>
   ${message}
   `,
  };

  await sendEmail(
    "recipient@example.com",
    "Subject line",
    "<p>Email content</p>"
  );
};

export default sendResetPasswordEmail;
