import mongoose from "mongoose";

const userBalanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    totalBalance: {
      type: Number,
      default: 0,
    },
    pendingWithdraw: {
      type: Number,
      default: 0,
    },
    withdrawn: {
      type: Number,
      default: 0,
    },
    pendingWithdrawStatus: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const UserBalance = mongoose.model("UserBalance", userBalanceSchema);
export default UserBalance;
