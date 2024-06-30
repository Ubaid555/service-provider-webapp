// utils/counter.util.js

import Counter from "../models/counter.model.js";

export const updateCount = async (counterType, userId) => {
  try {
    // Update total count for the platform
    let existingCounter = await Counter.findOne();
    if (!existingCounter) {
      const initialCounter = new Counter({
        userId: "Default Counter",
        totalServices: 50,
        totalServicesRequested: 35,
        totalServicesConfirmed: 25,
        totalServicesCompleted: 15
      });
      await initialCounter.save();
    } else {
      if (counterType === "Registered") {
        existingCounter.totalServices += 1;
      } else if (counterType === "Pending") {
        existingCounter.totalServicesRequested += 1;
      } else if (counterType === "Confirmed") {
        existingCounter.totalServicesConfirmed += 1;
      } else if (counterType === "Completed") {
        existingCounter.totalServicesCompleted += 1;
      }
      await existingCounter.save();
    }

    // Update user-specific count
    const userCounter = await Counter.findOne({ userId });
    if (!userCounter) {
      const initialUserCounter = new Counter({
        userId,
        totalServices: counterType === "Registered" ? 1 : 0,
        totalServicesRequested: counterType === "Pending" ? 1 : 0,
        totalServicesConfirmed: counterType === "Confirmed" ? 1 : 0,
        totalServicesCompleted: counterType === "Completed" ? 1 : 0
      });
      await initialUserCounter.save();
    } else {
      if (counterType === "Registered") {
        userCounter.totalServices += 1;
      } else if (counterType === "Pending") {
        userCounter.totalServicesRequested += 1;
      } else if (counterType === "Confirmed") {
        userCounter.totalServicesConfirmed += 1;
      } else if (counterType === "Completed") {
        userCounter.totalServicesCompleted += 1;
      }
      await userCounter.save();
    }
  } catch (error) {
    console.error('Error updating counter:', error);
  }
};
