import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addMessage } from "../utils/chatSlice";
import { generateRandomMessage, generateRandomName } from "../utils/helper";
import ChatMessage from "./ChatMessage";

const LiveChat = () => {
  const dispatch = useDispatch();

  const chatMessages = useSelector((store) => store.chat.messages);

  const [liveMessage, setLiveMessage] = useState("");

  useEffect(() => {
    //API Polling
    const interval = setInterval(() => {
      //API polling
      dispatch(
        addMessage({
          name: generateRandomName(),
          message: generateRandomMessage(20),
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleAddMessage = () => {
    dispatch(
      addMessage({
        name: "User",
        message: liveMessage,
      })
    );
  };

  return (
    <>
      <div className="ml-2 p-2 border border-gray-300 w-full h-[630px] bg-slate-100 rounded-md overflow-y-scroll flex flex-col-reverse">
        {chatMessages.map((cm) => (
          <ChatMessage name={cm.name} message={cm.message} key={cm.message} />
        ))}
      </div>
      <form
        className="flex w-full p-2 ml-2"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          className="border border-b-gray-400 border-l-0 border-r-0 border-t-0 border-b-1 flex flex-1 mr-2"
          value={liveMessage}
          onChange={(e) => setLiveMessage(e.target.value)}
          placeholder="Add Live Chat Comment..."
        />
        <button
          className="px-4 py-1 bg-slate-300 rounded-lg"
          onClick={() => {
            setLiveMessage("");
            handleAddMessage();
          }}
        >
          Comment
        </button>
      </form>
    </>
  );
};

export default LiveChat;
