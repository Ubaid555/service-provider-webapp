import mongoose from "mongoose";

export const addPayment = async(req,resp)=>{
    try {
        
    }catch (error) {
        console.error("Error In Add Payment Controller ", error);
        resp
          .status(500)
          .json({ error: "An error occurred while retrieving users" });
      }
}