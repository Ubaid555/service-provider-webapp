import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    serviceTakerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    serviceTakerName: {
      type: String,
      required: true,
    },
    serviceTakerImage: {
      type: String,
      default: '',
    },
    serviceProviderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    serviceProviderName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    currentStatus: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);
export default Review;
