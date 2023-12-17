import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { setSearchInitialized } from "../utils/searchSlice";
import { setSelectedCategory } from "../utils/videosSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const selectedCategory =
    useSelector((store) => store.videos.selectedCategory) ?? "trending";

  if (!isMenuOpen) return;

  const categories = [
    { key: "trending", label: "Trending" },
    { key: "music", label: "Music" },
    { key: "gaming", label: "Gaming" },
    { key: "sports", label: "Sports" },
    { key: "comedy", label: "Comedy" },
  ];

  return (
    <div className="py-4 px-6 shadow-lg h-full mt-16">
      <ul>
        <li
          className="py-1 pl-2 font-semibold text-md cursor-pointer"
          onClick={() => {
            dispatch(setSelectedCategory("trending"));
            dispatch(setSearchInitialized(false));
          }}
        >
          <Link to={"/"}>Home</Link>
        </li>
        <li
          className="py-1 pl-2 font-semibold text-md cursor-pointer"
          onClick={() => {
            dispatch(setSelectedCategory("trending"));
            dispatch(setSearchInitialized(false));
          }}
        >
          <Link to={"/"}>Shorts</Link>
        </li>
        <li
          className="py-1 pl-2 font-semibold text-md cursor-pointer"
          onClick={() => {
            dispatch(setSelectedCategory("live"));
            dispatch(setSearchInitialized(false));
          }}
        >
          <Link to={"/"}>Live</Link>
        </li>
      </ul>
      <h1 className="font-bold pt-4 pl-2 text-lg">Categories</h1>
      <ul>
        {categories.map((cat) => (
          <li
            className={`py-1 pl-4 ${
              selectedCategory === cat.key ? "font-semibold" : ""
            } text-md cursor-pointer`}
            onClick={() => {
              dispatch(setSelectedCategory(cat.key));
              dispatch(setSearchInitialized(false));
            }}
          >
            <Link to={"/"}>{cat.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
