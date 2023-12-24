import React from "react";
import { FaBroadcastTower } from "react-icons/fa";
import { FaMusic } from "react-icons/fa";
import { FaGamepad } from "react-icons/fa";
import { FaFire } from "react-icons/fa";
import { FaLaugh } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { MdDirectionsRun } from "react-icons/md";
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

  const renderCategoryIcon = (catKey) => {
    if (catKey === "trending") {
      return <FaFire />;
    } else if (catKey === "music") {
      return <FaMusic />;
    } else if (catKey === "gaming") {
      return <FaGamepad />;
    } else if (catKey === "sports") {
      return <MdDirectionsRun />;
    } else if (catKey === "comedy") {
      return <FaLaugh />;
    }
  };

  return (
    <div className="py-4 px-6 shadow-lg h-full mt-16">
      <ul>
        <li
          className="py-1 pl-2 font-semibold text-lg cursor-pointer flex items-center gap-2"
          onClick={() => {
            dispatch(setSelectedCategory("trending"));
            dispatch(setSearchInitialized(false));
          }}
        >
          <MdHome />
          <Link to={"/"}>Home</Link>
        </li>
        <li
          className="py-1 pl-2 font-semibold text-lg cursor-pointer flex items-center gap-2"
          onClick={() => {
            dispatch(setSelectedCategory("live"));
            dispatch(setSearchInitialized(false));
          }}
        >
          <FaBroadcastTower />
          <Link to={"/"}>Live</Link>
        </li>
      </ul>
      <h1 className="font-bold pt-4 pl-2 text-lg">Categories</h1>
      <ul>
        {categories.map((cat) => (
          <li
            className={`py-2 pl-4 flex items-center text-md cursor-pointer gap-2`}
            onClick={() => {
              dispatch(setSelectedCategory(cat.key));
              dispatch(setSearchInitialized(false));
            }}
          >
            {renderCategoryIcon(cat.key)}
            <Link
              to={"/"}
              className={`${
                selectedCategory === cat.key ? "font-semibold" : ""
              } `}
            >
              {cat.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
