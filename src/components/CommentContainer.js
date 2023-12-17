import React from "react";

import Comment from "./Comment";

const CommentsList = ({ comments }) => {
  return comments?.items?.map((comment) => (
    <Comment commentData={comment} key={comment.id} />
  ));
};

const CommentsContainer = ({ commentCount, commentsData = null }) => {
  return (
    <div className="mx-4 my-4 p-2 bg-gray-100">
      <h1 className="font-bold text-xl">{`${
        commentsData ? commentCount : 0
      } Comments`}</h1>
      {commentsData ? <CommentsList comments={commentsData} /> : null}
    </div>
  );
};

export default CommentsContainer;
