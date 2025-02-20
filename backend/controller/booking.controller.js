import Booking from "../models/booking.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";
import { updateCount } from "../utils/counter.util.js";
import Stripe from "stripe";
import Payment from "../models/payment.model.js";
import UserBalance from "../models/balance.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const bookService = async (req, resp) => {
  try {
    const {
      category,
      serviceProviderId,
      serviceTakerId,
      price,
      serviceProviderName,
      serviceProviderImage,
      description,
      address,
      date,
      time,
      serviceTakerName,
      serviceTakerPhone,
      serviceTakerImage,
      serviceProviderPhone,
      problemPic,
    } = req.body;

    const existingBooking = await Booking.findOne({
      category,
      serviceProviderId,
      serviceTakerId,
      currentStatus: "Pending" || "Confirmed",
      // {$or: [{currentStatus: "Pending"}, {currentStatus: "Confirmed"}]}
    });

    // console.log("Existing Booking",existingBooking)

    if (existingBooking) {
      // console.log("Inside Existing")
      if (existingBooking.currentStatus === "Pending") {
        return resp
          .status(400)
          .json({ error: "Already Pending Service Request To This User" });
      } else if (existingBooking.currentStatus === "Confirmed") {
        return resp
          .status(400)
          .json({ error: "There is an Ongoing Service With this User" });
      }
    }

    // console.log("Time",time)
    const notAvailable = await Booking.findOne({
      serviceProviderId,
      date,
      time,
    });

    // console.log(notAvailable);

    if (notAvailable) {
      return resp
        .status(400)
        .json({ error: "User is Not Available on this time" });
    }

    const user = await User.findOne({ _id: serviceTakerId });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `http://localhost:5001/api/bookings/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_SITE_URL}/bookingform`,
      customer_email: user.email,
      client_reference_id: serviceProviderId,
      metadata: {
        category,
        serviceTakerId,
        serviceProviderName,
        serviceProviderImage,
        description,
        address,
        date,
        time,
        serviceTakerName,
        serviceTakerPhone,
        serviceTakerImage,
        serviceProviderPhone,
        price,
        problemPic,
      },
      line_items: [
        {
          price_data: {
            currency: "pkr",
            unit_amount: price * 100,
            product_data: {
              name: serviceProviderName,
              description: description,
              images: [serviceProviderImage],
            },
          },
          quantity: 1,
        },
      ],
    });

    resp
      .status(201)
      .json({ success: true, message: "Redirect to Stripe", session });
  } catch (error) {
    console.log("Error's in Book Service Controller", error.message);
    resp.status(500).json({ error: "Internal Server Error" });
  }
};

export const success = async (req, resp) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(
      req.query.session_id
    );

    if (session.payment_status === "paid") {
      const {
        client_reference_id: serviceProviderId,
        metadata: {
          category,
          serviceTakerId,
          serviceProviderName,
          serviceProviderImage,
          description,
          address,
          date,
          time,
          serviceTakerName,
          serviceTakerPhone,
          serviceTakerImage,
          serviceProviderPhone,
          price,
          problemPic,
        },
      } = session;

      let bookingData = {
        category,
        serviceProviderId,
        serviceTakerId,
        serviceProviderName,
        serviceProviderImage,
        description,
        address,
        date,
        time,
        serviceTakerName,
        serviceTakerPhone,
        serviceTakerImage,
        serviceProviderPhone,
        price: price,
        currentStatus: "Pending",
        problemPic,
      };

      let newBooking = new Booking(bookingData);
      await updateCount("Pending", serviceProviderId);
      await newBooking.save();

      let paymentData = {
        serviceProviderId,
        serviceTakerId,
        bookingId: newBooking._id,
        amount: price,
        currentStatus: "Pending",
      };

      let newPayment = new Payment(paymentData);
      await newPayment.save();

      resp.redirect(`${process.env.CLIENT_SITE_URL}/mybookings`);
    } else {
      resp.redirect(`${process.env.CLIENT_SITE_URL}/services`);
    }
  } catch (error) {
    console.log("Error's in Payment Success Handler", error.message);
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
    const { bookingId, currentStatus, userId, completionPic = null } = req.body;

    // console.log("api call", currentStatus, completionPic);

    const serviceProvider = await Booking.findOne({
      _id: bookingId,
      serviceProviderId: userId,
    });
    const serviceTaker = await Booking.findOne({
      _id: bookingId,
      serviceTakerId: userId,
    });
    // console.log("service Taker",serviceTaker,"service Provider",serviceProvider)

    let result;
    if (currentStatus === "Completed") {
      // console.log("Inside Completed");
      const existingBooking = await Booking.findOne({ _id: bookingId });

      if (!existingBooking) {
        return resp
          .status(400)
          .json({ error: "No Data Found Related to this Booking" });
      }

      if (
        existingBooking.currentStatus === "Pending Complete" ||
        existingBooking.currentStatus === "Dispute"
      ) {
        let newBalance;
        result = await Booking.updateOne(
          { _id: bookingId },
          { $set: { currentStatus, completionPic } }
        );
        const payment = await Payment.updateOne(
          { _id: bookingId },
          { $set: { currentStatus: "Service Complete" } }
        );

        let bookingData = await Booking.findOne({ _id: bookingId });
        newBalance = Math.floor(bookingData.price * 0.93);
        let oldUserBalance = await UserBalance.findOne({
          userId: bookingData.serviceProviderId,
        });

        if (oldUserBalance) {
          let balance = oldUserBalance.totalBalance + newBalance;
          const updateBalance = await UserBalance.updateOne(
            { userId: bookingData.serviceProviderId },
            { $inc: { totalBalance: newBalance } }
          );
        } else {
          const newUser = new UserBalance({
            userId: bookingData.serviceProviderId,
            totalBalance: newBalance,
          });

          await newUser.save();
        }
        // console.log("Final Completion");
        await updateCount(currentStatus, bookingData.serviceProviderId);
      } else {
        // console.log("Inside Pending Completion")
        result = await Booking.updateOne(
          { _id: bookingId },
          { $set: { currentStatus: "Pending Complete", completionPic } }
        );
      }

      if (serviceTaker) {
        result = await Booking.updateOne(
          { _id: bookingId },
          { $set: { userStatus: "Completed" } }
        );
      } else {
        result = await Booking.updateOne(
          { _id: bookingId },
          { $set: { serviceProviderStatus: "Completed" } }
        );
      }
      return resp
      .status(200)
      .json({ success: "Request Has Been Generated" });
    } else {
      result = await Booking.updateOne(
        { _id: bookingId },
        { $set: { currentStatus } }
      );
      if (currentStatus === "Dispute") {
        return resp
          .status(200)
          .json({ success: "Refend Request Has Been Generated" });
      }
      if (currentStatus === "Refund") {
        let newBalance;

        let bookingData = await Booking.findOne({ _id: bookingId });
        newBalance = bookingData.price;
        let oldUserBalance = await UserBalance.findOne({
          userId: bookingData.serviceTakerId,
        });
        if (oldUserBalance) {
          const updateBalance = await UserBalance.updateOne(
            { userId: bookingData.serviceTakerId },
            { $inc: { totalBalance: newBalance } }
          );
        } else {
          const newUser = new UserBalance({
            userId: bookingData.serviceTakerId,
            totalBalance: newBalance,
          });

          await newUser.save();
          // console.log("data Sending Back");
          return resp
            .status(200)
            .json({ success: "Refend Has Been Completed" });
        }
      }

      if (result.modifiedCount === 1) {
        if (serviceProvider) {
          await updateCount(currentStatus, userId);
        }
        // console.log("data Sending Back");
        return resp.status(200).json({ success: "Successfully Updated" });
      } else {
        return resp
          .status(400)
          .json({ error: "No Data Found Related to this Booking" });
      }
    }
  } catch (error) {
    console.log("Error's in Handle Booking Request Controller", error.message);
    resp.status(500).json({ error: "Internal Server Error" });
  }
};

export const handleUserRequest = async (req, resp) => {
  try {
    const { bookingId } = req.body;
    const result = await Booking.updateOne(
      { _id: bookingId },
      { $set: { userStatus: "Completed" } }
    );
    if (result.modifiedCount === 1) {
      return resp.status(200).json({ success: "Successfully Updated" });
    } else {
      return resp
        .status(400)
        .json({ error: "No Data Found Related to this Booking" });
    }
  } catch (error) {
    console.log("Error's in Handle User Request Controller", error.message);
    resp.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateBooking = async (req, resp) => {
  try {
    const { bookingId, ...updateData } = req.body;

    const {date , time,serviceProviderId } = updateData

    console.log(date , time)

    if (!bookingId) {
      return resp.status(400).json({ message: "Booking ID is required" });
    }

    const notAvailable = await Booking.findOne({
      serviceProviderId,
      date,
      time,
    }); 

    if(notAvailable){
      return resp.status(400).json({ message: "User Not Available on this time " });
    }

    const result = await Booking.updateOne(
      { _id: bookingId },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return resp.status(404).json({ message: "Booking not found" });
    }

    if (result.modifiedCount === 0) {
      return resp
        .status(400)
        .json({ message: "No changes made to the booking" });
    }

    resp.status(200).json({ message: "Booking updated successfully" });
  } catch (error) {
    console.log("Error in Update Booking Controller", error.message);
    resp.status(500).json({ error: "Internal Server Error" });
  }
};