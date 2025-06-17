// import React from "react";
import { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function Course() {
  const [book, setBook] = useState([]);
  const [inputText, setinputText] = useState("");

  const handleInputChange = (valueFromChild) => {
    setinputText(valueFromChild);
  };

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

  const booksfilter= book.filter((item) => item.options === "Notes")

  const filteredLocations = booksfilter.filter((res) =>
    res.title
      .trim()
      .replace(/\s+/g, "")
      .toLowerCase()
      .includes(inputText.toLowerCase())
  );


  return (
    <>
         <Navbar onInputChange={handleInputChange} />
      <div className=" max-w-screen-2xl container mx-auto md:px-20 flex flex-col  px-4">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl  md:text-4xl text-black font-2xl font-bold">
            Your all-in-one destination for academic
            <span className="text-rose-500"> Success!</span>
          </h1>
          <p className="mt-12 text-white">
            Welcome to StudyRepo, your one-stop destination for high-quality
            study notes and previous year question papers across a wide range of
            subjects and courses. Whether you&apos;re preparing for college exams,
            competitive tests, or just aiming to strengthen your concepts, we&apos;ve
            got your back!!!
          </p>
          <p className="text-rose-500  text-lg font-bold">
            Your Shortcut to Clarity – Download Notes & PYQs Now!
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4">
          {/* {book == null
            ? ""
            : book.filter((item) => item.options === "Notes") // first filter
                          .map((item) => (
                          
                            <Cards item={item} key={item.id} />
                           ))} */}
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

export default Course;
