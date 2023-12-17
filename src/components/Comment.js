import React, { useEffect, useState } from "react";

import { DOWN_CARET_IMG_LINK, UP_CARET_IMG_LINK } from "../utils/constants";
import { getChannelThumbnailUrl, timeSince } from "../utils/helper";

const Comment = ({ commentData }) => {
  const { totalReplyCount, topLevelComment } = commentData?.snippet;
  const {
    authorDisplayName,
    textOriginal,
    authorChannelId,
    textDisplay,
    likeCount,
    publishedAt,
  } = topLevelComment?.snippet;

  const [commentLiked, setCommentLiked] = useState(false);
  const [repliesExpanded, setRepliesExpanded] = useState(false);

  const commentTimeSince = timeSince(publishedAt);

  const [commentAuthorThumbnailUrl, setCommentAuthorThumbnailUrl] =
    useState("");

  const getAuthorThumbnailUrl = async (channelId) => {
    const channelThumbnailUrl = await getChannelThumbnailUrl(channelId);
    setCommentAuthorThumbnailUrl(channelThumbnailUrl);
  };

  useEffect(() => {
    getAuthorThumbnailUrl(authorChannelId.value);
  }, []);

  return (
    <>
      <div className="flex mt-4">
        <img
          alt="user-image"
          src={commentAuthorThumbnailUrl || ""}
          className="w-10 h-10 rounded-full"
        />
        <div className="px-2">
          <div className="flex gap-2">
            <p className="font-bold text-sm">{authorDisplayName}</p>
            <div className="text-sm">{commentTimeSince}</div>
          </div>
          <p className="text-sm">{textOriginal}</p>
        </div>
      </div>
      <div className="flex bg-gray-100 py-1 px-2 rounded-lg ml-10 items-center">
        <img
          src={
            !commentLiked
              ? "https://png.pngitem.com/pimgs/s/129-1293150_file-like-svg-wikimedia-commons-png-youtube-blue.png"
              : "https://png.pngitem.com/pimgs/s/165-1658491_youtube-like-button-like-button-youtube-png-transparent.png"
          }
          alt="like-btn"
          className="w-5 h-5 cursor-pointer"
          onClick={() => setCommentLiked(!commentLiked)}
        />
        <p className="font-semibold pl-2 text-xs">
          {commentLiked ? parseInt(likeCount) + 1 : likeCount}
        </p>
      </div>
      {totalReplyCount ? (
        <div
          className="flex cursor-pointer py-1 ml-10 px-2 items-center"
          onClick={() => setRepliesExpanded(!repliesExpanded)}
        >
          <img
            src={repliesExpanded ? UP_CARET_IMG_LINK : DOWN_CARET_IMG_LINK}
            alt="caret-down"
            className="w-3 h-2"
          />
          <p className="font-bold pl-2 text-sm">
            {`${totalReplyCount} ${
              totalReplyCount === 1 ? "Reply" : "Replies"
            }`}
          </p>
        </div>
      ) : null}
    </>
  );
};

export default React.memo(Comment);
