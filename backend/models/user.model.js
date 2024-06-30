import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
//   gender: {
//     type: String,
//     required: true,
//     enum: ["male", "female"],
//   },
  profilePic: {
    type: String,
    default: "",
  },
  verified: {
    type: Boolean,
    default: false,
  }
},{timestamps:true});

const User = mongoose.model("User", userSchema);
export default User;

