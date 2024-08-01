import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import { generateOTP, sendOTPEmail } from "../utils/otp.util.js";

let otps = {};

export const login = async (req, resp) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return resp.status(400).json({ error: "Invalid email Or Password" });
    }

    generateTokenAndSetCookie(user._id, resp);

    resp.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      phone: user.phone,
      email: user.email,
      profilePic: user.profilePic,
      role: user.role,
    });
  } catch (error) {
    console.log("Error's in Login Controller", error.message);
    resp.status(500).json({ error: "Internal Server Error" });
  }
};

export const signup = async (req, resp) => {
  try {
    const { fullName, email, phone, password, confirmPassword, profilePic } =
      req.body;

    if (password !== confirmPassword) {
      return resp.status(400).json({ error: "Passwords Don't Match" });
    }

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;

        if (!passwordPattern.test(password)) {
          return resp
            .status(400)
            .json({ error: "Password must be minimum 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%?&)." });
        }

    const user = await User.findOne({ email });
    if (user) {
      return resp.status(400).json({ error: "User Already Exists" });
    }

    const otp = generateOTP();
    otps[email] = { otp, fullName, phone, password, profilePic };

    await sendOTPEmail(email, otp);
    resp.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    console.log(error.message);
    resp.status(500).json({ error: "Internal Server Error" });
  }
};

export const verifyOtp = async (req, resp) => {
  const { email, otp } = req.body;
  const tempData = otps[email];

  if (!tempData) {
    return resp.status(400).json({ error: "Invalid OTP" });
  }

  if (tempData.otp !== otp) {
    return resp.status(400).json({ error: "Invalid OTP" });
  }

  try {
    const existingEmail = await User.findOne({ email }); // For Those who Want to Reset Password
    if (existingEmail) {
      return resp.status(200).json({ message: "OTP Verified" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(tempData.password, salt);

    const result = await User.find();

    // console.log(result);

    const newUser = new User({
      fullName: tempData.fullName,
      email,
      phone: tempData.phone,
      password: hashedPassword,
      profilePic: tempData.profilePic,
      verified: "true",
    });

    await newUser.save();
    delete otps[email]; 

    resp.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      phone: newUser.phone,
      email: newUser.email,
      profilePic: newUser.profilePic,
      role: newUser.role,
    });
  } catch (error) {
    console.log(error.message);
    resp.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async (req, resp) => {
  try {
    resp.cookie("jwt", "", { maxAge: 0 });
    resp.status(200).json({ message: "Logged Out successfully" });
  } catch (error) {
    console.log("Error In Logout", error.message);
    resp.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUser = async (req, resp) => {
  try {
    const userId = req.query.userId;

    let result = await User.find({ _id: userId });

    resp.status(201).json(result);
  } catch (error) {
    console.log("Error In Get User", error.message);
    resp.status(500).json({ error: "Internal Server Error" });
  }
};

export const forgotPassword = async (req, resp) => {
  try {
    const { email } = req.query;

    const result = await User.findOne({ email });

    if (result) {
      const otp = generateOTP();
      otps[email] = {
        otp,
        fullName: result.fullName,
        phone: result.phone,
        password: result.password,
        profilePic: result.profilePic,
      };
      await sendOTPEmail(email, otp);
      resp.status(200).json({ message: "OTP sent to your email" });
    } else {
      resp.status(400).json({ message: "User Not Found" });
    }
  } catch (error) {
    console.log("Error In Forgot Password Controller", error.message);
    resp.status(500).json({ error: "Internal Server Error" });
  }
};

export const resetPassword = async (req, resp) => {
  try {
    const { email, newPassword } = req.body;

    let user = await User.findOne({ email });

        if (!user) {
            return resp.status(404).json({ message: "User not found" });
        }

        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;

        if (!passwordPattern.test(newPassword)) {
          return resp
            .status(400)
            .json({ message: "Password must be minimum 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%?&)." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        const result = await User.updateOne({ email }, { $set: { password: hashedPassword } });

        if (result.modifiedCount === 1) {
            return resp.status(200).json({ message: "Password updated successfully" });
        } else {
            return resp.status(400).json({ message: "Password update failed" });
        }
  } catch (error) {
    console.log("Error In reset Password Controller",error.message);
    resp.status(500).json({error:"Internal Server Error"})
}
};
