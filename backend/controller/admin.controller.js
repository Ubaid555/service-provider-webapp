import User from "../models/user.model.js";
import mongoose from "mongoose";
import Service from "../models/service.model.js";
import Booking from "../models/booking.model.js";
import Sdata from "../models/serviceData.model.js";

export const getAllUser = async (req, resp) => {
  const userId = req.query.userId;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return resp.status(400).json({ error: "Invalid or missing user ID" });
  }

  try {
    const users = await User.find({ _id: { $ne: userId } });

    if (!users.length) {
      return resp.status(404).json({ message: "No users found" });
    }

    resp.status(200).json(users);
  } catch (error) {
    console.error("Error In Get All User Controller ", error);
    resp
      .status(500)
      .json({ error: "An error occurred while retrieving users" });
  }
};

export const setService = async (req, resp) => {
  try {
    const { imgsrc, title, sname, description } = req.body;

    if (!imgsrc || !title || !sname || !description) {
      return resp
        .status(400)
        .json({ error: "All fields (imgsrc, title, sname) are required" });
    }

    const formattedSname =
      sname.charAt(0).toUpperCase() + sname.slice(1).toLowerCase();

    const oldService = await Sdata.findOne({ sname: formattedSname });

    if (oldService) {
      return resp
        .status(400)
        .json({ error: "This name Service Already Added" });
    } else {
      const newSdata = new Sdata({
        imgsrc,
        title,
        sname: formattedSname,
        description,
      });
      await newSdata.save();

      resp.status(201).json({
        sname: newSdata.sname,
        title: newSdata.title,
        imgsrc: newSdata.imgsrc,
        description: newSdata.description,
      });
    }
  } catch (error) {
    console.error("Error In Set Service Controller ", error);
    resp
      .status(500)
      .json({ error: "An error occurred while retrieving users" });
  }
};

// export const getService = async (req,resp) =>{
//     try {
//         const result = await Sdata.find

//     }  catch (error) {
//         console.error("Error In Get Service Controller ", error);
//         resp
//           .status(500)
//           .json({ error: "An error occurred while retrieving users" });
//       }
// }

export const getAllServices = async (req, resp) => {
  try {
    const userId = req.query.userId;

    if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
      return resp.status(400).json({ error: "Invalid user ID" });
    }

    const services = await Service.find({ userId: { $ne: userId } });

    if (!services.length) {
      return resp.status(404).json({ message: "No services found" });
    }

    // Send the found services as the response
    resp.status(200).json(services);
  } catch (error) {
    console.error("Error In Get All Services Controller ", error);
    resp
      .status(500)
      .json({ error: "An error occurred while retrieving users" });
  }
};

export const deleteUserService = async (req, resp) => {
  try {
    const { _id, userId } = req.query;
    console.log(_id,userId);

    const isAdmin = await User.findOne({ _id: userId, role: "admin" });

    if (isAdmin) {
      const result = await Service.deleteOne({ _id });
      if (result.deletedCount === 1) {
        return resp
          .status(200)
          .json({ success: "Service deleted successfully" });
      } else {
        return resp
          .status(404)
          .json({ error: "Service not found or already deleted" });
      }
    } else {
      return resp
        .status(400)
        .json({ error: "Only Admin Has the Authority to Delete" });
    }
  } catch (error) {
    console.error("Error In Delete User Service Controller ", error);
    resp
      .status(500)
      .json({ error: "An error occurred while retrieving users" });
  }
};

export const getAllBookings = async (req, resp) => {
  try {
    const bookings = await Booking.find();

    if (!bookings.length) {
      return resp.status(404).json({ message: "No bookings found" });
    }

    resp.status(200).json(bookings);
  } catch (error) {
    console.error("Error In Get All Bookings Controller:", error);
    resp
      .status(500)
      .json({ error: "An error occurred while retrieving bookings" });
  }
};
