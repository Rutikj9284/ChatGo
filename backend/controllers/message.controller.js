import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import { getRecieverSocketId, io } from "../socket/socket.js";

export  const sendMessage = async(req, res)=>{
    try {
        const {message} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;  //See these at the time of authorization we've set req.user = user

        let conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]}
        });

        //If no conversation between the receiver and the sender then create new conversation
        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });

        if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

        // await conversation.save();
		// await newMessage.save();
        await Promise.all([conversation.save(), newMessage.save()]);

        //socket io functionality to send it to the reciever so that i would get updated immediately and we will be able to see on screen

        const recieverSocketId = getRecieverSocketId(receiverId);

        if(recieverSocketId){
            //io.to is used to send events to the specific clients
            io.to(recieverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);



    } catch (error) {
        console.log("Error sending message", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const getMessage = async(req, res)=>{
    try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
}