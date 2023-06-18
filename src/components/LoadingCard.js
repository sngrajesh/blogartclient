import React from "react";
import LoadingPara from "./LoadingElements/LoadingPara";
import LoadingUser from "./LoadingElements/LoadingUser";
import LoadingImage from "./LoadingElements/LoadingImage";

const LoadingCard = () => {
  return (
    <div
      role="status"
      className="w-full p-4 animate-pulse md:p-6 flex flex-col gap-3 "
    >
      <LoadingImage />
      <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-600 w-2/3"></div>
      <div className="flex items-center w-full space-x-2">
        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-20"></div>
        <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-600 w-20"></div>
      </div>
      <LoadingPara />
      <LoadingUser />
    </div>
  );
};

export default LoadingCard;
