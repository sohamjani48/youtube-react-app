import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toggleMenu } from "../utils/appSlice";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import {
  cacheResults,
  setSearchInitialized,
  setSearchString,
} from "../utils/searchSlice";

const Head = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchCache = useSelector((store) => store.search);

  const togglMenuHandler = () => {
    dispatch(toggleMenu());
  };

  const getSearchSuggestions = async () => {
    const response = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const data = await response.json();
    setSuggestions(data[1]);

    dispatch(cacheResults({ [searchQuery]: data[1] }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, [300]);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  return (
    <div className="flex fixed p-4 shadow-md justify-around w-full bg-white">
      <div className="flex my-auto">
        <img
          alt="menu"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAARVBMVEX///8jHyAgHB0MAAUOBQikpKQpJSadnZ309PUAAAAIAADZ2Nj8/Pyop6cYExXBwMAtKSpta2xpZ2draWpfXV7BwcGvrq77CGWbAAABG0lEQVR4nO3cwXKCMBQFUApFTQAVtf3/Ty3tsKhLZpKSxnP+4M57JCwyt2kAAAAAAAAAAAAAAADgFQ1TX4ZpyJJvvIXYlSGGecyQcI5v5Yi39AGHsHeqJyH9ovYljXAZ4qeEm9W/pc29pCHmOGma8R7iexky3RbLovbHMvR5bnwAAAAAAAAAANhkPJUhV77hcT2U4frI8mToI5zbUpzDJX3A06Hd+7neL22X/mHbpbDXl+mHeOz2DvUk9skT1j/D+r/DZYiVn6UvcB9+2/tnZpUrHgAAAAAAAAAAbDBMe5ftrXK17M619yZq2f1bGfpLp5JGmKWDtv6E9W9p/SfNz22xdxn7Kl/LbuW9+gAAAAAAAAAAAAAAAPCffAHLSDTi5JU+gwAAAABJRU5ErkJggg=="
          className="h-8 w-8 cursor-pointer"
          onClick={togglMenuHandler}
        />
        <img
          alt="youtube-logo"
          src="https://www.edigitalagency.com.au/wp-content/uploads/Youtube-logo-png.png"
          className="h-8 mx-2"
        />
      </div>

      <div className=" ml-[25%]">
        <div>
          <input
            type="text"
            className="w-[420px] border border-gray-400 rounded-l-full py-1 px-3"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
          />
          <button className="border border-gray-500 py-1 px-4 rounded-r-full bg-slate-300">
            🔍
          </button>
        </div>
        {showSuggestions && suggestions.length ? (
          <div className="absolute bg-white w-[420px] mx-1 border border-l-2 border-r-2 border-b-2 border-l-gray-400 border-r-gray-400 border-b-gray-400 rounded-lg">
            <ul>
              {suggestions.map((suggestion) => (
                <li
                  className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    console.log("logxx setting search preferences");
                    setSearchQuery(suggestion);
                    dispatch(setSearchInitialized(true));
                    dispatch(setSearchString(suggestion));
                    setShowSuggestions(false);
                  }}
                >
                  {`🔍 ${suggestion}`}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <div className="flex col-span-2 my-auto ml-auto">
        <img
          alt="user-icon"
          src="https://freesvg.org/img/abstract-user-flat-3.png"
          className="h-8"
        />
      </div>
    </div>
  );
};

export default Head;
