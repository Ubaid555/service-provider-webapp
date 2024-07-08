import express from "express";
import { addservice, deleteService, myservice, service, updateService, viewservice } from "../controller/service.controller.js";
//import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/service",service);
router.post("/addService",addservice);
router.get("/viewService",viewservice);
router.get("/myService",myservice);
router.delete("/deleteService",deleteService);
router.put("/updateService",updateService);

export default router; 