import React from "react";

const commentData = [
  {
    name: "Soham Jani",
    text: "Text 1",
    replies: [],
  },
  {
    name: "Soham Jani",
    text: "Text 20",
    replies: [
      {
        name: "Soham Jani",
        text: "Text 21",
        replies: [
          {
            name: "Soham Jani",
            text: "Text 22",
            replies: [
              {
                name: "Soham Jani",
                text: "Text 23",
                replies: [],
              },
            ],
          },
        ],
      },
      {
        name: "Soham Jani",
        text: "This is a small comment by soham.",
        replies: [],
      },
    ],
  },
  {
    name: "Soham Jani",
    text: "This is a small comment by soham.",
    replies: [{}],
  },
];

const Comment = React.memo(({ data }) => {
  const { name, text, replies } = data;
  return (
    <div className="flex mt-4">
      <img
        alt="user-image"
        src="https://freesvg.org/img/abstract-user-flat-3.png"
        className="w-10 h-10"
      />
      <div className="px-2">
        <p className="font-semibold text-sm">{name}</p>
        <p className="text-sm">{text}</p>
      </div>
    </div>
  );
});

const CommentsList = ({ comments }) => {
  return comments.map((comment, index) => (
    <div key={index}>
      <Comment data={comment} />
      <div className="ml-2 pl-4 border border-l-gray-300 border-l-2 border-r-0 border-t-0 border-b-0">
        {comment.replies?.length ? (
          <CommentsList comments={comment.replies} />
        ) : null}
      </div>
    </div>
  ));
};

const NestedCommentsContainer = ({ commentCount }) => {
  return (
    <div className="mx-4 my-4 p-2 bg-gray-100">
      <h1 className="font-bold text-xl">{`${commentCount} Comments`}</h1>
      <CommentsList comments={commentData} />
    </div>
  );
};

export default NestedCommentsContainer;
