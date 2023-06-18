import React from "react";
import {
  locationIcon,
  salaryIcon,
  jobTypeIcon,
  applicationTypeIcon,
  deadlineIcon,
} from "./../../../components/Icons";
export const generateStaticParams = async () => {
  const res = await fetch("https://blogartserver.onrender.com/api/v1/jobs");
  const json = await res.json();
  return json.results.map((job) => ({
    slug: job.slug,
  }));
};

// export const revalidate = 1;
export const revalidate = 172800;


const fetchJob = async (slug) => {
  const res = await fetch(`https://blogartserver.onrender.com/api/v1/jobs/${slug}`);
  const json = await res.json();
  return json;
};

const JobDescription = async ({ params: { slug } }) => {
  const job = await fetchJob(slug);

  return (
    <div className="md:flex md:flex-col md:flex-1 md:border-none overflow-y-auto md:overflow-y-auto bg-white rounded-lg md:p-3 fixed md:relative bottom-0 left-0 w-full h-[60vh] border border-t-2  z-10 max-h-[75vh] p-5">
      <h2 className="text-xl font-semibold mb-2 break-words">{job?.title}</h2>

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
      <div className="flex flex-row md:justify-start items-center flex-wrap gap-2">
        <div className="flex items-center justify-center bg-gray-200 rounded-md px-2 py-1 mr-2 mb-2  w-fit">
          {locationIcon(20, "#4b5563", "none")}

          <span className="text-gray-700 text-xs capitalize ">{job?.location}</span>
        </div>
        <div className="flex items-center justify-center bg-gray-200 rounded-md px-2 py-1 mr-2 mb-2 w-fit">
          {jobTypeIcon(18, "currentColor", "#4b5563")}

          <span className="text-gray-700 text-xs capitalize">{job?.jobtype}</span>
        </div>

        <div className="flex items-center justify-center bg-gray-200 rounded-md px-2 py-1 mr-2 mb-2 w-fit">
          {salaryIcon(18, "currentColor", "#4b5563")}

          <span className="text-gray-700 text-xs ">{job?.salary}</span>
        </div>
        <div className="flex items-center justify-center bg-gray-200 rounded-md px-2 py-1 mr-2 mb-2 w-fit">
          {applicationTypeIcon(18, "#4b5563", "none")}

          <span className="text-gray-700 text-xs capitalize">{job?.applicationtype}</span>
        </div>
        <div className="flex items-center justify-center bg-gray-200 rounded-md px-2 py-1 mr-2 mb-2 w-fit">
          {deadlineIcon(18, "currentColor", "#4b5563")}

          <span className="text-gray-700 text-xs capitalize">
           {new Date(job?.applicationdeadline).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div>
        <h3 className="text-base text-gray-700 font-semibold mb-2 mt-4">
          Skills Required
        </h3>
        <p className="mb-4 flex flex-wrap gap-1">
          {job?.skillsrequired?.map((e) => {
            return (
              <span
                key={e}
                className="bg-gray-200 rounded-full px-1.5 py-1 text-[10px] font-semibold capitalize text-gray-700 mr-2"
              >
                {e}
              </span>
            );
          })}
        </p>
      </div>
      <div>
        <h3 className="text-base text-gray-700 font-semibold mb-2 mt-4">
          Job Description
        </h3>
        <p className="text-gray-700 text-sm font-normal mb-4">{job?.desc}</p>
      </div>
      <div className="flex flex-row justify-between items-center mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={job?.userid?.profilePicture}
            className="p-1 w-14 h-14 rounded-full object-cover"
          />

          <div className="flex flex-col justify-center items-start">
            <div className="h-2.5  mb-2 text-sm font-semibold text-gray-800">
              {job?.userid?.name}
            </div>
            <div className="h-2.5 text-xs text-gray-700">
              Posted on {new Date(job?.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
        <a
          className="text-blue-500 text-sm font-bold bg-gray-200 rounded-md px-3 py-2 mb-2 w-fit cursor-pointer hover:shadow-lg"
          href={job?.applicationlink}
          target="_blank"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
};

export default JobDescription;
