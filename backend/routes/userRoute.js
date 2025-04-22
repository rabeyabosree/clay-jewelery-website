const express = require("express");
const User = require("../models/userModel");
const nodemailer = require('nodemailer');
const bcrypt = require("bcryptjs")
const router = express.Router();
const generateToken = require("../middleware/genereteToken")
const  verifyToken = require("../middleware/verifyToken")

router.post("/register", async (req, res) => {
  try {
    const { userName, email, password, role } = req.body;
    console.log({ userName, email, password, role })
    // Validate required fields
    if (!userName || !email || !password) {
      return res.status(400).send({ message: "All fields are required" });
    }

    // Check if the user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create the new user
    const newUser = await User.create({
      userName: userName,
      email: email,
      password: hashPassword,
      role: role || "user", // Default role to 'user' if not provided
    })

    // Respond with success message and user info (excluding password)
    res.status(200).send({
      message: "Registration successful",
      user:newUser
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).send({ message: "All fields are required" });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(402).send({ message: "Invalid password" });
    }
    const token = generateToken(user);

    res.cookie("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 86400000
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.userName,
        email: user.email,
        // Add any other user fields you need here
      }

    });

  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Server error" });
  }
});

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  console.log(email)

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Generate 6-digit code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Set expiry time (10 mins)
    user.resetPasswordCode = resetCode;
    user.resetCodeExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    // Send email (Nodemailer setup)
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
console.log(resetCode)
    await transporter.sendMail({
      from: 'claymagic@gmail.com',
      to: user.email,
      subject: 'Your Password Reset Code',
      html: `<p>Your reset code is: <b>${resetCode}</b></p>`,
    });

    res.status(200).json({ message: 'Reset code sent to email' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});


router.post('/verify-code', async (req, res) => {
  const { email, code } = req.body;
  console.log({ email, code })

  try {
    const user = await User.findOne({ email });

    if (!user || user.resetPasswordCode !== code || user.resetCodeExpires < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired code' });
    }

    res.status(200).json({ message: 'Code verified successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});


router.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordCode = null;
    user.resetCodeExpires = null;

    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.post('/activity', verifyToken, async (req, res) => {
  try {
      const { action, details } = req.body;
      const newActivity = new Activity({
          userId: req.user.userId, // token theke user ID
          action,
          details,
      });
      await newActivity.save();
      res.status(201).send({ message: 'Activity created successfully', activity: newActivity });
  } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Server error' });
  }
});



module.exports = router;