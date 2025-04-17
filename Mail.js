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
  subject: "SMTP Testing Mail",
  text: "This email was sent using SMTP with Nodemailer in Node.js"
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log("Error:", error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
