"use client";
import React from "react";
import { JobCard } from "@/components/JobCard";
import LoadingCompany from "@/components/LoadingElements/LoadingCompany";
import LoadingPara from "@/components/LoadingElements/LoadingPara";
import InfiniteScroll from "react-infinite-scroll-component";
import { crossIcon, settingIcon } from "./../../components/Icons";




const fetchJobs = async (
  page = 1,
  sort = "new",
  skills = [],
  jobType = [],
  location = [],
  applicationType = []
) => {
   const res = await fetch(
    `https://blogartserver.onrender.com/api/v1/jobs?limit=5&page=${page}&sort=${sort}` +
      (skills.length > 0 ? `&skills=${skills.join(",")}` : "") +
      (jobType.length > 0 ? `&jobType=${jobType.join(",")}` : "") +
      (location.length > 0 ? `&location=${location.join(",")}` : "") +
      (applicationType.length > 0
        ? `&applicationType=${applicationType.join(",")}`
        : "")
  );
  const json = await res.json();
  return json;
};

const Loading = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:w-full w-11/12 md:mx-0 mx-auto mb-2">
      <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-600 w-2/3"></div>
      <LoadingCompany />
      <LoadingPara />
    </div>
  );
};

const JobsLayout = ({ children }) => {
  const [jobs, setJobs] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [sort, setSort] = React.useState("new");
  const [skills, setSkills] = React.useState([]);
  const [jobType, setJobType] = React.useState([]);
  const [location, setLocation] = React.useState([]);
  const [applicationType, setApplicationType] = React.useState([]);
  const [settingVisible, setSettingVisible] = React.useState(false);
  const [totalJobs, setTotalJobs] = React.useState(0);
  const fetchMoreJobsAndSetJobs = async () => {
    try {
      const newJobs = await fetchJobs(page, sort);
      setJobs(jobs.concat(newJobs?.results));
      setPage(page + 1);
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    setPage(1);
    setJobs([]);
    setTotalJobs(0);
    const fetchJobsAndSetJobs = async () => {
      try {
        const newJobs = await fetchJobs(
          1, sort, skills, jobType, location, applicationType
          
          );
        setJobs(newJobs?.results);
        setTotalJobs(newJobs?.totalJobs);
        setPage((page) => page + 1);
      } catch (err) {
        console.error(err);
      }
    };
    fetchJobsAndSetJobs();
  }, [sort, skills, jobType, location, applicationType]);

  return (
    <div className="relative md:flex md:flex-row md:justify-center align-top  md:max-w-4xl mx-auto md:pt-20 pt-40 min-h-screen gap-4 ">
      <div className="relative flex flex-col pr-1.5 pb-5  md:w-1/3 md:max-w-[33%] w-90vw  md:mx-0 mx-auto">
        <div
          className={`absolute  flex flex-col gap-2 justify-between items-start p-4 z-10 w-[calc(100%-32px)] mx-4 md:mx-0 md:w-auto bg-white rounded-lg ${
            settingVisible ? "shadow-xl" : "shadow-none"
          }`}
        >
          <button
            className="bg-gray-200 rounded-lg p-2 focus:outline-none"
            onClick={() => setSettingVisible(!settingVisible)}
          >
            {settingIcon(22, "#4b5563", "currentColor")}
          </button>
          {settingVisible && (
            <div className="flex flex-col justify-between gap-2 px-3 md:px-0 mt-4 md:mt-2 md:w-[30vw] w-full">
              <>
                <input
                  type="text"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (skills.includes(e.target.value.toLowerCase())) return;
                      if (
                        e.target.value === "" ||
                        e.target.value === " " ||
                        skills.length > 6
                      )
                        return;
                      setSkills([...skills, e.target.value.toLowerCase()]);
                      e.target.value = "";
                    }
                  }}
                  placeholder="Skills(React, Node, Python, ...)"
                  className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent w-full"
                />

                <div className="flex flex-row gap-1 flex-wrap">
                  {skills.map((cat) => (
                    <div
                      className="flex flex-row text-xs items-center gap-2 px-2.5 py-1.5 rounded-lg bg-gray-200 hover:shadow-md"
                      key={cat}
                    >
                      <span>{cat.toUpperCase()}</span>
                      <button
                        className="focus:outline-none"
                        onClick={() =>
                          setSkills(skills.filter((c) => c !== cat))
                        }
                      >
                        {crossIcon(15, "#4b5563", "currentColor")}
                      </button>
                    </div>
                  ))}
                </div>
              </>

              <>
                <input
                  type="text"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (jobType.includes(e.target.value.toLowerCase()))
                        return;
                      if (
                        e.target.value === "" ||
                        e.target.value === " " ||
                        jobType.length > 6
                      )
                        return;
                      setJobType([...jobType, e.target.value.toLowerCase()]);
                      e.target.value = "";
                    }
                  }}
                  placeholder="Job Type (Full Time, Part Time, Internship , Contract)"
                  className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent w-full"
                />

                <div className="flex flex-row gap-1 flex-wrap">
                  {jobType.map((cat) => (
                    <div
                      className="flex flex-row text-xs items-center gap-2 px-2.5 py-1.5 rounded-lg bg-gray-200 hover:shadow-md"
                      key={cat}
                    >
                      <span>{cat.toUpperCase()}</span>
                      <button
                        className="focus:outline-none"
                        onClick={() =>
                          setJobType(jobType.filter((c) => c !== cat))
                        }
                      >
                        {crossIcon(15, "#4b5563", "currentColor")}
                      </button>
                    </div>
                  ))}
                </div>
              </>
              <>
                <input
                  type="text"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (
                        applicationType.includes(e.target.value.toLowerCase())
                      )
                        return;
                      if (
                        e.target.value === "" ||
                        e.target.value === " " ||
                        applicationType.length > 6
                      )
                        return;
                      setApplicationType([
                        ...applicationType,
                        e.target.value.toLowerCase(),
                      ]);
                      e.target.value = "";
                    }
                  }}
                  placeholder="Application Type (Hybrid, Remote, On-site )"
                  className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent w-full"
                />

                <div className="flex flex-row gap-1 flex-wrap">
                  {applicationType.map((cat) => (
                    <div
                      className="flex flex-row text-xs items-center gap-2 px-2.5 py-1.5 rounded-lg bg-gray-200 hover:shadow-md"
                      key={cat}
                    >
                      <span>{cat.toUpperCase()}</span>
                      <button
                        className="focus:outline-none"
                        onClick={() =>
                          setApplicationType(
                            applicationType.filter((c) => c !== cat)
                          )
                        }
                      >
                        {crossIcon(15, "#4b5563", "currentColor")}
                      </button>
                    </div>
                  ))}
                </div>
              </>

              <>
                <input
                  type="text"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (location.includes(e.target.value.toLowerCase()))
                        return;
                      if (
                        e.target.value === "" ||
                        e.target.value === " " ||
                        location.length > 6
                      )
                        return;
                      setLocation([...location, e.target.value.toLowerCase()]);
                      e.target.value = "";
                    }
                  }}
                  placeholder="Location (Mumbai, Delhi, Bangalore, .....)"
                  className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent w-full"
                />

                <div className="flex flex-row gap-1 flex-wrap">
                  {location.map((cat) => (
                    <div
                      className="flex flex-row text-xs items-center gap-2 px-2.5 py-1.5 rounded-lg bg-gray-200 hover:shadow-md"
                      key={cat}
                    >
                      <span>{cat.toUpperCase()}</span>
                      <button
                        className="focus:outline-none"
                        onClick={() =>
                          setLocation(location.filter((c) => c !== cat))
                        }
                      >
                        {crossIcon(15, "#4b5563", "currentColor")}
                      </button>
                    </div>
                  ))}
                </div>
              </>

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
          )}
        </div>

        <InfiniteScroll
          dataLength={jobs.length}
          next={fetchMoreJobsAndSetJobs}
          hasMore={jobs.length < totalJobs}
          loader={<Loading />}
          className="mt-16"
          endMessage={
            <h4 className="text-center text-gray-800 p-2  my-4 text-base">
              All Jobs loaded
            </h4>
          }
        >
          {jobs?.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </InfiniteScroll>
      </div>
      <div
        id="jobDescription"
        className="md:sticky md:top-20 flex flex-col md:w-2/3 w-full bg-white rounded-lg shadow-lg h-fit overflow-y-auto overflow-x-hidden "
      >
        {children}
      </div>
    </div>
  );
};

export default JobsLayout;
