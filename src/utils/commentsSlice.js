import { createSlice } from "@reduxjs/toolkit";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {},
  reducers: {
    addComments: (state, action) => {
      const { videoId, comments } = action.payload;
      state[videoId] = comments;
    },
  },
});

export default commentsSlice.reducer;
export const { addComments } = commentsSlice.actions;
