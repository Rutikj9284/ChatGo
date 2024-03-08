import React from "react";

const Message = () => {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className=" w-10 rounded-full">
          <img
            alt="Chat bubble component"
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          />
        </div>
      </div>
      <div className="chat-bubble chat-bubble-success">Hii What's Up?</div>
      <div className="chat-footer text-white opacity-50 text-sm flex gap-1 items-center">1:00 pm</div>
    </div>
  );
};

export default Message;
