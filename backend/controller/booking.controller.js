import Booking from "../models/booking.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";
import { updateCount } from "../utils/counter.util.js";

export const bookService = async (req, resp) => {
  try {
    const { category, serviceProviderId, serviceTakerId } = req.body;
    const userId = serviceProviderId;
    const existingBooking = await Booking.findOne({
      category,
      serviceProviderId,
      serviceTakerId,
    });

    if (existingBooking) {
      if (existingBooking.currentStatus == "Pending") {
        return resp
          .status(400)
          .json({ error: "Already Pending Service Request To This User" });
      } else if (existingBooking.currentStatus == "Confirmed") {
        return resp
          .status(400)
          .json({ error: "There is an Ongoing Service With this User" });
      } else {
        let bookingData = { ...req.body, currentStatus: "Pending" };
        let newBooking = new Booking(bookingData);
        await updateCount("Pending", userId);
        let result = await newBooking.save();
        resp.status(201).json(result);
      }
    } else {
      let bookingData = { ...req.body, currentStatus: "Pending" };
      let newBooking = new Booking(bookingData);
      await updateCount("Pending", userId);
      let result = await newBooking.save();
      resp.status(201).json(result);
    }
  } catch (error) {
    console.log("Error's in Book Service Controller", error.message);
    resp.status(500).json({ error: "Internal Server Error" });
  }
};

export const myBookedService = async (req, resp) => {
  try {
    const { userId } = req.query;
    const result = await Booking.find({ serviceTakerId: userId });
    if (result) {
      return resp.status(200).json({ success: result });
    } else {
      return resp.status(404).json({ error: "No Booking's Found" });
    }
  } catch (error) {
    console.log("Error's in View Booking Controller", error.message);
    resp.status(500).json({ error: "Internal Server Error" });
  }
};

export const ongoingBooking = async (req, resp) => {
  try {
    const { userId, currentStatus } = req.query;
    if (!userId || !currentStatus) {
      return resp
        .status(404)
        .json({ error: "User Id or Current Status is not Given" });
    } else {
      const objectId = mongoose.Types.ObjectId.isValid(userId)
        ? new mongoose.Types.ObjectId(userId)
        : null;
      if (!objectId) {
        return resp.status(400).json({ error: "Invalid User Id" });
      }
      const result = await Booking.find({
        serviceProviderId: objectId,
        currentStatus,
      });
      if (result.length > 0) {
        return resp.status(200).json({ success: result });
      } else {
        return resp.status(404).json({ error: "No data Found" });
      }
    }
  } catch (error) {
    console.log("Error's in on Going Booking Controller", error.message);
    resp.status(500).json({ error: "Internal Server Error" });
  }
};

export const handleBookingRequest = async (req, resp) => {
  try {
    const { bookingId, currentStatus, userId } = req.body;
    //     const objectId = mongoose.Types.ObjectId.isValid(bookingId) ? new mongoose.Types.ObjectId(bookingId) : null;
    //     let result1 = await Booking.find({_id:objectId});
    const result = await Booking.updateOne(
      { _id: bookingId },
      { $set: { currentStatus } }
    );
    if (result.modifiedCount === 1) {
      await updateCount(currentStatus, userId);
      return resp.status(200).json({ success: "Successfully Updated" });
    } else {
      return resp
        .status(400)
        .json({ error: "No Data Found Related to this Booking" });
    }
  } catch (error) {
    console.log("Error's in Handle Booking Request Controller", error.message);
    resp.status(500).json({ error: "Internal Server Error" });
  }
};

// export const updateBooking = async (req, resp) => {
//   try {
//     const { bookingId } = req.body._id;
//     console.log(bookingId )

//     const result = await Booking.updateOne(
//       { _id: bookingId },
//       { $set: req.body }
//     );
//     if (result.matchedCount === 0) {
//       return resp.status(404).json({ message: "Booking not found" });
//     }

//     if (result.modifiedCount === 0) {
//       return resp
//         .status(400)
//         .json({ message: "No changes made to the booking" });
//     }

//     // Successful update
//     resp.status(200).json({ message: "Booking updated successfully" });
//   } catch (error) {
//     console.log("Error's inUpdate Booking Controller", error.message);
//     resp.status(500).json({ error: "Internal Server Error" });
//   }
// };


export const updateBooking = async (req, resp) => {
  try {
      const { bookingId, ...updateData } = req.body;

      if (!bookingId) {
          return resp.status(400).json({ message: "Booking ID is required" });
      }

      const result = await Booking.updateOne({ _id: bookingId }, { $set: updateData });

      if (result.matchedCount === 0) {
          return resp.status(404).json({ message: "Booking not found" });
      }

      if (result.modifiedCount === 0) {
          return resp.status(400).json({ message: "No changes made to the booking" });
      }

      resp.status(200).json({ message: "Booking updated successfully" });

  } catch (error) {
      console.log("Error in Update Booking Controller", error.message);
      resp.status(500).json({ error: "Internal Server Error" });
  }
};
