const nodemailer = require("nodemailer");
const cron = require("node-cron");
const User = require("../models/user");

exports.addNotifyAll = async () => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "radhikaagarwal663@gmail.com",
      pass: "radhika@1210",
    },
  });

  const docs = await User.find();
  let emails = "";

  docs.map((doc) => {
    emails = emails + doc.email + ",";
  });
  console.log("all users", emails);
  let mailOptions = {
    from: "radhikaagarwal663@gmail.com",
    to: emails,
    subject: "Weather Update",
    text: "Thank you for subscribing",
  };
  cron.schedule(
    "0 10 * * *",
    () => {
      triggerEvent(mailOptions, transporter);
    },
    {
      scheduled: true,
      timezone: "Asia/Kolkata",
    }
  );
};
async function triggerEvent(mailOptions, transporter) {
  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
