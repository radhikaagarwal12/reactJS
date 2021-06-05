const weatherAPI = require("./weatherAPI");
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const notifier = require("./notifier");

const User = require("../models/user");

router.get("/", (req, res) => {
  //console.log("search Id", req.query.searchId);
  weatherAPI
    .getListRates(req.query.searchId)
    .then((response) => {
      
      res.status(201).json(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
});
router.post("/notify", async (req, res) => {
  const { username, email } = req.body;
  const user = new User({
    name: username,
    email: email,
  });
  const resp = await user.save();
  console.log(resp);
  console.log("saved");

  let mailOptions = {
    from: "radhikaagarwal663@gmail.com",
    to: email,
    subject: "Weather Update",
    text: "Thank you for subscribing",
  };
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "radhikaagarwal663@gmail.com",
      pass: "radhika@1210",
    },
  });

  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(401).json({ message: "Wrong Email Address" });
    } else {
      console.log("Email sent: " + info.response);
      notifier.addNotifyAll();
      res.status(201).json({ message: "User added to Notifications" });
    }
  });
});

module.exports = router;
