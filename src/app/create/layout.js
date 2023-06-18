import React from "react";

export const metadata = {
  title: "Create - Bloag Art",
  
};

const createLayout = ({ children }) => {
  return (
    <div className="flex flex-col gap-5 justify-center align-top  max-w-4xl mx-auto md:pt-20 pt-32 ">
      {children}
    </div>
  );
};

export default createLayout;
