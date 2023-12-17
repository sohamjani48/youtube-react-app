import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";

const Body = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  return (
    <div className="flex">
      <div className="fixed">
        <Sidebar />
      </div>
      <div className={`${isMenuOpen && "ml-48"} mt-16`}>
        <Outlet />
      </div>
    </div>
  );
};

export default Body;
