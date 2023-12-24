import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchCategoryVideos, fetchSearchedVideos } from "../utils/helper";
import { setSearchedVideos } from "../utils/searchSlice";
import { addCategoryVideos } from "../utils/videosSlice";
import SearchVideoCard from "./SearchVideoCard";
import VideoCard from "./VideoCard";

const VideoContainer = () => {
  const selectedCategory =
    useSelector((store) => store.videos.selectedCategory) ?? "trending";
  const categoryVideos = useSelector((store) => store.videos[selectedCategory]);
  const isSearchInitialized = useSelector(
    (store) => store.search.isSearchInitialized
  );
  const searchString = useSelector((store) => store.search.searchString);

  const dispatch = useDispatch();
  const [videos, setVideos] = useState(categoryVideos ?? []);

  const getSearchVideos = useCallback(async (searchString) => {
    const videos = await fetchSearchedVideos(searchString);
    setVideos(videos.items);
    dispatch(setSearchedVideos(videos.items));
  }, []);

  const getCategoryVideos = useCallback(async (selectedCategory) => {
    const videos = await fetchCategoryVideos(
      selectedCategory,
      selectedCategory === "live"
    );
    setVideos(videos.items);
    dispatch(
      addCategoryVideos({
        category: selectedCategory,
        categoryVideos: videos.items,
      })
    );
  }, []);

  useEffect(() => {
    if (isSearchInitialized) {
      setVideos([]);
      getSearchVideos(searchString);
    } else {
      if (!categoryVideos) {
        getCategoryVideos(selectedCategory);
      } else {
        setVideos(categoryVideos);
      }
    }
  }, [selectedCategory, searchString]);

  if (!videos?.length) return;

  return (
    <div className="flex flex-wrap z-0">
      {videos.map((video) => (
        <Link
          to={
            "/watch?v=" +
            (video?.snippet?.liveBroadcastContent === "live" ||
            isSearchInitialized
              ? video.id.videoId
              : video.id) +
            "&cat=" +
            selectedCategory +
            "&isLive=" +
            video?.snippet?.liveBroadcastContent
          }
          key={video.id}
        >
          {isSearchInitialized ? (
            <SearchVideoCard data={video} />
          ) : (
            <VideoCard data={video} />
          )}
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
