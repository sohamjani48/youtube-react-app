import { createSlice } from "@reduxjs/toolkit";

const videosSlice = createSlice({
  name: "videos",
  initialState: {
    selectedCategory: "home",
  },
  reducers: {
    addCategoryVideos: (state, action) => {
      const { category, categoryVideos } = action.payload;
      state[category] = categoryVideos;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
});

export default videosSlice.reducer;
export const { addCategoryVideos, setSelectedCategory } = videosSlice.actions;
