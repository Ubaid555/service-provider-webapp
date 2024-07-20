import mongoose from "mongoose";
import UserBalance from "../models/balance.model.js";
import Payment from "../models/payment.model.js";
import Booking from "../models/booking.model.js";

export const addPayment = async(req,resp)=>{
    try {
        
    }catch (error) {
        console.error("Error In Add Payment Controller ", error);
        resp
          .status(500)
          .json({ error: "An error occurred while retrieving users" });
      }
}

// export const viewBalance = async (req,resp)=>{
//     try {
//         const {userId}=req.query;

//         const result = await UserBalance.findOne({userId});
//         if(result){
//             return resp.status(200).json({ success: result });
//         }else{
//             return resp
//         .status(400)
//         .json({ error: "No Data Found Related to this User" });
//         }
        
//     } catch (error) {
//         console.error("Error In View Balance Controller ", error);
//         resp
//           .status(500)
//           .json({ error: "An error occurred while retrieving users" });
//       }
// }

export const viewPayments = async(req,resp)=>{
    try {
        const result = await Booking.find();
        if (result) {
            console.log(result);
            return resp.status(200).json({ success: result });
          } else {
            return resp
              .status(400)
              .json({ error: "No Payment Record" });
          }
        
    } catch (error) {
        console.error("Error In View Payment's Controller", error);
        return resp
          .status(500)
          .json({ error: "An error occurred while retrieving users" });
      }
}

export const viewBalance = async (req, resp) => {
    try {
      const { userId } = req.query;
  
      const result = await UserBalance.findOne({ userId });
      if (result) {
        return resp.status(200).json({ success: result });
      } else {
        return resp
          .status(400)
          .json({ error: "No Data Found Related to this User" });
      }
    } catch (error) {
      console.error("Error In View Balance Controller", error);
      return resp
        .status(500)
        .json({ error: "An error occurred while retrieving users" });
    }
  };


  