import { useEffect, useState } from "react";
import userConversation from "../zustand/userConversation";
import toast from "react-hot-toast";
const userGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = userConversation();

	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
				const res = await fetch(`/api/messages/getMessage/${selectedConversation._id}`);
				const data = await res.json();
				console.log(data);
				if (res.ok) {
					setMessages(data); // Assuming that the response directly contains an array of messages
				} else {
					throw new Error(data.error || "Error fetching messages");
				}
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?._id) getMessages();
	}, [selectedConversation?._id, setMessages]);

	return { messages, loading };
};


export default userGetMessages;
