"use client";
import EventCard from "@/components/EventCard";
import LoadingImage from "@/components/LoadingElements/LoadingImage";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const LoadingEvent = () => {
  return (
    <div className="flex flex-col gap-2 bg-white rounded-lg shadow-md p-6 h-fit md:hover:shadow-xl">
      <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-600 w-2/3"></div>
      <LoadingImage />
      <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-600 w-2/3"></div>
      <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-600 w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-600 w-1/3"></div>
    </div>
  );
};

const getEvents = async (page = 1, sort = "new") => {
  try {
    const res = await fetch(
      `https://blogartserver.onrender.com/api/v1/event?page=${page}&limit=5&sort=${sort}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [totalLength, setTotalLength] = useState(0);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("new");

  const fetchMoreEvents = async () => {
    const data = await getEvents(page, sort);
    setEvents([...events, ...data.results]);
    setPage(page + 1);
  };

  useEffect(() => {
    setPage(1);
    setEvents([]);
    setTotalLength(0);
    const fetchEvents = async () => {
      const data = await getEvents(1, sort);
      setTotalLength(data?.totalEvent || 0);
      setEvents(data?.results);
      setPage((prevPage) => prevPage + 1);
    };
    fetchEvents();
  }, [sort]);

  return (
    <>
      <div className="ml-auto flex flex-row min-w-min mt-4 mr-2 md:mt-0 md:mr-0">
        <button
          className={`${
            sort === "new" ? "bg-gray-800 text-white" : "bg-gray-200"
          } px-4 py-2 rounded-l-lg`}
          onClick={() => setSort("new")}
        >
          New
        </button>
        <button
          className={`${
            sort === "old" ? "bg-gray-800 text-white" : "bg-gray-200"
          } px-4 py-2 rounded-r-lg`}
          onClick={() => setSort("old")}
        >
          Old
        </button>
      </div>
      <div className="container mx-auto">
        <div>
          <InfiniteScroll
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
            dataLength={events.length}
            next={fetchMoreEvents}
            hasMore={events.length < totalLength}
            loader={
              <>
                <LoadingEvent />
                <LoadingEvent />
              </>
            }
            endMessage={
              <h4 className="text-center text-gray-800 p-2  my-4 text-base">
                All Events loaded
              </h4>
            }
          >
            {events?.map((event) => (
              <EventCard key={event?._id} event={event} />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
};

export default EventPage;
