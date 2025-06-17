// import React from "react";
import { useEffect, useState } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import axios from "axios";

import Cards from "./Cards";
function Freebook() {
  const [book, setBook] = useState([]);
  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("https://studyrepo-backend.onrender.com/fileupload/get-files");
        // console.log("ress", res.data);
        setBook(res.data.data);
        // console.log("book", book);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div>
          <h1 className="font-bold text-xl pb-2 text-rose-500  ">
            Top Study Picks for You
          </h1>
          <p className="text-white">
            Get instant access to well-structured notes, solved PYQs, and
            essential study guides tailored to help you revise faster and
            smarter. Whether you&apos;re brushing up on concepts or diving deep
            into subjects, these resources are designed to support your academic
            success.
          </p>
        </div>

        <div>
          {/* <div className="mt-12 grid grid-cols-1 md:grid-cols-4"></div> */}
          <Slider {...settings}>
            {book
              .filter((item) => item.options === "Book") // first filter
              .map((item) => (
                <div key={item.id} className="p-2">
                <div className="w-[370px] mx-auto">
                <Cards item={item} key={item.id} />
                </div>
                </div>
              ))}
          </Slider>
        </div>
      </div>
    </>
  );
}
export default Freebook;
