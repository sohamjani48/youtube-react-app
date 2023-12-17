import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    isSearchInitialized: false,
    searchString: "",
    searchedVideos: null,
  },
  reducers: {
    cacheResults: (state, action) => {
      state = Object.assign(state, action.payload);
    },
    setSearchInitialized: (state, action) => {
      state.isSearchInitialized = action.payload;
    },
    setSearchString: (state, action) => {
      state.searchString = action.payload;
    },
    setSearchedVideos: (state, action) => {
      state.searchedVideos = action.payload;
    },
  },
});

export default searchSlice.reducer;

export const {
  cacheResults,
  setSearchInitialized,
  setSearchString,
  setSearchedVideos,
} = searchSlice.actions;
