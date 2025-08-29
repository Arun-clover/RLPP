const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/logSchema");
const NewToken = require("../models/newToken");
const jwt = require("jsonwebtoken");

// Register route
router.post("/registration", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(301).json({ message: "Please fill all fields" });
    }
    // Check if user already exists
    const checkuser = await User.findOne({ username });
    const checkemail = await User.findOne({ email });
    if (checkemail && checkuser) {
      return res.status(302).json({ message: "User already exists" });
    }
    // Hash the password
    const passwordhash = await bcrypt.hash(password, 10);
    // Create new user
    const newUser = new User({
      username,
      email,
      password: passwordhash,
    });
    // Save user to database
    await newUser.save();
    res.status(200).json({ message: "Registration successful" });
    console.log("Registration successful");
  } catch (error) {
    console.error(`Error during registration: ${error.message}`);
    return res
      .status(500)
      .json({ message: "Internal server error in registration" });
    // console.log("Internal server error in registration");
  }
});

// Login route
router.post("/Login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(301).json({ message: "Please fill all fields" });
    }
    // Check if user exists
    const checkemail = await User.findOne({ email });
    if (!checkemail) {
      return res.status(302).json({ message: "User does not exist" });
    }
    // Compare password
    const ismatch = await bcrypt.compare(password, checkemail.password);
    if (!ismatch) {
      return res.status(303).json({ message: "Invalid credentials" });
    }
    // Create JWT token
    const token = jwt.sign({ id: checkemail._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    checkemail.tokens.push({ token });
    await checkemail.save();
    // Send response
    res.status(200).json({ message: "Login successful", token });
    console.log("Login successful");
  } catch (error) {
    console.error(`Error during login: ${error.message}`);
    return res.status(500).json({ message: "Internal server error in login" });
    // console.log("Internal server error in login");
  }
});
router.post("/newtoken", async (req, res) => {
  const { userId} = req.body;
  if (!userId) {
    return res
      .status(301)
      .json({ success: false, message: "User id is required" });
      
  }
  try {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const newtoken = new NewToken({ token });
    await newtoken.save();
    res
      .status(200)
      .json({
        success: true,
        message: "New token generated successfully",
        token,
      });
  } catch (error) {
    console.error(`Error during newtoken: ${error.message}`);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error in newtoken" });
  }
});

module.exports = router;
