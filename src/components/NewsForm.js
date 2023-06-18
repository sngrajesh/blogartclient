"use client";
/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { crossIcon } from "./Icons";
import React, { useState, useContext, useEffect } from "react";

const NewsForm = () => {
  const { isLogged, localuser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState({
    title: "",
    slug: "",
    excerpt: "",
    desc: "",
    category: [],
    photo: [],
  });

  const router = useRouter();

  useEffect(() => {
    if (!isLogged) {
      alert("You need to login first");
      router.push("/");
    }
  }, []);

  //Function to handle the change of the input fields
  const newsHandler = (e) => {
    setNews({ ...news, [e.target.name]: e.target.value });
  };

  //Function to upload the news
  const submitHandler = (e) => {
    e.preventDefault();
    if (
      news.title === "" ||
      news.excerpt === "" ||
      news.desc === "" ||
      news.category.length === 0 ||
      news.photo.length === 0
    ) {
      alert("Please fill all the fields");
      return;
    }
    setLoading((p) => true);
    setTimeout(async () => {
      const res = await fetch(
        "https://blogartserver.onrender.com/api/v1/news/" + localuser._id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${
              JSON.parse(localStorage.getItem("bsuser")).accessToken
            }`,
          },
          body: JSON.stringify({
            title: news.title,
            slug:
              news.title.replace(/\s+/g, "-").trim() +
              "-" +
              new Date().getTime(),
            excerpt: news.excerpt,
            desc: news.desc,
            photo: news.photo,
            category: news.category,
            userid: localuser._id,
          }),
        }
      );

      if (res.status === 200) {
        alert("News uploaded successfully");
        setNews({
          title: "",
          slug: "",
          excerpt: "",
          desc: "",
          category: [],
          photo: [],
        });
        router.push("/news");
      } else {
        alert("News upload failed");
      }
    }, 1000);
    setLoading((p) => false);
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
                  placeholder="Eg: Google announces new job openings"
                  value={news.title}
                  onChange={newsHandler}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="excerpt"
                  className="leading-7 text-sm text-gray-600"
                >
                  Excerpt
                </label>
                <textarea
                  rows="2"
                  type="text"
                  id="excerpt"
                  name="excerpt"
                  required={true}
                  placeholder="A small description about the news"
                  value={news.excerpt}
                  onChange={newsHandler}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out resize-y"
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
                  required={true}
                  placeholder="A detailed description about the news"
                  value={news.desc}
                  onChange={newsHandler}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out resize-y"
                ></textarea>
              </div>
            </div>

            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="photo"
                  className="leading-7 text-sm text-gray-600"
                >
                  Photos
                </label>
                <input
                  type="text"
                  id="photo"
                  name="photo"
                  required={true}
                  placeholder="Eg: https://www.google.com/images/branding.png (Press Enter to add)"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const newPhoto = e.target.value.trim();
                      if (news.photo.includes(newPhoto)) return;
                      if (newPhoto !== "") {
                        setNews({
                          ...news,
                          photo: [...news.photo, newPhoto],
                        });
                        e.target.value = "";
                      }
                    }
                  }}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="flex flex-row flex-wrap mt-2">
                <div className="flex flex-row gap-1 flex-wrap">
                  {news.photo.map((el) => (
                    <div
                      className="flex flex-row text-xs items-center gap-2 px-2.5 py-1.5 rounded-lg bg-gray-200 hover:shadow-md"
                      key={el}
                    >
                      <span>{el}</span>
                      <button
                        className="focus:outline-none"
                        onClick={() =>
                          setNews({
                            ...news,
                            photo: news.photo.filter((skill) => skill !== el),
                          })
                        }
                      >
                        {crossIcon(15, "#4b5563", "currentColor")}
                      </button>
                    </div>
                  ))}
                </div>
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
                  required={true}
                  placeholder="Eg: Technology , Business, StartUp (Press Enter to add)"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const newCat = e.target.value.toLowerCase().trim();
                      if (news.category.includes(newCat)) return;
                      if (newCat !== "") {
                        setNews({
                          ...news,
                          category: [...news.category, newCat],
                        });
                        e.target.value = "";
                      }
                    }
                  }}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="flex flex-row flex-wrap mt-2">
                <div className="flex flex-row gap-1 flex-wrap">
                  {news.category.map((el) => (
                    <div
                      className="flex flex-row text-xs items-center gap-2 px-2.5 py-1.5 rounded-lg bg-gray-200 hover:shadow-md capitalize"
                      key={el}
                    >
                      <span>{el}</span>
                      <button
                        className="focus:outline-none"
                        onClick={() =>
                          setNews({
                            ...news,
                            category: news.category.filter(
                              (skill) => skill !== el
                            ),
                          })
                        }
                      >
                        {crossIcon(15, "#4b5563", "currentColor")}
                      </button>
                    </div>
                  ))}
                </div>
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
                  <span>Submit News</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default NewsForm;
