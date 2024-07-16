import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    serviceProviderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model for service providers and takers
        required: true
      },
      serviceTakerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model for service providers and takers
        required: true
      },
      bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking', // Assuming you have a Booking model
        required: true
      },
      amount: {
        type: Number,
        required: true
      },
      currentStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed', 'Refunded'], // You can add more statuses as needed
        default: 'Pending'
      },
},{ timestamps: true });

const Payment = mongoose.model("Payment",paymentSchema);

export default Payment;