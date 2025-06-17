
import axios from "axios";


/* eslint-disable react/prop-types */

function Cards({ item }) {
  const user = JSON.parse(localStorage.getItem("Users")); // get user from storage
 

  const v = item;
  

  
  const showPdf = (pdfurl) => {
    window.open(pdfurl, "_blank", "noreferrer");
    // setPdfFile(`http://localhost:4001/files/${pdf}`)
  };

  const del = async (item) => {
    const bookId = item._id;

    // console.log(bookId);
    const token = localStorage.getItem("token");
    const res = await axios.delete(
      `http://localhost:4001/book/delete/${bookId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    alert("Deleted successfully");
    console.log("delete ka res", res);

    window.location.reload();
  };
  return (
    <>
      <div className="mt-4 my-3 p-3">
        <div className="w-92 bg-white/10 backdrop-blur-md border border-black/90 text-white dark:text-white dark:border rounded-xl p-4 shadow-xl hover:scale-105 transition-transform duration-200">
          <figure>
            <img
              className="h-[220px] w-[260px] mx-auto"
              src={v.url}
              alt="books"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {v.title}
              <div className="badge badge-secondary">{v.options}</div>
            </h2>
            <p>{v.title}</p> {/* add subject*/}
            <div className="card-actions justify-between">
              {/* <div className="badge badge-outline">Delete</div> */}
              <button
                className="cursor-pointer px-2 py-1 bg-pink-500 rounded-full border-[1px] hover:bg-rose-500 hover:text-white duration-200 "
                onClick={() => {
                  if (user.role !== "Admin") {
                    alert("Only admins can delete items!");
                  } else {
                    del(item);
                  }
                }}
              >
                {" "}
                Delete
              </button>
              <button
                className=" cursor-pointer px-2 py-1 rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-200"
                onClick={() => showPdf(item.pdfurl)}
              >
                OPEN
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
