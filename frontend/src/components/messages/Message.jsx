import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import userConversation from "../../zustand/userConversation";
import { extractTime } from "../../utils/extractTime";

const Message = ({message}) => {
  const {authUser} = useAuthContext();
  const {selectedConversation} = userConversation();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatBgClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe? authUser.profilePic: selectedConversation?.profilePic;
  const bgColor = fromMe? "chat-bubble chat-bubble-success": "chat-bubble  bg-blue-700";
  const shakeClass = message.shouldShake ? "shake" : "";
  return (
    <div className={`chat ${chatBgClassName}`}>
      <div className="chat-image avatar">
        <div className=" w-10 rounded-full">
          <img
            alt="Chat bubble component"
            src={profilePic}
          />
        </div>
      </div>
      <div className={`${bgColor} ${shakeClass}`}>{message.message}</div>
      <div className="chat-footer text-white opacity-50 text-sm flex gap-1 items-center">{formattedTime}</div>
    </div>
  );
};

export default Message;
