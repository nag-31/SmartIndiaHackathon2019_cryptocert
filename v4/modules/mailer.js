"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function sendCertMail(receiver, link){

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let account = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: account.user, // generated ethereal user
      pass: account.pass // generated ethereal password
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"CryptoCerts" <cryprocredsone@gmail.com>', // sender address
    to: receiver, // list of receivers
    subject: "Your Certificate", // Subject line
    text: "Hello world?", // plain text body
    html: '<p>Dear user,</p><br><p><a href="' + link + '">Click here</a> to add the certificate to your account. Please do not share this link or email with anyone. Delete this email after adding the certificate to your account.</p></br><p>CryptoCerts Team.<p>' // html body
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);
   

  console.log("Message sent: %s", info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = {sendCertMail: sendCertMail};