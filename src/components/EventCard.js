"use client";
import React, { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { clockIcon, locationIcon, deadlineIcon } from "./../components/Icons";

const EventCard = ({ event }) => {
  const { localuser, deteteAnyHandler } = useContext(AuthContext);
  const deleteHandler = async () => {
    let res = await deteteAnyHandler("event", event._id);
    if (res === 200) {
      alert("News deleted successfully");
      window.location.reload();
    } else {
      alert("Something went wrong");
    }
  };
  return (
    <div className="flex flex-col gap-2 bg-white rounded-lg shadow-md p-6 h-fit md:hover:shadow-xl">
      <h2 className="font-bold text-lg uppercase text-gray-900">
        {event.title}
      </h2>
      <img
        src={event.photo[0]}
        alt={event.title}
        className="mb-4 rounded-lg w-full"
      />
      <div className="relative h-10">
        <details className="absolute top-0 right-0 bg-gray-200 hover:bg-gray-100 rounded-lg p-2 cursor-pointer w-full z-10 select-none">
          <summary className="font-bold text-gray-900 text-sm">
            Description
          </summary>
          <p className="mb-4 z-10 text-sm p-2">{event.desc}</p>
        </details>
      </div>

      <div className="flex flex-wrap">
        <div className="flex items-center justify-center bg-gray-200 rounded-md px-2 py-1 mr-2 mb-2">
          {deadlineIcon(18, "currentColor", "#4b5563")}
          <span className="text-xs  text-gray-700 ml-1">
            {new Date(event.eventdate).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "numeric",
              day: "numeric",
            })}
          </span>
        </div>
        <div className="flex items-center justify-center bg-gray-200 rounded-md px-2 py-1 mr-2 mb-2">
          {clockIcon(19, "#4b5563", "none")}
          <span className="text-xs   text-gray-700 ml-1">
            {event.eventtime.toString()}
          </span>
        </div>
        <div className="flex items-center justify-center bg-gray-200 rounded-md px-2 py-1 mr-2 mb-2">
          {locationIcon(20, "#4b5563", "none")}
          <span className="text-xs text-gray-700 ml-1">
            {event.eventlocation}
          </span>
        </div>
      </div>
      {event?.eventlink && (
        <a
          href={event?.eventlink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-fit text-sm bg-green-200 rounded-md px-2 py-1 ml-auto"
        >
          View Event
        </a>
      )}
      {(localuser?._id === event?.userid?._id || localuser?.isAdmin) && (
        <div className="flex justify-end">
          <button
            onClick={() => {
              if (confirm("Are you sure you want to delete this news?")) {
                deleteHandler();
              }
            }}
            className="w-fit text-sm bg-red-400 rounded-md px-2 py-1 ml-auto text-white hover:bg-red-500 transition duration-200 ease-in-out"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default EventCard;
