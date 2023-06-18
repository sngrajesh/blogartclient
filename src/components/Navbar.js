"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Authform from "./Authform";

const Navbar = () => {
  const { isLogged, signOutHandler } = useContext(AuthContext);
  const [isAuthHidden, setIsAuthHidden] = useState(false);
  const [authType, setAuthType] = useState("signin");
  const [lastScrollY, setLastScrollY] = useState(0);
  // Auto hide link_container when scroling up in mobile
  const handleScroll = useCallback(() => {
    const link_container = document.getElementById("link_container");
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      if (window.scrollY > lastScrollY) {
        // if scroll down hide the navbar
        link_container.classList.remove("flex");
        link_container.classList.add("hidden");
      } else {
        // if scroll up show the navbar
        link_container.classList.remove("hidden");
        link_container.classList.add("flex");
      }
      // remember current page location to use in the next move
      setLastScrollY(window.scrollY);
    }
  }, [lastScrollY]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      <header className="text-gray-600 body-font shadow-bottom fixed top-0 left-0 bg-white w-full  bg-white-400 bg-clip-padding bg-opacity-80 backdrop-filter backdrop-blur-xl  border-b-gray-200 z-50 shadow-sm">
        {isAuthHidden && (
          <Authform authType={authType} setAuthType={setAuthType} 
          setIsAuthHidden={setIsAuthHidden}
          />
        )}
        <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center justify-between max-w-7xl">
          <div className="w-full md:w-fit flex title-font font-medium items-center text-gray-900 overflow-hidden justify-between">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <img
                  src="/logo.png"
                  alt=""
                  className="h-8 w-auto  bg-gray-100  rounded-s"
                />
                <span className="ml-3 text-xl">BlogArt</span>
              </div>
            </Link>

            {isLogged ? (
              <div
                onClick={signOutHandler}
                className="text-gray-600 md:hidden w-12 h-12 p-2 bg-gray-100 border-0 focus:outline-none rounded text-base"
              >
                <svg
                  width="32"
                  height="32"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M2 2.75C2 1.784 2.784 1 3.75 1h2.5a.75.75 0 0 1 0 1.5h-2.5a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h2.5a.75.75 0 0 1 0 1.5h-2.5A1.75 1.75 0 0 1 2 13.25V2.75zm10.44 4.5H6.75a.75.75 0 0 0 0 1.5h5.69l-1.97 1.97a.75.75 0 1 0 1.06 1.06l3.25-3.25a.75.75 0 0 0 0-1.06l-3.25-3.25a.75.75 0 1 0-1.06 1.06l1.97 1.97z"
                  />
                </svg>
              </div>
            ) : (
              <div
                onClick={() => setIsAuthHidden(!isAuthHidden)}
                className="text-gray-600 md:hidden w-12 h-12 p-2 bg-gray-100 border-0 focus:outline-none rounded text-base"
              >
                <svg
                  width="32"
                  height="32"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M2 2.75C2 1.784 2.784 1 3.75 1h2.5a.75.75 0 0 1 0 1.5h-2.5a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h2.5a.75.75 0 0 1 0 1.5h-2.5A1.75 1.75 0 0 1 2 13.25V2.75zm6.56 4.5l1.97-1.97a.75.75 0 1 0-1.06-1.06L6.22 7.47a.75.75 0 0 0 0 1.06l3.25 3.25a.75.75 0 1 0 1.06-1.06L8.56 8.75h5.69a.75.75 0 0 0 0-1.5H8.56z"
                  />
                </svg>
              </div>
            )}
          </div>
          <nav
            id="link_container"
            className="pb-3 md:pb-0 md:ml-auto md:mr-0 flex flex-wrap items-center justify-center cursor-pointer text-xl overflow-hidden mt-4 md:mt-0"
          >
            <Link href={"/"}>
              <span className="text-base mr-5 hover:text-gray-900 hover:border-b-2 border-blue-600 text-gray-700 ">
                Home
              </span>
            </Link>

            <Link href={"/jobs"}>
              <span className="text-base mr-5 hover:text-gray-900 hover:border-b-2 border-blue-600 text-gray-700 ">
                Jobs
              </span>
            </Link>
            <Link href={"/news"}>
              <span className="text-base mr-5 hover:text-gray-900 hover:border-b-2 border-blue-600 text-gray-700 ">
                News
              </span>
            </Link>
            <Link href={"/events"}>
              <span className="text-base mr-5 hover:text-gray-900 hover:border-b-2 border-blue-600 text-gray-700 ">
                Events
              </span>
            </Link>
           
            {
              // if user is logged in show logout button
              isLogged ? (
                <button
                  onClick={signOutHandler}
                  className="hidden md:inline-flex items-center bg-gray-100 border-0 py-1.5 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 hover:shadow-lg hover:text-blue-600 text-center"
                >
                  Sigh Out
                </button>
              ) : (
                <button
                  onClick={() => {
                    setAuthType("signin");
                    setIsAuthHidden(!isAuthHidden)}}
                  className="hidden md:inline-flex items-center bg-gray-100 border-0 py-1.5 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 hover:shadow-lg hover:text-blue-600 text-center"
                >
                  Login
                </button>
              )
            }
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
