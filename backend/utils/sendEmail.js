import nodeMailer from "nodemailer";
// console.log(
//   "nodeMailer:",
//   nodeMailer.createTestAccount().then((email) => {
//     console.log(email);
//   })
// );

export const sendEmail = async ({ email, subject, message }) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: process.env.SMTP_SERVICE,
    auth: { user: process.env.SMTP_MAIL, pass: process.env.SMTP_PASSWORD },
  });

  const mailOption = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject,
    text: message,
  };

  await transporter.sendMail(mailOption);
};
