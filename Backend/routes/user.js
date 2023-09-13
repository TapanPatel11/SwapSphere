const express = require("express");
const router = express.Router();
const user = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
module.exports = router;
const { protectRoute } = require("../middleware/authMiddleware");
const authenticationTokens = require("../models/authenticationTokens");
const forgotPasswordTokens = require("../models/forgotPasswordTokens");
const nodemailer = require("nodemailer");
// add a new user

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    try {
      // Create a new user based on the request body
      const existingUser = await user.findOne({ email: req.body.email });
      if (existingUser) {
        // console.log("savedUser");
        return res.status(400).json({ error: "Email already exists" });
      }
      //hashing the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const newUser = new user({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
      });

      // Save the new user to the database
      const savedUser = await newUser.save();

      res.status(200).json({
        _id: newUser.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
      }); // Respond with the saved user object
    } catch (error) {
      res.status(500).json({ error: "Failed to add user" });
    }
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    try {
      const { email, password } = req.body;
      const User = await user.findOne({ email });
      console.log(User);
      if (!User || !(await bcrypt.compare(password, User.password))) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      // user id ,token email
      const token = generateToken(User.email);
      const authToken = await authenticationTokens.findOne({ email });
      if (authToken) {
        authToken.token = token;
        await authToken.save();
      } else {
        const newAuthToken = new authenticationTokens({
          email: email,
          token: token,
        });
        // Save the new user to the database
        await newAuthToken.save();
      }
      res
        .status(200)
        .json({ status: "true", token: token, email: email, role: User.role });
    } catch (error) {
      res.status(500).json({ status: error });
    }
  })
);

router.post(
  "/checkTokens",
  asyncHandler(async (req, res) => {
    try {
      // Create a new user based on the request body
      const authToken = await authenticationTokens.findOne({
        token: req.body.token,
      });
      console.log(authToken);
      if (authToken) {
        console.log("savedUser" + authToken);
        res.status(201).json({
          status: "true",
        });
      } else {
        res.status(201).json({
          status: "false",
        });
      }
      // Respond with the saved user object
    } catch (error) {
      res.status(500).json({ status: "false" });
    }
  })
);

router.get(
  "/getUserDetailwithToken",
  asyncHandler(async (req, res) => {
    console.log("HERE=======>", req.headers.authorization);
    try {
      // Create a new user based on the request body
      const inputToken = req.headers.authorization.replace("Bearer ", "");
      console.log("token");
      console.log(inputToken);
      const authToken = await authenticationTokens.findOne({
        token: inputToken,
      });
      console.log("authToken");
      console.log(authToken);
      console.log("hey");

      const userEmail = authToken.email;
      // console.log(userEmail);
      // userEmail="rakshit1412@gmail.com";
      console.log(userEmail);
      const userdata = await user.findOne({ email: userEmail });
      console.log("authToken");
      console.log("authToken1");
      console.log(userdata);
      if (userdata) {
        res.status(201).json({
          userProfilePhoto: userdata.userProfilePhoto,
          firstName: userdata.firstName,
          lastName: userdata.lastName,
          email: userdata.email,
          password: userdata.password,
          mobile: userdata.mobile,
          role: userdata.role,
        });
      } else {
        res.status(201).json({
          status: "false",
        });
      }
      // Respond with the saved user object
    } catch (error) {
      res.status(500).json({ status: "false" });
    }
  })
);

//current
router.post(
  "/setUserDetailwithToken",
  asyncHandler(async (req, res) => {
    try {
      console.log("authToken1");
      const authToken = await authenticationTokens.findOne({
        token: req.body.token,
      });
      const userEmail = authToken.email;
      console.log("authToken");
      console.log(userEmail);
      //add user in db.

      const modifyingUser = await user.findOne({
        email: userEmail,
      });

      // console.log(modifyingUser);
      //add user in db.
      modifyingUser.userProfilePhoto = req.body.profilePicture;
      modifyingUser.firstName = req.body.firstName;
      modifyingUser.lastName = req.body.lastName;
      modifyingUser.email = req.body.email;
      modifyingUser.password = req.body.password;
      modifyingUser.mobile = req.body.mobile;

      await modifyingUser.save();
      console.log("reached saved");
      if (modifyingUser) {
        res.status(201).json({
          status: "true",
        });
      } else {
        res.status(201).json({
          status: "false",
        });
      }
      // Respond with the saved user object
    } catch (error) {
      res.status(500).json({ status: "false" });
    }
  })
);

router.post(
  "/deleteTokens",
  asyncHandler(async (req, res) => {
    try {
      const { token } = req.body;
      const authToken = await authenticationTokens.findOne({ token });
      console.log(authToken);
      console.log("hello"); // Find the token in the database based on its value
      if (authToken) {
        await authToken.deleteOne(); // If the token exists, delete it
        res.status(201).json({
          status: "true",
        });
      } else {
        res.status(201).json({
          status: "false",
        });
      }
    } catch (error) {
      res.status(500).json({ status: error });
    }
  })
);

router.get(
  "/allUsers",
  asyncHandler(async (req, res) => {
    try {
      const allUsers = await user.find({});
      res.status(200).json(allUsers);
    } catch (error) {
      res.status(500).json({ error: "Failed to get users" });
    }
  })
);

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "drasticdraw@gmail.com",
    pass: "opgasuosvcyipnvz",
  },
});

router.post(
  "/forgotpassword",
  asyncHandler(async (req, res) => {
    const { email, number } = req.body;
    console.log(email);
    console.log(number);
    const fpTokens = new forgotPasswordTokens({
      email: email,
      otp: number,
    });

    // Save the new user to the database
    await fpTokens.save();

    //send email of otp
    // Create the URL with the token as a query parameter
    // const resetPasswordURL = `http://localhost:3000/user/forgotsetpassword?token=${token}`;

    // Send the password reset email
    transporter.sendMail(
      {
        from: "drasticdraw@gmail.com",
        to: email,
        subject: "Password Reset OTP",
        text: `This is the OTP to reset your password: ${number}`,
      },
      (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          res.status(500).json({ error: error });
        } else {
          console.log("Email sent:", info.response);
          res.status(200).json({ status: "true" });
        }
      }
    );
  })
);

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

router.post(
  "/forgotpasswordset",
  asyncHandler(async (req, res) => {
    const { otp, bool, password } = req.body;
    try {
      const otpToken = await forgotPasswordTokens.findOne({ otp });
      console.log(otpToken);
      console.log("hello"); // Find the token in the database based on its value
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      if (otpToken) {
        var existing_user = await user.findOne({ email: otpToken.email });
        existing_user.password = hashedPassword;
        await existing_user.save();

        await otpToken.deleteOne();
        res.status(200).json({
          status: "true",
        });
      } else {
        res.status(201).json({
          status: "false",
        });
      }
    } catch (error) {
      res.status(500).json({ status: error });
    }
  })
);

router.post("/get", async (req, res) => {
  try {
    const email = req.body.email;

    const foundUser = await user.findOne({ email: email });

    if (!foundUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the product as JSON
    res.json(foundUser);
  } catch (err) {
    console.error("Error retrieving user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get(
  "/me",
  protectRoute,
  asyncHandler(async (req, res) => {
    res.status(200).json({ message: " all ok " });
  })
);
