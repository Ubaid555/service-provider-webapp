import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
  debug: true,
});

const generateOTP = () => {
  console.log("Otp Generating");
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendOTPEmail = async (email, otp) => {
  console.log("Otp",otp);
  console.log("Email",email);
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Your OTP for Signup",
    text: `Your OTP is ${otp}`,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    // console.log("Email sent: ", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email: ", error);
    throw error;
  }
};

export { generateOTP, sendOTPEmail };
