import Counter from "../models/counter.model.js";

export const overviewAllServices = async (req, resp) => {
  try {
    const result = await Counter.find({ userId: "Default Counter" });
    if (result) {
      return resp.status(201).json({ success: result });
    } else {
      return resp.status(400).json({ error: "No Previous History" });
    }
  } catch (error) {
    console.log("Error's in Overview All Service Controller", error.message);
    resp.status(500).json({ error: "Internal Server Error" });
  }
};

export const overviewUserServices = async (req, resp) => {
  try {
    const { userId } = req.query;
    let result = await Counter.find({ userId: userId });

    if (result.length > 0) {
      return resp.status(201).json({ success: result });
    } else {
      return resp.status(404).json({ error: "No Data Found" });
    }
  } catch (error) {
    console.log("Error's in Overview User Service Controller", error.message);
    resp.status(500).json({ error: "Internal Server Error" });
  }
};
