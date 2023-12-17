import React, { useEffect, useState } from "react";

import { getChannelThumbnailUrl, timeSince, trimText } from "../utils/helper";

const SearchVideoCard = ({ data }) => {
  const { snippet } = data;
  const {
    channelTitle,
    title,
    thumbnails,
    liveBroadcastContent = false,
  } = snippet;

  const [thumb, setThumb] = useState(null);
  const getThumbnail = async (channelId) => {
    const channelThumbnailUrl = await getChannelThumbnailUrl(channelId);
    setThumb(channelThumbnailUrl);
  };
  const uploadedTimeAgo = timeSince(snippet.publishedAt);

  useEffect(() => {
    getThumbnail(snippet.channelId);
  });

  return (
    <div className="p-2 m-2 w-[350px] rounded-md">
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
            <li className="font-semibold py-1">{trimText(title, 60)}</li>
            <li>{channelTitle}</li>
            <li>
              {!liveBroadcastContent ? (
                <span className="flex flex-row">
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

export default SearchVideoCard;
