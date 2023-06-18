"use client";
/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import React, { useState, useContext, useEffect } from "react";
 
const EventForm = () => {
  const { isLogged, localuser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState({
    title: "",
    desc: "",
    photo: "",
    category: "",
    eventlink: "",
    eventdate: "",
    eventtime: "",
    eventlocation: "",
  });

  const router = useRouter();

  React.useEffect(() => {
    if (!isLogged) {
      alert("You need to login first");
      router.push("/");
    }
  }, []);

  //Function to handle the change of the input fields
  const eventHandler = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  //Function to upload the event
  const submitHandler = (e) => {
    e.preventDefault();
    if (
      event.title === "" ||
      event.desc === "" ||
      event.photo === "" ||
      event.category === "" ||
      event.eventlink === "" ||
      event.eventdate === "" ||
      event.eventtime === "" ||
      event.eventlocation === ""
    ) {
      alert("Please fill all the fields");
      return;
    }

    setLoading(p => true);
    setTimeout(async () => {
      const res = await fetch(
        "https://blogartserver.onrender.com/api/v1/event/" + localuser._id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${
              JSON.parse(localStorage.getItem("bsuser")).accessToken
            }`,
          },
          body: JSON.stringify({
            title: event.title,
            slug:
              event.title.replace(/\s+/g, "-").trim() +
              "-" +
              new Date().getTime(),
            desc: event.desc,
            photo: event.photo,
            category: event.category,
            userid: localuser._id,
            eventdate: event.eventdate,
            eventtime: event.eventtime,
            eventlocation: event.eventlocation,
            eventlink: event.eventlink,
          }),
        }
      );
      const data = await res.json();

      if (res.status === 200) {
        alert("Event uploaded successfully");
      } else {
        alert("Event upload failed");
      }
    }, 1000);
    setLoading(p => false);
  };

  return (
    <>
      <section className="text-gray-600 body-font relative">
        <form className="container px-5 mx-auto">
          <div className="flex-col -m-2">
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="user"
                  className="leading-7 text-sm text-gray-600"
                >
                  Name :&nbsp;
                </label>
                <span className="text-sm border-b-2 border-blue-500">
                  {localuser?.name}
                </span>
              </div>
            </div>

            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="title"
                  className="leading-7 text-sm text-gray-600"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required={true}
                  placeholder="Eg: Software Developer , React Developer"
                  value={event.title}
                  onChange={eventHandler}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>

            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="desc"
                  className="leading-7 text-sm text-gray-600"
                >
                  Description
                </label>
                <textarea
                  rows="4"
                  type="text"
                  id="desc"
                  name="desc"
                  placeholder="Eg: We are looking for a React Developer with 2+ years of experience"
                  value={event.desc}
                  onChange={eventHandler}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out resize-y"
                />
              </div>
            </div>

            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="category"
                  className="leading-7 text-sm text-gray-600"
                >
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  placeholder="Eg: Tech , Marketing etc."
                  value={event.category}
                  onChange={eventHandler}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>


            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="photo"
                  className="leading-7 text-sm text-gray-600"
                >
                 Photo
                </label>
                <input
                  required={true}
                  type="text"
                  id="photo"
                  name="photo"
                  placeholder="Eg: https://www.xyz.com/event.."
                  value={event.photo}
                  onChange={eventHandler}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>

            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="eventlink"
                  className="leading-7 text-sm text-gray-600"
                >
                    Event Link
                </label>
                <input
                  required={true}
                  type="text"
                  id="eventlink"
                  name="eventlink"
                  placeholder="Eg: https://www.xyz.com/event.."
                  value={event.eventlink}
                  onChange={eventHandler}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>

            
            <div className="w-full flex flex-row justify-center items-center gap-2">
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="eventdate"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Application Deadline
                  </label>
                  <input
                    required={true}
                    type="date"
                    id="eventdate"
                    name="eventdate"
                    placeholder="Eg: 2021-09-30"
                    value={event.eventdate}
                    onChange={eventHandler}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="eventtime"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Event Time
                  </label>
                  <input
                    required={true}
                    type="time"
                    id="eventtime"
                    name="eventtime"
                    placeholder="Eg: 100000"
                    value={event.eventtime}
                    onChange={eventHandler}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
            </div>

            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="eventlocation"
                  className="leading-7 text-sm text-gray-600"
                >
                  Event Location
                </label>
                <input
                  required={true}
                  type="text"
                  id="eventlocation"
                  name="eventlocation"
                  placeholder="Eg: Bangalore, Karnataka"
                  value={event.eventlocation}
                  onChange={eventHandler}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>

            <div className="p-2 w-full">
              <button
                disabled={loading}
                className="flex mx-auto text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg hover:drop-shadow-lg"
                onClick={submitHandler}
              >
                {loading ? (
                  <span>
                    <img
                      className="h-7 w-7"
                      src="/loading.gif"
                      alt="Loading..."
                    />
                  </span>
                ) : (
                  <span>Submit Event</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EventForm;
