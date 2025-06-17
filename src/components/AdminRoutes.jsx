// import React from "react";
// import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("Users"));

  if (!user || user.role !== "Admin") {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-[#60cef0] via-[#3f70c4] to-[#3035a0]">
        <h1 className="text-4xl font-bold text-black mb-4">Access Denied</h1>
        <p>This page is only accessible by admin users.</p>


          <div className=" items-center justify-center text-center mb-4">
                  <Link to="/">
                    <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
                      Back
                    </button>
                    <br></br>
                  </Link>
                </div>
      </div>
    );
  }

  return children;
};

export default AdminRoute;
