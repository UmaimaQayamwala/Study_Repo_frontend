import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";


function AddNotes() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  // ...................................................... dummy wala.........................................
  const [image, setimage] = useState("");
  const [res, setres] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [fileimg, setfileimg] = useState("");
  function previewFiles(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      console.log(image);
      setimage(reader.result);
    };
  }
  // ...........................................................................................................

  //............................................................................. get pdf.......................
  const [allImage, setAllImage] = useState(null);
 

  useEffect(() => {
    getPdf();
  }, []);


  const getPdf = async () => {
    const result = await axios.get("http://localhost:4001/fileupload/get-files");
    // console.log("imagesss", result.data.data);
    setAllImage(result.data.data);
  };
  const handleChange = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    setfileimg(file);
    previewFiles(file); // function
  };

// .............................................................................
// ........................................cloudinary.............................

  const cloudinaryimageurl = async () => {
    const obj = { image: image };
    const result = await axios.post(
      "http://localhost:4001/img/imageUpload",
      obj
    );

    setres(result.data.url);
    // formData.append("url",result.url);
    // console.log("url", result.data.url);
  };





  const func = async () => {
    await cloudinaryimageurl(image);
    // console.log("urlllll...........", res);
  };
  // ................................................................................ .....................................
  // .................................................sending response to the backend.............................................

  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    formData.append("options", selectedOption);

    // alert("Uploaded Successfully!!!");
    // Your notification logic here

    const appe = async () => {
      formData.append("url", res);
      console.log("url aaraha append horaha", res);
    };

    console.log("db se pehle", res);


    const notify = async () => {
      const token = localStorage.getItem("token");
      // console.log("tokennnn",token);
      const result = await axios.post(
        "http://localhost:4001/fileupload/upload-files",
        formData,
        {
          headers: {
             "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
           },
         
        }
      );
      // console.log("form data gaya backend me", formData.url);

      if (result.data.status == "ok") {
        alert("Uploaded Successfully!!!");
        getPdf();
      }

      else{
         alert("not uploaded!!!");
      }
    };



    setTimeout(appe, 6000);
    setTimeout(notify, 8000);

  };


  const showPdf = (pdf) => {
    window.open(pdf, "_blank", "noreferrer");
    // setPdfFile(`http://localhost:4001/files/${pdf}`)
  };




  console.log("--------------------------------------------------------------",file);
  return (
    <div>
      <Navbar />
      <div className="min-h-screen">
        <div className="flex flex-col justify-center items-center h-52">
     
          <div className="mt-[350px]">
          <form
            className="  formStyle bg-white p-6 rounded shadow-md w-96 mt-96  "
            onSubmit={submitImage}
          >
            <h4 className="pl-[92px]  text-pink-700  text-lg">
              Upload Pdf in React
            </h4>
            <br />
            <input
              type="text"
              className="form-control ml-[60px] w-[240px]  h-7 pl-2 pr-1"
              placeholder="Title"
              required
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <select
              className="options mb-5 ml-[58px]"
              name="options"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="">-- Select an option --</option>
              <option value="Book"> Book</option>
              <option value="PYQ"> PYQ</option>
              <option value="Notes">Notes</option>w
            </select>
            <br />
            <input
              type="file"
              className="form-control ml-[60px]  text-black"
              accept="application/pdf"
              required
              onChange={(e) => setFile(e.target.files[0])}
            />
            <br />
            {/* .............................................................. */}
            <input
              type="file"
              id="fileInput"
              className="form-control ml-[60px] mb-[20px] text-black"
              onChange={(e) => handleChange(e)}
              required
              accept="image/png , image/jpeg , image/jfif"
            />
            {/* <button className="btn btn-primary  ml-[120px] " onClick={func}>
              upload imge
            </button> */}
            {/* ,,,,,,,,,,,,,,,,,,....................................................... */}
            <button className="btn btn-primary  ml-[120px]" type="submit">
              Submit
            </button>
          </form>
          </div>

          <div className=" mt-6">
            <button className="btn btn-primary" onClick={func}>Upload Image</button>
          </div>
        <br></br>
          {/* ................................................................................................. */}
         
       

          {/* <input
              type="file"
              id="fileInput"
              className=" ml-[60px] mb-[20px] text-gray-700"
              onChange={(e) => handleChange(e)}
              required
              accept="image/png , image/jpeg , image/jfif"
            /> */}
          {/* ................................................................................................ */}
        </div>
        <div className="mt-[580px] w-full text-center">
          <h4>Uploaded PDF:</h4>
          <div className="flex flex-wrap justify-evenly">
            {allImage == null
              ? ""
              : allImage.map((data, index) => (
                  <div key={index} className="flex flex-col m-4">
                    <h6>Title: {data.title}</h6>
                    <button
                      className="btn btn-primary"
                      onClick={() => showPdf(data.pdfurl)}
                    >
                      Show Pdf
                    </button>
                  </div>
                ))}
          </div>
        </div>
        {/* <PdfComp pdfFile={pdfFile}/> */}
      </div>
    </div>
  );
}

export default AddNotes;
