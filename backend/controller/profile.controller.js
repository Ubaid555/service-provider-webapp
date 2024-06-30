import User from "../models/user.model.js";
import bcrypt from "bcryptjs"


export const showProfile = async(req,resp)=>{
    try {
        const{userId}=req.query;
        const userData= await User.findOne({_id:userId});
        if(userData){
            return resp.status(201).json({success:userData});
        }else{
            return resp.status(404).json({error:"No Data Found"});
        }
        
    }catch (error) {
        console.log("Error's in Show Profile Controller",error.message);
        resp.status(500).json({error:"Internal Server Error"})
    }
} 

export const updatePassword = async (req, resp) => {
    try {
        const { email, oldPassword, newPassword } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            return resp.status(404).json({ message: "User not found" });
        }
 
        const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password || "");
        if (!isPasswordCorrect) {
            return resp.status(400).json({ message: "Old Password is incorrect" });
        }

        const isSamePassword = await bcrypt.compare(newPassword, user.password || "");
        if (isSamePassword) {
            return resp.status(400).json({ message: "New password cannot be the same as the old password" });
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
        console.log("Error in Update Password Controller", error.message);
        resp.status(500).json({ error: "Internal Server Error" });
    }
};
