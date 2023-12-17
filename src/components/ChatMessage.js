import React from "react";

const ChatMessage = ({ name = "", message = "" }) => {
  return (
    <div className="flex items-center py-2">
      <img
        alt="user-icon"
        src="https://freesvg.org/img/abstract-user-flat-3.png"
        className="h-6 w-6"
      />
      <span className="px-2 font-semibold">{name}</span>
      <span className="px-1">{message}</span>
    </div>
  );
};

export default ChatMessage;
