import { createSlice } from "@reduxjs/toolkit";

import { LIVE_CHAT_OFFSET } from "./constants";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.splice(LIVE_CHAT_OFFSET, 1);
      state.messages.unshift(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export default chatSlice.reducer;

export const { addMessage, clearMessages } = chatSlice.actions;
