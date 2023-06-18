import Link from "next/link";
import React from "react";

 
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between max-w-4xl mx-auto md:pt-20 pt-32  ">
      <div className="flex flex-col items-center justify-center gap-5 h-[90vh]">
        <h1 className="text-6xl font-bold text-center text-gray-800">
          Welcome to <span className="text-blue-500">Bloag Art</span>
        </h1>
        <p className="text-2xl text-center text-gray-700">
          Discover an all-in-one platform that combines a comprehensive job
          portal and up-to-date job news portal. Explore a wide range of Job,
          Events opportunities and stay informed about the latest trends and
          developments in your industry.
        </p>
        <div className="flex flex-col items-center justify-center space-y-4">
          <Link
            href="/jobs"
            className="bg-blue-500 text-white px-6 py-2 rounded-md font-semibold text-lg hover:bg-blue-600"
          >
            Find Jobs
          </Link>
          <Link
            href="/create"
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md font-semibold text-lg hover:bg-gray-300"
          >
            Post a Job
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center space-y-4  mt-[50vh]">
        <h2 className="text-4xl font-bold text-center text-gray-800">
          Features
        </h2>
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex flex-col items-center justify-center space-y-4">
            <h3 className="text-2xl font-bold text-center text-gray-800">
              Find Your Dream Job
            </h3>
            <p className="text-xl text-center text-gray-700">
              JobConnect is your go-to job portal where you can explore a wide
              range of career opportunities tailored to your skills, experience,
              and aspirations. Discover thousands of job listings from top
              companies across industries and take the first step towards your
              dream career.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-4">
            <h3 className="text-2xl font-bold text-center text-gray-800">
              Stay Informed with Job News
            </h3>
            <p className="text-xl text-center text-gray-700">
              Stay ahead of the competition and stay informed about the latest
              trends, developments, and insights in the job market. Our
              dedicated team of experts curates timely and relevant job news
              articles, providing you with valuable information to enhance your
              job search strategies and career growth.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-4">
            <h3 className="text-2xl font-bold text-center text-gray-800">
              Explore Industry-Specific Insights
            </h3>
            <p className="text-xl text-center text-gray-700">
              Dive deep into your desired industry and gain industry-specific
              insights through our comprehensive articles and reports. Stay
              updated on market trends, skill requirements, and emerging job
              opportunities to stay competitive and make informed career
              decisions.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-4">
            <h3 className="text-2xl font-bold text-center text-gray-800">
              Career Development Workshops
            </h3>
            <p className="text-xl text-center text-gray-700">
              Enhance your professional skills and broaden your knowledge base
              through our career development workshops. Led by industry experts,
              these workshops cover a wide range of topics, including resume
              building, interview techniques, personal branding, and more.
              Upgrade your skills and stand out from the competition.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
