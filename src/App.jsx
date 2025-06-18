// import React from "react";
import Home from "./home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Courses from "./courses/Courses";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";
import AddNotes from "./components/AddNotes";

import Books from "./components/Books";
import Pyqs from "./components/Pyqs";
import AdminRoute from "./components/AdminRoutes";

function App() {
  const [authUser] = useAuth();
  
  console.log(authUser);
  return (
    <>
    
      <div className="bg-gradient-to-r from-[#60cef0] via-[#3f70c4] to-[#3035a0]">
        {/* <div className=" "> */}
        <Routes>
          <Route path="/" element={<AddNotes />} />
          <Route
            path="/course"
            element={authUser ? <Courses /> : <Navigate to="/signup" />}
          />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/addnotes"
            element={
              <AdminRoute>
                <AddNotes />
              </AdminRoute>
            }
          />
          <Route path="/Books" element={<Books />} />

          <Route path="/pyq" element={<Pyqs />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
