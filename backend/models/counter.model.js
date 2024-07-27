import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  totalServices: {
    type: Number,
    default: 50,
  },
  totalServicesRequested: {
    type: Number,
    default: 35,
  },
  totalServicesConfirmed: {
    type: Number,
    default: 25,
  },
  totalServicesCompleted: {
    type: Number,
    default: 15,
  },
  userId: String,
});

const Counter = mongoose.model("Counter", serviceSchema);

export default Counter;
