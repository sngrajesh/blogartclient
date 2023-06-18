"use client";

/* eslint-disable @next/next/no-img-element */
 import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Authform = ({ authType, setAuthType, setIsAuthHidden }) => {
  const {
    isError,
    isLogged,
    loading,
    signUpHandler,
    signInHandler,
    setisError,
  } = useContext(AuthContext);

  const [userFrom, setUserFrom] = useState({
    name: "",
    email: "",
    password: "",
    profilepicture: "/profile.png",
  });

  useEffect(() => {
    setisError(false);
  }, []);

  const handleFormChange = (e) => {
    setUserFrom({
      ...userFrom,
      [e.target.name]: e.target.value,
    });
  };

  const ValidateEmail = (email_id) => {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email_id.match(mailformat)) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ValidateEmail(userFrom.email)) {
      alert("Invalid email address!");
      return;
    }
    if (userFrom.password.length < 6) {
      alert("Password must be atleast 6 characters long!");
      return;
    }
    if (authType === "signin") {
      const res = await signInHandler({
        email: userFrom.email,
        password: userFrom.password,
      });
      if (res === 200) {
        setIsAuthHidden(false);
      }
    }
    if (authType === "signup") {
      if (userFrom.name.length < 6) {
        alert("Name must be atleast 6 characters long!");
        return;
      }
      const res = await signUpHandler(userFrom);
      if (res === 200) {
        setAuthType("signin");
      }
    }
  };

  return (
    <form className="md:w-[270px] w-[90%] bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto mt-10 md:mt-0 absolute md:top-20 md:right-6 shadow-lg top-1/3 right-1/2  md:translate-x-0 md:translate-y-0 translate-x-1/2 translate-y-1/2">
      <h2 className="text-gray-900 text-lg font-medium title-font ">
        {authType === "signin" ? "Sign In" : "Sign Up"}
      </h2>
      <div
        className="cursor-pointer select-none"
        onClick={() => {
          setAuthType((prev) => (prev === "signin" ? "signup" : "signin"));
        }}
      >
        <p className="text-xs text-blue-500 mb-3">
          {authType === "signin"
            ? "New User? Sign Up"
            : "Already have an account? Sign In"}
        </p>
      </div>
      {authType === "signup" && (
        <div className="relative mb-2">
          <label htmlFor="name" className="leading-7 text-xs text-gray-600">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            onChange={handleFormChange}
          />
        </div>
      )}
      <div className="relative mb-2">
        <label htmlFor="email" className="leading-7 text-xs text-gray-600">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          onChange={handleFormChange}
        />
      </div>
      <div className="relative mb-2">
        <label htmlFor="password" className="leading-7 text-xs text-gray-600">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          onChange={handleFormChange}
        />
      </div>
      <button
        className="flex mx-auto mt-2 text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-base hover:drop-shadow-lg items-center"
        onClick={handleSubmit}
        disabled={loading}
        type="submit"
      >
        {loading ? (
          <span>
            <img className="h-6 w-6" src="/loading.gif" alt="Loading..." />
          </span>
        ) : (
          "Submit"
        )}
      </button>
      {isError && (
        <p className="text-xs text-red-500 mt-2 text-center">
          There is an error in your form
        </p>
      )}
    </form>
  );
};

export default Authform;
