import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getChannelThumbnailUrl, timeSince, trimText } from "../utils/helper";

const VideoCard = ({ data }) => {
  const { snippet, statistics } = data;
  const {
    channelTitle,
    title,
    thumbnails,
    liveBroadcastContent = false,
  } = snippet;

  const [thumb, setThumb] = useState(null);
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  const getThumbnail = async (channelId) => {
    const channelThumbnailUrl = await getChannelThumbnailUrl(channelId);
    setThumb(channelThumbnailUrl);
  };
  const uploadedTimeAgo = timeSince(snippet.publishedAt);

  useEffect(() => {
    getThumbnail(snippet.channelId);
  });

  return (
    <div
      className={`p-2 m-2 ${
        isMenuOpen ? "w-[350px]" : "w-[400px]"
      }  rounded-md`}
    >
      {liveBroadcastContent === "live" ? (
        <p className="px-2 py-1 bg-red-700 absolute font-bold text-white border border-black rounded-lg">
          Live
        </p>
      ) : null}
      <img
        src={thumbnails.medium.url}
        alt="thumbnail"
        className="rounded-lg w-full"
      />
      <div className="flex flex-row">
        <div className="flex py-1 pr-2 mt-1 flex-1">
          <img
            src={thumb ?? ""}
            alt="channel-thumb"
            className="w-10 h-10 rounded-full"
          />
        </div>
        <div className="flex flex-col w-10/12">
          <ul>
            <li className="font-bold py-1">{trimText(title, 60)}</li>
            <li>{channelTitle}</li>
            <li>
              {liveBroadcastContent !== "live" ? (
                <span className="flex flex-row">
                  <p className="pr-1">
                    {statistics?.viewCount > 1000000
                      ? `${Math.floor(statistics.viewCount / 1000000)}M `
                      : statistics?.viewCount > 1000
                      ? `${Math.floor(statistics.viewCount / 1000)}K `
                      : statistics?.viewCount}
                    views
                  </p>
                  <p className="font-bold pr-1">·</p>
                  <p>{uploadedTimeAgo}</p>
                </span>
              ) : null}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export const AdVideoCard = ({ data }) => (
  <div className="p-1 m-1 border border-red-500">
    <VideoCard data={data} />
  </div>
);

export default VideoCard;
