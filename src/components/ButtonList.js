import React from "react";

import Button from "./Button";

const btnList = [
  "All",
  "Gaming",
  "Music",
  "News",
  "Cricket",
  "Sports",
  "Cooking",
];

const ButtonList = () => {
  return (
    <div className="flex">
      {btnList.map((btnName) => (
        <Button btnText={btnName} />
      ))}
    </div>
  );
};

export default ButtonList;
