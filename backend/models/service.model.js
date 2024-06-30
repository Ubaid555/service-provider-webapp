import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    fullName: {
    type: String,
    required: true, 
  },
  phone: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required:true
  },
  price: {
    type: Number,
    required:true
  },
  description: {
    type: String,
    required:true
  },
  userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  profilePic: {
      type: String,
      default: '',
    },
});

const Service = mongoose.model("Service",serviceSchema);
export default Service;