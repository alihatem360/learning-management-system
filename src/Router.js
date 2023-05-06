import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Instructor from "./pages/InstructorPage";
import Student from "./pages/StudentPage";
import Admin from "./pages/AdminPage";
import AdminAddCourse from "./pages/AdminAddCourse";
import AdminGetAllCourses from "./pages/AdminGetAllCourses";
import AdminGetAllInstructor from "./pages/AdminGetAllInstructor";
import AdminAddInstructor from "./pages/AdminAddInstructor";
import UpdateInstructor from "./pages/AdminUpdateInstructor";
import EnrolledStudents from "./pages/EnrolledStudents";
function Router() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/instructor" element={<Instructor />} />
          <Route path="/student" element={<Student />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/add-course" element={<AdminAddCourse />} />
          <Route
            path="/admin/get-all-courses"
            element={<AdminGetAllCourses />}
          />

          <Route
            path="/admin/get-all-instructors"
            element={<AdminGetAllInstructor />}
          />
          <Route
            path="/admin/add-instructor"
            element={<AdminAddInstructor />}
          />
          <Route
            path="/admin/update-instructor/:id"
            element={<UpdateInstructor />}
          />
          <Route
            path="/admin/course-details/:code"
            element={<EnrolledStudents />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
