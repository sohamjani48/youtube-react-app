import React, { useEffect, useState } from "react";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { closeMenu } from "../utils/appSlice";
import { clearMessages } from "../utils/chatSlice";
import { addComments } from "../utils/commentsSlice";
import {
  fetchComments,
  fetchVideoStatistics,
  getChannelThumbnailUrl,
  timeSince,
  trimText,
} from "../utils/helper";
import { setVideoStatistics } from "../utils/videosSlice";
import CommentsContainer from "./CommentContainer";
import LiveChat from "./LiveChat";

const WatchPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const videoCategory = searchParams.get("cat");
  const videoId = searchParams.get("v");
  const isLive = searchParams.get("isLive") === "live";

  const categoryVideos = useSelector((store) => store.videos[videoCategory]);
  const videoComments = useSelector((store) => store.comments[videoId]);
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const isSearchInitialized = useSelector(
    (store) => store.search.isSearchInitialized
  );
  const searchedVideos = useSelector((store) => store.search.searchedVideos);
  const savedStatistics = useSelector(
    (store) => store.videos.statistics[videoId]
  );

  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [joined, setJoined] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState(videoComments || null);
  const [statistics, setStatistics] = useState(savedStatistics || {});

  let videoDetails = {};

  if (isSearchInitialized) {
    videoDetails = searchedVideos.find((video) => video.id.videoId === videoId);
  } else if (isLive) {
    videoDetails = categoryVideos.find((video) => video.id.videoId === videoId);
  } else {
    videoDetails = categoryVideos.find((video) => video.id === videoId);
  }

  const { snippet } = videoDetails;

  // if (!isSearchInitialized) {
  //   videoDetails?.statistics && setStatistics(videoDetails.statistics);
  // }

  const { channelTitle, title, description } = snippet;

  let viewCount = 0;
  let likeCount = 0;
  let commentCount = 0;

  if (!isLive) {
    viewCount = statistics?.viewCount;
    likeCount = statistics?.likeCount;
    commentCount = statistics?.commentCount;
  }

  const getThumbnail = async (channelId) => {
    const channelThumbnailUrl = await getChannelThumbnailUrl(channelId);
    setThumbnailUrl(channelThumbnailUrl);
  };

  const uploadedTimeAgo = timeSince(snippet.publishedAt);

  const getVideoComments = async (videoId) => {
    const commentsData = await fetchComments(videoId);
    const { items, nextPageToken, pageInfo } = commentsData;

    const commentsObject = {
      items,
      replyCount: pageInfo?.totalResults,
      nextPageToken,
    };

    dispatch(addComments({ videoId, comments: commentsObject }));
    setComments(commentsObject);
  };

  const getVideoStatistics = async (videoId) => {
    const statisticsData = await fetchVideoStatistics(videoId);
    dispatch(setVideoStatistics({ videoId, statistics: statisticsData }));
    setStatistics(statisticsData?.items[0]?.statistics);
  };

  useEffect(() => {
    dispatch(closeMenu());
    dispatch(clearMessages());

    getVideoStatistics(videoId);
    if (!videoComments && !isLive) {
      getVideoComments(videoId);
    }
    getThumbnail(snippet.channelId);
  }, []);

  const renderVideoDetails = () => (
    <div className="flex flex-col px-4 pt-2">
      <h1 className="font-bold text-xl pb-2">{title}</h1>
      <div className="flex py-1 items-center gap-2 pb-4 justify-between">
        <div className="flex items-center">
          <img
            src={thumbnailUrl}
            alt="channel-logo"
            className="w-12 h-12 rounded-full"
          />
          <p className="text-md font-semibold pl-2">{channelTitle}</p>
          <button
            className="px-4 py-2 font-semibold border border-gray-200 rounded-xl ml-4"
            onClick={() => setJoined(!joined)}
          >
            {joined ? "Joined" : "Join"}
          </button>
          <button
            className="px-4 py-2 font-semibold bg-black text-white rounded-xl ml-2"
            onClick={() => setSubscribed(!subscribed)}
          >
            {subscribed ? "Unsubscribe" : "Subscribe"}
          </button>
        </div>

        <div className="flex">
          <div className="flex bg-gray-100 py-2 px-4 rounded-lg ml-20 items-center">
            {/* <img
              src={
                !liked
                  ? "https://png.pngitem.com/pimgs/s/129-1293150_file-like-svg-wikimedia-commons-png-youtube-blue.png"
                  : "https://png.pngitem.com/pimgs/s/165-1658491_youtube-like-button-like-button-youtube-png-transparent.png"
              }
              alt="like-btn"
              className="w-6 h-6 cursor-pointer"
              onClick={() => {
                setLiked(!liked);
              }}
            /> */}
            <button
              onClick={() => {
                setLiked(!liked);
              }}
            >
              <FaThumbsUp />
            </button>

            <p className="font-semibold px-2">
              {!liked ? likeCount : parseInt(likeCount) + 1}
            </p>
            <button>
              <FaThumbsDown />
            </button>
          </div>

          <button
            className={`ml-1  px-4 bg-gray-100 rounded-lg font-semibold py-2`}
          >
            Share
          </button>
          <button className="ml-1  px-4 bg-gray-100 rounded-lg font-semibold py-2">
            Download
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col w-full py-4">
      <div className="flex px-4 py-2">
        <div>
          <iframe
            width={
              isMenuOpen ? (isLive ? "1130" : "1440") : isLive ? "1300" : "1600"
            }
            height={
              isMenuOpen ? (isLive ? "580" : "580") : isLive ? "580" : "620"
            }
            src={"https://www.youtube.com/embed/" + searchParams.get("v")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          {renderVideoDetails()}
        </div>
        {isLive ? (
          <div className="w-full">
            <LiveChat />
          </div>
        ) : null}
      </div>
      <span
        className={`flex flex-col bg-gray-100 rounded-lg p-2 mx-4 mt-2 px-4 ${
          !showMore ? "cursor-pointer" : ""
        }`}
        onClick={() => {
          if (!showMore) setShowMore(true);
        }}
      >
        {!isLive ? (
          <div className="flex flex-row font-semibold">
            <p className="pr-1">
              {viewCount > 1000000
                ? `${Math.floor(viewCount / 1000000)}M `
                : viewCount > 1000
                ? `${Math.floor(viewCount / 1000)}K `
                : viewCount}
              views
            </p>
            <p className="font-bold pr-1">·</p>
            <p>{uploadedTimeAgo}</p>
          </div>
        ) : null}
        <div>
          <p className="pt-2">
            {showMore ? description : trimText(description, 200)}
          </p>
          <button
            className=" underline underline-offset-1 font-semibold"
            onClick={() => setShowMore(!showMore)}
          >
            {!showMore ? "...more" : "show Less"}
          </button>
        </div>
      </span>
      {!isLive ? (
        <CommentsContainer
          commentCount={commentCount}
          commentsData={comments}
        />
      ) : null}
    </div>
  );
};

export default WatchPage;
