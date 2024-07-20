import mongoose from 'mongoose';

// Define the user balance schema
const userBalanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    totalBalance: {
      type: Number,
      default: 0, // Default balance is 0
    },
    pendingWithdraw: {
      type: Number,
      default: 0, // Default pending withdraw amount is 0
    },
    withdrawn: {
      type: Number,
      default: 0, // Default withdrawn amount is 0
    },
    pendingWithdrawStatus: {
      type: Boolean,
      default: false, // Default status is false
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create and export the model
const UserBalance = mongoose.model('UserBalance', userBalanceSchema);
export default UserBalance;
