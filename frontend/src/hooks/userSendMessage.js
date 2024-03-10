import React, { useState } from 'react'
import userConversation from '../zustand/userConversation'
import toast from 'react-hot-toast';

const userSendMessage = () => {
    const {messages, setMessages, selectedConversation} = userConversation();
    const [loading, setLoading] = useState(false);
    
    const sendMessage = async (message) => {
		setLoading(true);
		try {
			const res = await fetch(`/api/messages/sendMessage/${selectedConversation._id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message }),
			});
			const data = await res.json();
			// console.log(data);
			if (data.error) throw new Error(data.error);

			setMessages([...messages, data]);
			console.log("Updated messages:", [...messages, data]);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
}

export default userSendMessage