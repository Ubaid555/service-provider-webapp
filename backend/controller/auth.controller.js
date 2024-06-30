import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateToken.js"
import { generateOTP, sendOTPEmail } from "../utils/otp.util.js";


let otps = {};

export const login = async(req , resp)=>{
    try {
        const {email,password}=req.body;
        const user = await User.findOne({email});
        const isPasswordCorrect=await bcrypt.compare(password, user?.password||"")

        if(!user || !isPasswordCorrect){
            return resp.status(400).json({error:"Invalid email Or Password"});
        }

        generateTokenAndSetCookie(user._id,resp);

        resp.status(201).json({
            _id:user._id,
            fullName:user.fullName,
            phone:user.phone,
            email:user.email,
            profilePic:user.profilePic
        })
    } catch (error) {
        console.log("Error's in Login Controller",error.message);
        resp.status(500).json({error:"Internal Server Error"})
    }
}

// export const signup = async(req , resp)=>{
//     try {
//         const {fullName,email,phone,password,confirmPassword,profilePic}=req.body;
//         if(password!== confirmPassword){
//             return resp.status(400).json({error:"Password's Don't Match"})
//         }

//         const user = await User.findOne({email});
//         if(user){
//             return resp.status(400).json({error:"User Already Exist's"})
//         }

//         //Hash Passwrod
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password,salt);

//         //Avatar Place Holder
//         // const profilePic = `https://avatar.iran.liara.run/public`


//         const newUser = new User ({
//             fullName,
//             email,
//             phone,
//             password:hashedPassword,
//             profilePic
//         })

//         if(newUser){
//         //Generate GWT Token
//         generateTokenAndSetCookie(newUser._id,resp);

//         await newUser.save();

//         resp.status(201).json({
//             _id:newUser._id,
//             fullName:newUser.fullName,
//             phone:newUser.phone,
//             email:newUser.email,
//             profilePic:newUser.profilePic
//         })
//     }else{
//         resp.status(400).json({error: "Invalid User Data"})
//     }

//     } catch (error) {
//         console.log(error.message);
//         resp.status(500).json({error:"Internal Server Error"})
//     }
// }

export const signup = async (req, resp) => {  
    try {
        console.log(req.body);
      const { fullName, email, phone, password, confirmPassword, profilePic } = req.body;
      console.log("SignUp",email);
  
      if (password !== confirmPassword) {
        return resp.status(400).json({ error: "Passwords Don't Match" });
      }
  
      const user = await User.findOne({ email });
      if (user) {
        return resp.status(400).json({ error: "User Already Exists" });
      }
  
      const otp = generateOTP();
      otps[email] = { otp, fullName, phone, password, profilePic };
      console.log("Data Before sendOtp",email , otp);
  
      await sendOTPEmail(email, otp);
      resp.status(200).json({ message: "OTP sent to your email" });
    } catch (error) {
      console.log(error.message);
      resp.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  // Verify OTP function
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
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(tempData.password, salt);
  
      const newUser = new User({
        fullName: tempData.fullName,
        email,
        phone: tempData.phone,
        password: hashedPassword,
        profilePic: tempData.profilePic,
      });
  
      await newUser.save();
      delete otps[email]; // Remove temp data after successful registration
  
      resp.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        phone: newUser.phone,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } catch (error) {
      console.log(error.message);
      resp.status(500).json({ error: "Internal Server Error" });
    }
  };

export const logout = async(req , resp)=>{
    try {
        resp.cookie("jwt","",{maxAge:0})
        resp.status(200).json({message:"Logged Out successfully"});
    }  catch (error) {
        console.log("Error In Logout",error.message);
        resp.status(500).json({error:"Internal Server Error"})
    }
}