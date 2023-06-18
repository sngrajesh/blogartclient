"use client";
import React, { useEffect, useState } from "react";
import Card from "@/components/Card";
import LoadingCard from "@/components/LoadingCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { crossIcon } from "./../../components/Icons";
const getNews = async (page, sort, category) => {
  try {
    const res = await fetch(
      `https://blogartserver.onrender.com/api/v1/news?limit=5&page=${page}&sort=${sort}` +
        (category.length > 0 ? `&cat=${category.join(",")}` : "")
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const News = () => {
  const [news, setNews] = useState([]);
  const [totalLength, setTotalLength] = useState(0);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("new");
  const [category, setCategory] = useState([]);

  const fetchMoreNews = async () => {
    const data = await getNews(page, sort, category);
    setNews([...news, ...data.results]);
    setPage(page + 1);
  };
  useEffect(() => {
    setPage(1);
    setNews([]);
    setTotalLength(0);
    const fetchNews = async () => {
      const data = await getNews(1, sort, category);
      setNews(data?.results);
      setTotalLength(data?.totalNews || 0);
      setPage((prevPage) => prevPage + 1);
    };
    fetchNews();
  }, [sort, category]);
  return (
    <>
      <div className="flex  flex-col md:flex-row justify-between gap-2 px-3 md:px-0 mt-4 md:mt-0">
        <div className="flex flex-col gap-2 justify-between items-start">
          <input
            type="text"
            onKeyDown={(e) => {
              
              if (e.key === "Enter") {
                if (category.includes(e.target.value.toLowerCase())) return;
                if (
                  e.target.value === "" ||
                  e.target.value === " " 
                  || category.length > 6
                )
                  return;
                setCategory([...category, e.target.value.toLowerCase()]);
                e.target.value = "";
              }
            }}
            placeholder="Category"
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent w-full md:w-fit"
          />

          {
            <div className="flex flex-row gap-1 flex-wrap">
              {category.map((cat) => (
                <div
                className="flex flex-row text-xs items-center gap-2 px-2.5 py-1.5 rounded-lg bg-gray-200 hover:shadow-md"
                key={cat}
                >
                  <span>{cat.toUpperCase()}</span>
                  <button
                    className="focus:outline-none"
                    onClick={() =>
                      setCategory(category.filter((c) => c !== cat))
                    }
                  >
                    {crossIcon(15, "#4b5563", "currentColor")}
                  </button>
                </div>
              ))}
            </div>
          }
        </div>
        <div className="flex flex-row min-w-min ">
          <button
            className={`${
              sort === "new" ? "bg-gray-800 text-white" : "bg-gray-200"
            } px-4 py-2 rounded-l-lg h-min`}
            onClick={() => setSort("new")}
          >
            New
          </button>
          <button
            className={`${
              sort === "old" ? "bg-gray-800 text-white" : "bg-gray-200"
            } px-4 py-2 rounded-r-lg h-min`}
            onClick={() => setSort("old")}
          >
            Old
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <InfiniteScroll
          dataLength={news?.length}
          className="flex flex-col gap-4"
          next={fetchMoreNews}
          hasMore={news?.length < totalLength}
          loader={<LoadingCard />}
          endMessage={
            <h4 className="text-center text-gray-800 p-2  my-4 text-base">
              All news loaded
            </h4>
          }
        >
          {news &&
            news?.map((newsitem) => (
              <Card news={newsitem} key={newsitem._id} />
            ))}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default News;
