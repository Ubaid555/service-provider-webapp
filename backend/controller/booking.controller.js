import Booking from "../models/booking.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";
import { updateCount } from "../utils/counter.util.js";
import Stripe from "stripe";
import Payment from "../models/payment.model.js";

// export const
// export const bookService = async (req, resp) => {
//   try {
//     const {
//       category,
//       serviceProviderId,
//       serviceTakerId,
//       price,
//       serviceProviderName,
//       serviceProviderImage,
//       description,
//     } = req.body;
//     const userId = serviceProviderId;

//     const existingBooking = await Booking.findOne({
//       category,
//       serviceProviderId,
//       serviceTakerId,
//     });

//     if (existingBooking) {
//       if (existingBooking.currentStatus == "Pending") {
//         return resp
//           .status(400)
//           .json({ error: "Already Pending Service Request To This User" });
//       } else if (existingBooking.currentStatus == "Confirmed") {
//         return resp
//           .status(400)
//           .json({ error: "There is an Ongoing Service With this User" });
//       } else {
//         const user = await User.findOne({ _id: serviceTakerId });
//         const email = user.email;
//         console.log("User email is ", email);

//         let users = await User.findOne({ _id: serviceTakerId });
//         const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//         const session = await stripe.checkout.sessions.create({
//           payment_method_types: ["card"],
//           mode: "payment",
//           success_url: `${process.env.CLIENT_SITE_URL}/mybookings`,
//           cancel_url: `${process.env.CLIENT_SITE_URL}/bookingform`,
//           customer_email: users.email,
//           client_reference_id: serviceProviderId,
//           line_items: [
//             {
//               price_data: {
//                 currency: "usd",
//                 unit_amount: price,
//                 product_data: {
//                   name: serviceProviderName,
//                   description: description,
//                   images: [serviceProviderImage],
//                 },
//               },
//               quantity: 1,
//             },
//           ],
//         });

//         let bookingData = { ...req.body, currentStatus: "Pending" };
//         let newBooking = new Booking(bookingData);
//         await updateCount("Pending", userId);
//         let result = await newBooking.save();
//         resp.status(201).json(result);
//       }
//     } else {
//       let user = await User.findOne({ _id: serviceTakerId });
//       const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//       const session = await stripe.checkout.sessions.create({
//         payment_method_types: ["card"],
//         mode: "payment",
//         success_url: `${process.env.CLIENT_SITE_URL}/mybookings`,
//         cancel_url: `${process.env.CLIENT_SITE_URL}/bookingform`,
//         customer_email: user.email,
//         client_reference_id: serviceProviderId,
//         line_items: [
//           {
//             price_data: {
//               currency: "usd",
//               unit_amount: price,
//               product_data: {
//                 name: serviceProviderName,
//                 description: description,
//                 images: [serviceProviderImage],
//               },
//             },
//             quantity: 1,
//           },
//         ],
//       });

//       let bookingData = { ...req.body, currentStatus: "Pending" };
//       let newBooking = new Booking(bookingData);
//       await updateCount("Pending", userId);
//       let result = await newBooking.save();
//       resp.status(201).json({success:true,message:'Successfully Paid',session});
//   }
//   } catch (error) {
//     console.log("Error's in Book Service Controller", error.message);
//     resp.status(500).json({ error: "Internal Server Error" });
//   }
// };

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
    } = req.body;

    const existingBooking = await Booking.findOne({
      category,
      serviceProviderId,
      serviceTakerId,
    });

    if (existingBooking) {
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
      },
      line_items: [
        {
          price_data: {
            currency: "pkr",
            unit_amount: price * 100, // Stripe expects amount in cents
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
        price: price, // Convert amount back to dollars
        currentStatus: "Pending",
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
    const { bookingId, currentStatus, userId } = req.body;

    const serviceProvider = await Booking.findOne({_id:bookingId, serviceProviderId:userId});
    const serviceTaker = await Booking.findOne({_id:bookingId,serviceTakerId:userId});
    console.log("service Taker",serviceTaker,"service Provider",serviceProvider)

    let result;
    if (currentStatus === "Completed") {
      const existingBooking = await Booking.findOne({ _id: bookingId });

      if (!existingBooking) {
        return resp
          .status(400)
          .json({ error: "No Data Found Related to this Booking" });
      }

      if (existingBooking.currentStatus === "Pending Complete") {
        result = await Booking.updateOne(
          { _id: bookingId },
          { $set: { currentStatus } }
        );
         console.log(result);
      let bookingData= await Booking.findOne({_id:bookingId});
      let newPayment = new Payment({
        serviceProviderId: bookingData.serviceProviderId,
        serviceTakerId:bookingData.serviceTakerId,
        bookingId:bookingData._id,
        amount:bookingData.price,
        currentStatus:bookingData.currentStatus
      });
      const paymentResult = await newPayment.save();
      console.log("Payment is " ,paymentResult);
      } else {
        result = await Booking.updateOne(
          { _id: bookingId },
          { $set: { currentStatus: "Pending Complete" } }        
        );
      }

      if(serviceTaker){
        result = await Booking.updateOne(
          {_id:bookingId},
          {$set: { userStatus: "Completed" }}
        )
      }
      else{

        result = await Booking.updateOne(
          {_id:bookingId},
          {$set: { serviceProviderStatus: "Completed" }}
        )
      }
    } else {
      result = await Booking.updateOne(
        { _id: bookingId },
        { $set: { currentStatus } }
      );
     
    }

    if (result.modifiedCount === 1) {
      if(serviceProvider){
      await updateCount(currentStatus, userId);
      }
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

export const handleUserRequest = async (req, resp) => {
  try {
    const { bookingId } = req.body;
    //     const objectId = mongoose.Types.ObjectId.isValid(bookingId) ? new mongoose.Types.ObjectId(bookingId) : null;
    //     let result1 = await Booking.find({_id:objectId});
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
