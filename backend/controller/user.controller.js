import User from "../models/user.model.js";
import Conversation from "../models/conversation.model.js"; // Import Conversation model

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.query.userId;

    // Find conversations that include the logged-in user
    const conversations = await Conversation.find({
      participants: loggedInUserId,
    }).populate("participants");

    // Extract unique participant IDs excluding the logged-in user
    const participantIds = new Set();
    conversations.forEach((conversation) => {
      conversation.participants.forEach((participant) => {
        if (participant._id.toString() !== loggedInUserId) {
          participantIds.add(participant._id.toString());
        }
      });
    });

    // Find user details for these participants
    const filteredUsers = await User.find({
      _id: { $in: Array.from(participantIds) },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
