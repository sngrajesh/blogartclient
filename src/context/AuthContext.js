"use client";
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();
let URL = "https://blogartserver.onrender.com/api/v1/";

export const AuthContextProvider = ({ children }) => {
  const [localuser, setLocaluser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [isError, setisError] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setisError(false);
    const user = localStorage.getItem("bsuser");
    if (user) {
      setLocaluser(JSON.parse(user));
      setIsLogged(true);
      setIsAdmin(JSON.parse(user).isAdmin);
    }
  }, []);

  const signInHandler = async (user) => {
    setLoading(true);
    let res;
    try {
      res = await fetch(URL + "auth/signin", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res?.status === 200) {
        const data = await res.json();
        localStorage.setItem("bsuser", JSON.stringify(data));
        setIsLogged(true);
        setLocaluser(data);
        setIsAdmin(data.isAdmin);
      } else {
        setisError(true);
      }
    } catch (error) {
      setisError(true);
    }
    setLoading(false);
    return res?.status;
  };

  const signUpHandler = async (user) => {
    setLoading(true);
    let res;
    try {
      res = await fetch(URL + "auth/signup", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      setisError(true);
    }
    if (res?.status !== 200) {
      setisError(true);
    }

    setLoading(false);
    return res?.status;
  };

  const signOutHandler = () => {
    localStorage.removeItem("bsuser");
    setIsLogged(false);
    setLocaluser(null);
    setIsAdmin(false);
  };

  const deteteAnyHandler = async (any, anyid) => {
    setLoading(true);
    let res;
    let id = JSON.parse(localStorage.getItem("bsuser"))._id;
    try {
      res = await fetch(URL + `${any}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${
            JSON.parse(localStorage.getItem("bsuser")).accessToken
          }`,
        },
        body: JSON.stringify({
          _id: `${anyid}`,
          userid: `${id}`,
        }),
      });
    } catch (error) {
      setisError(true);
    }
    setLoading(false);
    return res.status;
  };

  return (
    <AuthContext.Provider
      value={{
        localuser,
        isLogged,
        isAdmin,
        isError,
        loading,
        setisError,
        signUpHandler,
        signInHandler,
        signOutHandler,
        deteteAnyHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return React.useContext(AuthContext);
};
