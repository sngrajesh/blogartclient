"use client";
import EventForm from "@/components/EventForm";
import JobForm from "@/components/JobForm";
import NewsForm from "@/components/NewsForm";
import React from "react";



const CreateJob = () => {
  const [type, setType] = React.useState("job");
  return (
    <>
      <div className="ml-auto flex flex-row min-w-min mt-4 mr-2 md:mt-0 md:mr-0">
        <button
          className={`${
            type === "job" ? "bg-gray-800 text-white" : "bg-gray-200"
          } px-4 py-2 rounded-l-lg`}
          onClick={() => setType("job")}
        >
          Job
        </button>
        <button
          className={`${
            type === "news" ? "bg-gray-800 text-white" : "bg-gray-200"
          } px-4 py-2 border border-gray-300 border-l-[1px] border-r-[1px]] border-t-0 border-b-0`}
          onClick={() => setType("news")}
        >
          News
        </button>
        <button
          className={`${
            type === "event" ? "bg-gray-800 text-white" : "bg-gray-200"
          } px-4 py-2 rounded-r-lg`}
          onClick={() => setType("event")}
        >
          Event
        </button>
      </div>
      {type === "job" && <JobForm />  }
      {type === "news" && <NewsForm />  }
      {type === "event" && <EventForm />  }
    </>
  );
};

export default CreateJob;
