// import React from "react";
import { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
function Pyqs() {
  const [book, setBook] = useState([]);
  const [inputText, setinputText] = useState("");

  const handleInputChange = (valueFromChild) => {
    setinputText(valueFromChild);
  };


  const booksfilter= book.filter((item) => item.options === "PYQ")

  const filteredLocations = booksfilter.filter((res) =>
    res.title
      .trim()
      .replace(/\s+/g, "")
      .toLowerCase()
      .includes(inputText.toLowerCase())
  );



  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:4001/fileupload/get-files");
        // console.log("ress", res.data);
        setBook(res.data.data);
        // console.log("book", book);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);

  return (
    <>
    <Navbar  onInputChange={handleInputChange}/>
      <div className=" min-h-screen container mx-auto md:px-20 flex flex-col  px-4">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl  md:text-4xl text-rose-500 font-2xl font-bold">
           PYQs
            {/* <span className="text-pink-700"> Success!</span> */}
          </h1>

          <p className=" mt-12 text-xl text-white">
          No more waiting—empower your mind with the right materials at your fingertips!!! 
          <p className="font-bold text-xl text-black">&quot;Click below to download and begin!&quot;</p>
            </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4">
        {filteredLocations.length > 0
            ? filteredLocations  // first filter
            .map((item) => (
              
              <Cards item={item} key={item.id} />
             
            ))
            : booksfilter  // first filter
            .map((item) => (
              
              <Cards item={item} key={item.id} />
             
            ))}
        </div>
        <br></br>
        <div className=" items-center justify-center text-center mb-4">
          <Link to="/">
            <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
              Back
            </button>
            <br></br>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Pyqs;
