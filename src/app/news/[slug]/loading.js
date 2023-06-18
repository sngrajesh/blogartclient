import LoadingImage from "@/components/LoadingElements/LoadingImage";
import LoadingPara from "@/components/LoadingElements/LoadingPara";
import LoadingUser from "@/components/LoadingElements/LoadingUser";
import React from "react";

const Loading = () => {
  return (
    <>
      <div
        role="status"
        className="w-full p-4 animate-pulse md:p-6 flex flex-col gap-3 "
      >
        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-600 w-2/3"></div>
        <LoadingImage />
        <LoadingUser />
        <LoadingPara />
        <LoadingPara />
        <LoadingPara />
      </div>
    </>
  );
};

export default Loading;
