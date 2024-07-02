import Conversation from "../models/conversation.model.js"
import Message  from "../models/message.model.js"

export const sendMessage = async(req,resp)=>{
    try {
        // const{message}=req.body;
        // const {id:receiverId}=req.params;
        // const senderId=req.user._id;

        const {serviceProviderId,serviceTakerId,message}=req.body;

        const receiverId = serviceProviderId;
        const senderId = serviceTakerId;

        let conversation = await Conversation.findOne({participants:{$all:[senderId,receiverId]}})

        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId,receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if (newMessage){
            conversation.messages.push(newMessage._id);
        }

        console.log(newMessage);

        //Socket Io Functinality Will Go here

        // await conversation.save();
        // await newMessage.save();

        //Run In Parallel at same Time
        await Promise.all([conversation.save(),newMessage.save()]);

        resp.status(201).json(newMessage);


    } catch (error) {
        console.log("Error in Message Controller",error.message);
        resp.status(500).json({error:"Internal Server Error"})
    }
}

export const getMessages = async (req, resp) => {
    try { 
        const { id: userToChatId } = req.params;
        const senderId = req.headers.servicetakerid;

        console.log(userToChatId,senderId);
  
      const conversation = await Conversation.findOne({
        participants: { $all: [senderId, userToChatId] },
      }).populate("messages");

  
      if(!conversation){
          return resp.status(200).json([]);
      }
  
      const messages=conversation.messages;
      console.log(messages);  
   
      resp.status(200).json(messages);
    } catch (error) {
      console.log("Error in Get Message Controller", error.message);
      resp.status(500).json({ error: "Internal Server Error" });
    }
  };