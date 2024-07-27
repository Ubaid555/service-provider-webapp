import Review from "../models/review.model.js";

export const addreview = async (req, resp) => {
  try {
    const {
      serviceTakerId,
      serviceTakerName,
      serviceTakerImage,
      serviceProviderId,
      serviceProviderName,
      date,
      time,
      category,
      rating,
      comment,
    } = req.body;

    if (!rating || !comment) {
      return resp
        .status(400)
        .json({ message: "Rating and comment are required" });
    }

    const existingReview = await Review.findOne({
      serviceProviderId,
      serviceProviderId,
      category,
      comment: comment,
    });
    if (existingReview) {
      return resp.status(404).json({ message: "Review Already added" });
    }

    const newReview = new Review({
      serviceTakerId,
      serviceTakerName,
      serviceTakerImage,
      serviceProviderId,
      serviceProviderName,
      date,
      time,
      category,
      rating,
      comment,
    });
    const result = await newReview.save();
    if (result) {
      return resp.status(201).json({ message: "Review Has been added" });
    } else {
      return resp
        .status(404)
        .json({ message: "Some Error in Adding Review's" });
    }
  } catch (error) {
    console.log("Error's in Add Review Controller", error.message);
    resp.status(500).json({ error: "Internal Server Error" });
  }
};

export const getreview = async (req, resp) => {
  try {
    const review = await Review.find();
    if (review.length > 0) {
      resp.status(200).json(review);
    } else {
      resp.status(404).json({ message: "No reviews found" });
    }
  } catch (error) {
    console.log("Error's in Get Review Controller", error.message);
    resp.status(500).json({ error: "Internal Server Error" });
  }
};

export const getaverage = async (req, resp) => {
  try {
    const { serviceProviderId, category } = req.query;
    const reviews = await Review.find({
      serviceProviderId,
      category,
    });

    if (!reviews.length) {
      return resp.status(404).json({ error: "No reviews found" });
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = Math.floor(totalRating / reviews.length);

    return resp.status(201).json({ averageRating });
  } catch (error) {
    console.log("Error's in Get Average Controller", error.message);
    resp.status(500).json({ error: "Internal Server Error" });
  }
};
