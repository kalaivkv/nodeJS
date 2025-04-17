const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kalaivkv24@gmail.com",       
    pass: ""             
  }
});

let mailOptions = {
  from: "kalaivkv24@gmail.com",
  to: "23pa06@psgtech.ac.in",                           
  cc: ["kalaivkv24@gmail.com", "kalaivkv@gmail.com"],   
  bcc: ["23pa06@psgtech.ac.in"],                             
  subject: "Team SMTP Test",
  text: "Hi team, This email was sent using Node.js and Nodemailer."
};

transporter.sendMail(mailOptions, function(error, info) {
  if (error) {
    console.log("Error:", error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
