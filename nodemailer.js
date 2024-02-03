const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const SENDEMAIL = async (mailDetails, callback) => {
  try {
    const info = await transporter.sendMail(mailDetails);
    callback(info);
  } catch (e) {
    console.log(e);
  }
};

const HTML_TEMPLATE = (text) => {
  return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>NodeMailer Email Template</title>
          <style>
            .container {
              width: 100%;
              height: 100%;
              padding: 20px;
              background-color: #f4f4f4;
            }
            .email {
              width: 80%;
              margin: 0 auto;
              background-color: #fff;
              padding: 20px;
            }
            .email-header {
              background-color: #333;
              color: #fff;
              padding: 20px;
              text-align: center;
            }
            .email-body {
              padding: 20px;
            }
            .email-footer {
              background-color: #333;
              color: #fff;
              padding: 20px;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="email">
              <div class="email-header">
                <h1>OTP for reset</h1>
              </div>
              <div class="email-body">
                <p>${text}</p>
              </div>
              <div class="email-footer">
                <p>EMAIL FOOTER</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
};

// const message = "Hi there, you were emailed through NodeMailer";
// const option = {
//     from:process.env.EMAIL,
//     to:'raj.ayush@scaler.com',
//     subject:"Send email in Node Js with Nodemailer using Gmail account",
//     text:message,
//     html:HTML_TEMPLATE(message)
// }

// SENDEMAIL(option, (info)=>{
//     console.log("Email sent successfully!")
//     console.log("Message Id",info.messageId);
// })

async function emailBuilder(to, subject, text) {
  try {
    const options = {
      from: process.env.EMAIL,
      to: to,
      subject: subject,
      text: text,
      html: HTML_TEMPLATE(text),
    };
    SENDEMAIL(options, (info) => {
      console.log("Email sent successfully!");
      console.log("Message Id", info.messageId);
    });
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  SENDEMAIL,
  HTML_TEMPLATE,
  emailBuilder
};
