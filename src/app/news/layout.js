import React from "react";


export const metadata = {
  title: "News - Bloag Art",
  description: "Stay up to date with the latest news from Bloag Art",
};

const NewsLayout = ({ children }) => {

  return (
    <div className="flex flex-col gap-5 justify-center align-top  max-w-4xl mx-auto md:pt-20 pt-32 ">
      {children}
    </div>
  );
};

export default NewsLayout;
