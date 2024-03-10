import React, { useRef, useEffect } from "react";
import Message from "./Message";
import userGetMessages from "../../hooks/userGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton.jsx";
import userListenMessages from "../../hooks/userListenMessages.js";
const Messages = () => {
  const { messages, loading } = userGetMessages();
  const lastMessageRef = useRef();
  userListenMessages();
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);
  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message, index) => (
          <div
            key={index}
            ref={index === messages.length - 1 ? lastMessageRef : null}
          >
            <Message message={message} />
          </div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};
export default Messages;
