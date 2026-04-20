const express = require("express");
const nodemailer = require("nodemailer");
const Location = require("../models/Location");

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

router.post("/save-location", async (req, res) => {
  try {
    const { latitude, longitude, time } = req.body;

    const newLocation = new Location({
      latitude,
      longitude,
      time
    });

    await newLocation.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: "New User Location",
      html: `
        <h2>New Location Received</h2>
        <p><b>Latitude:</b> ${latitude}</p>
        <p><b>Longitude:</b> ${longitude}</p>
        <p><b>Time:</b> ${time}</p>
        <a href="https://www.google.com/maps?q=${latitude},${longitude}">
          Open Map
        </a>
      `
    });

    res.json({
      success: true,
      message: "Location saved and email sent"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;