import mongoose from "mongoose";

const withdrawRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
    },
    accountHolderName: {
      type: String,
      required: true,
    },
    amountToWithdraw: {
      type: Number,
      required: true,
    },
    withdrawStatus: {
      type: String,
      default: "pending",
    },

    withdrawMethod: {
      type: String,
      enum: ["JazzCash", "EasyPaisa"],
      required: true,
    },
  },
  { timestamps: true }
);

const WithdrawRequest = mongoose.model(
  "WithdrawRequest",
  withdrawRequestSchema
);

export default WithdrawRequest;
