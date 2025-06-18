// import React from "react";

import { useEffect } from "react";
import { useState } from "react";
import Login from "./Login";
import Logout from "./Logout";
import { useAuth } from "../context/AuthProvider";
import { Link } from 'react-router-dom';



// import logo from "../../public/logo.jpg";


// eslint-disable-next-line react/prop-types
function Navbar({ onInputChange }) {
 
   const [authUser] =useAuth();
   const logo=import.meta.env.VITE_API_logo
 

  // eslint-disable-next-line no-unused-vars
  const [sticky, setSticky] = useState(false);
  const [searchText , setSearchText] = useState('');


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  
console.log("search",searchText);
  const navItems = (
    <>
      {/* <li>
        <a href="/"  className="text-white hover:text-yellow-400">Home</a>
      </li>
      <li>
        <a href="/course" className="text-white hover:text-yellow-400">Notes</a>
      </li>
      <li>
        <a href="/books" className="text-white hover:text-yellow-400">Bookes</a>
      </li>
      <li>
        <a href="/pyq" className="text-white hover:text-yellow-400">PYQs</a>
      </li>
      <li>
        <a href="/addnotes" className="text-white hover:text-yellow-400">Upload</a>
      </li> */}

      <Link to="/" className="text-white hover:text-yellow-400">Home</Link>
<Link to="/course" className="text-white hover:text-yellow-400">Notes</Link>
<Link to="/books" className="text-white hover:text-yellow-400">Books</Link>
<Link to="/pyq" className="text-white hover:text-yellow-400">PYQs</Link>
<Link to="/addnotes" className="text-white hover:text-yellow-400">Upload</Link>

    </>
  );


  return (
    <>
      <div
      
        className="w-full h-[100px] px-0 py-0 fixed top-0 z-50 border-none"

      >
       {/* <div className="navbar bg-gradient-to-r from-[#96ccdd] via-[#3f70c4] to-[#3035a0] bg-opacity-80 backdrop-blur-md"> */}
       <div className="navbar bg-[#0a1f44]  bg-opacity-80 backdrop-blur-md ">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {navItems}
              </ul>
            </div>
            <img className="w-[80px] h-[75px]"src={logo} alt="" />
            <a className=" text-2xl text-white font-bold cursor-pointer ml-[5px]">StudyRepo</a>
          </div>
          <div className="navbar-end space-x-3">
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">{navItems}</ul>
            </div>
            <div className="hidden md:block">
              <label className=" px-3 py-2 border rounded-md flex items-center gap-2">
                <input
                  type="text"
                  className="grow outline-none rounded-md px-1 bg-black text-slate-300"
                  placeholder="Search"
                  onChange={(e) => {setSearchText(e.target.value.replace(/\s+/g, ''));
                    onInputChange(searchText)
                  }
                }

                 
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
            </div>
            <label className="swap swap-rotate">
              {/* this hidden checkbox controls the state */}
              <input
                type="checkbox"
                className="theme-controller"
                value="synthwave"
              />

             
             

             
            </label>

            {authUser ? (
              <Logout />
            ) : (
              <div className="">
                <a
                  className="bg-black text-white px-3 py-2 rounded-md hover:bg-slate-800 duration-300 cursor-pointer"
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                >
                  Login
                </a>
                <Login />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
