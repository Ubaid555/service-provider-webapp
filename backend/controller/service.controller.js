import Service from "../models/service.model.js";
import mongoose from "mongoose";
import { updateCount } from "../utils/counter.util.js";
import Sdata from "../models/serviceData.model.js";

export const service = async(req,resp)=>{
  try {
    const services = await Sdata.find();
    if (services.length === 0) {
      return resp.status(404).json({ message: "No services found" });
    }
    resp.send(services);
    
  } catch (error) {
    console.log("Error's in Service Controller", error.message);
    resp.status(500).json({ error: "Internal Server Error" });
  }
}

export const addservice = async (req, resp) => {
  try {
    const {
      fullName,
      phone,
      category,
      price,
      description,
      userId,
      profilePic,
    } = req.body;

    const existingService = await Service.findOne({ category, userId });

    if (existingService) {
      return resp
        .status(400)
        .json({ error: "User Already Registered This Service" });
    } else {
      const newService = new Service({
        fullName,
        phone,
        category,
        price,
        description,
        userId,
        profilePic,
      });

      await newService.save();
      await updateCount("Registered",userId);

      resp.status(201).json({
        _id: newService._id,
        price: newService.price,
        description: newService.description,
      }); 
    }
  } catch (error) {
    console.log("Error's in Add Service Controller", error.message);
    resp.status(500).json({ error: "Internal Server Error" });
  }
};

export const viewservice = async (req, resp) => {
  try {
    const { category, userId } = req.query;
    let service = await Service.find({ category: category });

    if (service.length > 0) {
      if (userId) {
        service = service.filter((s) => s.userId.toString() !== userId);
      }
      if (service.length > 0) {
        return resp.status(201).json(service);
      } else {
        return resp.status(400).json({ error: "No Service's Found" });
      }
    } else {
      return resp.status(400).json({ error: "No Service's Found" });
    }
  } catch (error) {
    console.log("Error in View Service Controller:", error.message);
    resp.status(500).json({ error: "Internal Server Error" });
  }
};


export const myservice = async (req, resp) => {
  try {
    const { userId } = req.query; 
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return resp.status(400).json({ error: "Invalid userId format" });
    }

    let result = await Service.find({userId:userId}); 

    if (result) {
      resp.status(200).json(result);
    } else {
      resp.status(404).json({ error: "Service not found" });
    }
  } catch (error) {
    console.log("Error in My Service Controller", error.message);
    resp.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteService = async (req,resp)=>{
  try {
    const{userId,category}=req.query;
    const result= await Service.deleteOne({userId:userId,category:category});
    if(result.deletedCount===1){
      return resp.status(200).json({ success: "Service deleted successfully" });
    }else{
      return resp.status(404).json({ error: "Service not found or already deleted" });
    }
    
  } catch (error) {
    console.log("Error in Delete Service Controller", error.message);
    resp.status(500).json({ error: "Internal Server Error" });
  }
}

export const updateService = async(req,resp)=>{
  try {
    const{userId,category}=req.body;
    console.log(userId,category);
    let result = await Service.updateOne({ category: category, userId: userId }, { $set: req.body });
    console.log(result);
    if(result.matchedCount==1){
      return resp.status(200).json({success:"Result successfully Updated"});
    }else{
      return resp.status(400).json({error:"NO Data Updated"});
    }
  }catch (error) {
    console.log("Error in Update Service Controller", error.message);
    resp.status(500).json({ error: "Internal Server Error" });
  }
}
