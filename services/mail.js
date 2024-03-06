import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()
const transporter = nodemailer.createTransport({
  host: "smtp.forwardemail.net",
  port: 465,
  secure: true,
service: "Gmail",
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.mail_Id,
    pass: process.env.mail_password
  }
});

// async..await is not allowed in global scope, must use a wrapper
export async function main(toMail,subject,content) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "akjtradersramnad@gmail.com", // sender address
    to: toMail, // list of receivers
    subject: subject, // Subject line
    text: "Hello world?", // plain text body
    html: content, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
}

main().catch(console.error);
