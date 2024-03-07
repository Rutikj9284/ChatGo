import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";

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

        await conversation.save();
		await newMessage.save();

        res.status(201).json(message);


    } catch (error) {
        console.log("Error sending message", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const getMessage = async(req, res)=>{
    try {
        const {id: recieverId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: {$all: [recieverId, senderId]}
        }).populate("messages");

        res.status(200).json(conversation.messages);

    } catch (error) {
        console.log("Error getting message", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}