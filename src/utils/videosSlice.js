import { createSlice } from "@reduxjs/toolkit";

const videosSlice = createSlice({
  name: "videos",
  initialState: {
    selectedCategory: "home",
    statistics: {},
  },
  reducers: {
    addCategoryVideos: (state, action) => {
      const { category, categoryVideos } = action.payload;
      state[category] = categoryVideos;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setVideoStatistics: (state, action) => {
      const { videoId, statistics } = action.payload;
      state.statistics[videoId] = statistics;
    },
  },
});

export default videosSlice.reducer;
export const { addCategoryVideos, setSelectedCategory, setVideoStatistics } =
  videosSlice.actions;
