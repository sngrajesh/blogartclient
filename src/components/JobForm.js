"use client";
/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import React, { useState, useContext, useEffect } from "react";
import { crossIcon } from "./Icons";

const JobForm = () => {
  const { isLogged, localuser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState({
    title: "",
    desc: "",
    companylogo: "",
    companyname: "",
    skillsrequired: [],
    applicationlink: "",
    applicationdeadline: "",
    jobtype: "",
    applicationtype: "",
    salary: "",
    location: "",
  });

  const router = useRouter();

  React.useEffect(() => {
    if (!isLogged) {
      alert("You need to login first");
      router.push("/");
    }
  }, []);

  //Function to handle the change of the input fields
  const jobsHandler = (e) => {
    setJobs({ ...jobs, [e.target.name]: e.target.value });
  };

  //Function to upload the jobs
  const submitHandler = async (e) => {
    if (
      jobs.title === "" ||
      jobs.desc === "" ||
      jobs.companylogo === "" ||
      jobs.companyname === "" ||
      jobs.skillsrequired.length === 0 ||
      jobs.applicationlink === "" ||
      jobs.applicationdeadline === "" ||
      jobs.jobtype === "" ||
      jobs.applicationtype === "" ||
      jobs.salary === "" ||
      jobs.location === ""
    ) {
      alert("Please fill all the fields");
      return;
    }

    e.preventDefault();
    setLoading((p) => true);

    const res = await fetch(
      "https://blogartserver.onrender.com/api/v1/jobs/" + localuser._id,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${
            JSON.parse(localStorage.getItem("bsuser")).accessToken
          }`,
        },
        body: JSON.stringify({
          title: jobs.title,
          slug:
            jobs.title.replace(/\s+/g, "-").trim() + "-" + new Date().getTime(),
          desc: jobs.desc,
          companylogo: jobs.companylogo,
          companyname: jobs.companyname,
          skillsrequired: jobs.skillsrequired,
          userid: localuser._id,
          applicationlink: jobs.applicationlink,
          applicationdeadline: jobs.applicationdeadline,
          jobtype: jobs.jobtype.toLowerCase(),
          applicationtype: jobs.applicationtype.toLowerCase(),
          salary: jobs.salary.toString(),
          location: jobs.location.toLowerCase(),
        }),
      }
    );

    if (res.status === 200) {
      alert("Jobs uploaded successfully");
    } else {
      alert("Jobs upload failed");
    }

    setLoading((p) => false);
  };

  return (
    <>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 mx-auto">
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
                  value={jobs.title}
                  onChange={jobsHandler}
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
                  required={true}
                  placeholder="Eg: We are looking for a React Developer with 2+ years of experience"
                  value={jobs.desc}
                  onChange={jobsHandler}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out resize-y"
                />
              </div>
            </div>

            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="companyname"
                  className="leading-7 text-sm text-gray-600"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyname"
                  name="companyname"
                  required={true}
                  placeholder="Eg: XYZ Pvt Ltd"
                  value={jobs.companyname}
                  onChange={jobsHandler}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>

            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="companylogo"
                  className="leading-7 text-sm text-gray-600"
                >
                  Company Logo
                </label>
                <input
                  type="text"
                  id="companylogo"
                  name="companylogo"
                  required={true}
                  placeholder="Eg: https://www.xyz.com/logo.png"
                  value={jobs.companylogo}
                  onChange={jobsHandler}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>

            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="skillsrequired"
                  className="leading-7 text-sm text-gray-600"
                >
                  Skills Required
                </label>
                <input
                  type="text"
                  id="skillsrequired"
                  name="skillsrequired"
                  required={true}
                  placeholder="Eg: React, Node, MongoDB etc. Press Enter to add more skills"
                  onKeyDown={(e) => {
                  
                    if (e.key === "Enter") {
                      setJobs({
                        ...jobs,
                        skillsrequired: [
                          ...jobs.skillsrequired,
                          e.target.value.toLowerCase(),
                        ],
                      });
                      e.target.value = "";
                    }
                  }}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="flex flex-row flex-wrap mt-2">
                <div className="flex flex-row gap-1 flex-wrap">
                  {jobs.skillsrequired.map((el) => (
                    <div
                      className="flex flex-row text-xs items-center gap-2 px-2.5 py-1.5 rounded-lg bg-gray-200 hover:shadow-md"
                      key={el}
                    >
                      <span>{el.toUpperCase()}</span>
                      <button
                        className="focus:outline-none"
                        onClick={() =>
                          setJobs({
                            ...jobs,
                            skillsrequired: jobs.skillsrequired.filter(
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
              <div className="relative">
                <label
                  htmlFor="applicationlink"
                  className="leading-7 text-sm text-gray-600"
                >
                  Application Link
                </label>
                <input
                  type="text"
                  id="applicationlink"
                  name="applicationlink"
                  required={true}
                  placeholder="Eg: https://www.xyz.com/apply"
                  value={jobs.applicationlink}
                  onChange={jobsHandler}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="w-full flex flex-row justify-center items-center gap-2">
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="applicationdeadline"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Application Deadline
                  </label>
                  <input
                    type="date"
                    id="applicationdeadline"
                    name="applicationdeadline"
                    placeholder="Eg: 2021-09-30"
                    value={jobs.applicationdeadline}
                    onChange={jobsHandler}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="salary"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Salary
                  </label>
                  <input
                    type="number"
                    min={0}
                    id="salary"
                    name="salary"
                    required={true}
                    placeholder="Eg: 100000"
                    value={jobs.salary}
                    onChange={jobsHandler}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
            </div>

            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="jobtype"
                  className="leading-7 text-sm text-gray-600"
                >
                  Job Type
                </label>
                <input
                  type="text"
                  id="jobtype"
                  name="jobtype"
                  required={true}
                  placeholder="Eg: Full Time, Part Time, Internship"
                  value={jobs.jobtype}
                  onChange={jobsHandler}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="applicationtype"
                  className="leading-7 text-sm text-gray-600"
                >
                  Application Type
                </label>
                <input
                  type="text"
                  id="applicationtype"
                  name="applicationtype"
                  required={true}
                  placeholder="Eg: On-site, Remote, Hybrid etc."
                  value={jobs.applicationtype}
                  onChange={jobsHandler}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>

            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="location"
                  className="leading-7 text-sm text-gray-600"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  required={true}
                  placeholder="Eg: Bangalore, Karnataka"
                  value={jobs.location}
                  onChange={jobsHandler}
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
                  <span>Submit Jobs</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobForm;
