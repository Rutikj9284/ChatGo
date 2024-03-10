import React, { useEffect } from 'react';
import { useSocketContext } from '../context/SocketContext';
import userConversation from '../zustand/userConversation';
import notificationSound from '../assets/notification.mp3';
const UserListenMessages = () => {
    const { socket } = useSocketContext();
	const { messages, setMessages } = userConversation();

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
			newMessage.shouldShake = true;
			const sound = new Audio(notificationSound);
			sound.play();
			setMessages([...messages, newMessage]);
		});

		return () => socket?.off("newMessage");
	}, [socket, setMessages, messages]);
};

export default UserListenMessages;
