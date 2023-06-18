"use client";
import Link from "next/link";
import React, { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { jobTypeIcon, applicationTypeIcon } from "./../components/Icons";
import { useRouter } from "next/navigation";
export const JobCard = ({ job }) => {
  const router = useRouter();
  const { localuser, deteteAnyHandler } = useContext(AuthContext);
  const deleteHandler = async () => {
    let res = await deteteAnyHandler("jobs", job._id);
    if (res === 200) {
      alert("News deleted successfully");
      router.push("/jobs");
      
    } else {
      alert("Something went wrong");
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-lg md:hover:shadow-xl p-6 md:w-full w-11/12 md:mx-0 mx-auto mb-4">
      <Link href={`../jobs/${job?.slug}`}>
        <div>
          <h2 className="text-xl font-semibold mb-2 break-words">
            {job?.title}
          </h2>
          <div className="flex items-center justify-start mb-4">
            <img
              src={job?.companylogo}
              alt={job?.companyname}
              className="h-8 w-auto max-w-[60] mr-2"
            />
            <span className="text-gray-700 text-xs font-bold">
              {job?.companyname}
            </span>
          </div>
          <p className="mb-4 flex flex-wrap gap-1 gapv">
            {job?.skillsrequired?.map((e) => {
              return (
                <span
                  key={e}
                  className="capitalize bg-gray-200 rounded-full px-1.5 py-1 text-[10px] font-semibold text-gray-700 mr-2"
                >
                  {e}
                </span>
              );
            })}
          </p>

          <div className="flex flex-wrap">
            <div className="flex items-center justify-center bg-gray-200 rounded-md px-2 py-1 mr-2 mb-2">
              {jobTypeIcon(18, "currentColor", "#4b5563")}
              <span className="text-xs font-bold text-gray-700 ml-1 capitalize">
                {job?.jobtype}
              </span>
            </div>
            <div className="flex items-center justify-center bg-gray-200 rounded-md px-2 py-1 mr-2 mb-2">
              {applicationTypeIcon(18, "#4b5563", "none")}
              <span className="text-xs font-bold text-gray-700 ml-1 capitalize">
                {job?.applicationtype}
              </span>
            </div>
          </div>
          <div
            className={`flex items-center justify-center bg-gray-200 rounded-md px-2 py-1 mr-2 mt-2 ${
              job?.applicationdeadline < new Date().toISOString().slice(0, 10)
                ? "bg-red-200"
                : "bg-green-200"
            }`}
          >
            {
              <span className="text-xs text-gray-700 ml-1 capitalize">
                {job?.applicationdeadline}
              </span>
            }
          </div>
          {(localuser?._id === job?.userid?._id || localuser?.isAdmin) && (
            <div className="flex justify-end px-2 py-0.5 mr-2 mt-2">
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
      </Link>
    </div>
  );
};
