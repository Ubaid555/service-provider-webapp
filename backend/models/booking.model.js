import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    serviceTakerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    serviceTakerName: {
      type: String,
      required: true,
    },
    serviceTakerPhone: {
      type: Number,
      required: true,
    },
    serviceTakerImage: {
      type: String,
      default: "",
    },
    serviceProviderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    serviceProviderName: {
      type: String,
      required: true,
    },
    serviceProviderPhone: {
      type: Number,
      required: true,
    },
    serviceProviderImage: {
      type: String,
      default: "",
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    currentStatus: {
      type: String,
      required: true,
    },
    userStatus: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
    serviceProviderStatus: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
