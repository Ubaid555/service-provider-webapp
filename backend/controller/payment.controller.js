import mongoose from "mongoose";
import UserBalance from "../models/balance.model.js";
import Payment from "../models/payment.model.js";
import Booking from "../models/booking.model.js";
import WithdrawRequest from "../models/withdrawRequest.model.js";

export const addPayment = async (req, resp) => {
  try {
  } catch (error) {
    console.error("Error In Add Payment Controller ", error);
    resp
      .status(500)
      .json({ error: "An error occurred while retrieving users" });
  }
};

export const viewPayments = async (req, resp) => {
  try {
    const result = await Booking.find();
    if (result) {
      // console.log(result);
      return resp.status(200).json({ success: result });
    } else {
      return resp.status(400).json({ error: "No Payment Record" });
    }
  } catch (error) {
    console.error("Error In View Payment's Controller", error);
    return resp
      .status(500)
      .json({ error: "An error occurred while retrieving users" });
  }
};

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

export const withdrawRequest = async (req, resp) => {
  try {
    const {
      userId,
      holdername,
      name,
      accountNumber,
      accountHolderName,
      amountToWithdraw,
      withdrawMethod,
    } = req.body;

    if (
      !userId ||
      !holdername ||
      !name ||
      !accountNumber ||
      !accountHolderName ||
      !amountToWithdraw ||
      !withdrawMethod
    ) {
      return resp.status(400).json({
        error:
          "All fields are required: userId, name, holdername, accountNumber, accountHolderName, amountToWithdraw",
      });
    }

    let checkBalance = await UserBalance.findOne({ userId });
    // console.log(checkBalance.totalBalance)

    if (amountToWithdraw >= checkBalance.totalBalance) {
      return resp.status(400).json({
        error: "Withdraw amount can not greater than total balance",
      });
    }

    const existingWithdrawRequest = await WithdrawRequest.findOne({
      userId,
      withdrawStatus: "pending",
    });

    if (existingWithdrawRequest) {
      return resp.status(400).json({
        error: "There is already a pending withdrawal request.",
      });
    }

    const newWithdrawRequest = new WithdrawRequest({
      userId,
      holdername,
      name,
      accountNumber,
      accountHolderName,
      amountToWithdraw,
      withdrawMethod,
    });

    await newWithdrawRequest.save();

    await UserBalance.updateOne(
      { userId },
      {
        $inc: {
          totalBalance: -amountToWithdraw,
          pendingWithdraw: amountToWithdraw,
        },
      }
    );

    return resp
      .status(201)
      .json({ message: "Withdraw request created successfully" });
  } catch (error) {
    console.error("Error in withdrawRequest controller", error);
    return resp.status(500).json({
      error: "An error occurred while processing the withdraw request",
    });
  }
};

export const viewWithdrawRequest = async (req, resp) => {
  try {
    const result = await WithdrawRequest.find();

    if (result.length === 0) {
      return resp.status(404).json({
        message: "No withdrawal requests found.",
      });
    }

    return resp.status(200).json({ success: result });
  } catch (error) {
    console.error("Error in view Withdraw Request controller", error);
    return resp.status(500).json({
      error: "An error occurred while processing the withdraw request",
    });
  }
};

export const handleWithdraw = async (req, resp) => {
  try {
    const { currentUser, amountToWithdraw } = req.body;
    const userId = currentUser;

    if (!userId) {
      return resp.status(400).json({
        error: "User ID is required",
      });
    }

    const userBalance = await UserBalance.findOne({ userId });
    if (!userBalance) {
      return resp.status(404).json({
        error: "User balance not found",
      });
    }

    const result = await UserBalance.updateOne(
      { userId },
      {
        $inc: {
          pendingWithdraw: -amountToWithdraw,
          withdrawn: amountToWithdraw,
        },
      }
    );

    if (result.nModified === 0) {
      return resp.status(400).json({
        error: "Withdrawal update failed",
      });
    } else {
      await WithdrawRequest.updateOne(
        { userId, withdrawStatus: "pending" },
        { $set: { withdrawStatus: "Completed" } }
      );

      return resp
        .status(200)
        .json({ success: "Withdrawal processed successfully" });
    }
  } catch (error) {
    console.error("Error in handleWithdraw controller", error);
    return resp.status(500).json({
      error: "An error occurred while processing the withdrawal request",
    });
  }
};

export const withdrawHistory = async (req, resp) => {
  try {
    const { userId } = req.query;
    // console.log(userId);

    if (!userId) {
      return resp.status(400).json({
        error: "User ID is required",
      });
    }

    const result = await WithdrawRequest.find({
      userId,
      withdrawStatus: "Completed",
    });

    if (!result || result.length === 0) {
      return resp.status(404).json({
        message: "No completed withdrawal requests found",
      });
    }

    return resp.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error in withdraw history controller", error);
    return resp.status(500).json({
      error: "An error occurred while fetching the withdrawal history",
    });
  }
};