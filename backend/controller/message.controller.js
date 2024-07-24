import { io } from "../server.js";
import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"

export const sendMessage = async (req, resp) => {
    try {
        console.log(req.body);
        const { senderId, receiverId, message } = req.body.newMessage;

        let conversation = await Conversation.findOne({ participants: { $all: [senderId, receiverId] } });
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([conversation.save(), newMessage.save()]);

        io.emit("receiveMessage", {
            senderId,
            receiverId,
            message: newMessage.message,
            createdAt: newMessage.createdAt
        });

        resp.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in Message Controller", error.message);
        resp.status(500).json({ error: "Internal Server Error" });
    }
}

export const getMessages = async (req, resp) => {
    try { 
        const { id: userToChatId } = req.params;
        const currentUser = req.headers['currentuser'];;
        // console.log(userToChatId,currentUser)
  
      const conversation = await Conversation.findOne({
        participants: { $all: [currentUser, userToChatId] },
      }).populate("messages");

//   console.log(conversation);
      if(!conversation){
          return resp.status(200).json([]);
      }
  
      const messages=conversation.messages;
    //   console.log(messages)
   
      resp.status(200).json(messages);
    } catch (error) {
      console.log("Error in Get Message Controller", error.message);
      resp.status(500).json({ error: "Internal Server Error" });
    }
  };