import React from "react";
import { Link } from "react-router-dom";
import onlineCourseImage from "../assets/online-course.png";
import instructorImage from "../assets/male.png";
function AdminPage() {
  return (
    <div>
      <h1 className="text-center">Admin Page</h1>
      <div className="text-center d-flex justify-content-center align-items-center my-5">
        <Link to="/admin/get-all-courses" className="mx-5 text-dark">
          <img src={onlineCourseImage} alt="online course" width="200px" />
          <p>manage courses</p>
        </Link>
        <Link to="/admin/get-all-instructors" className="mx-5 text-dark">
          <img src={instructorImage} alt="instructor" width="200px" />\{" "}
          <p>manage instructors</p>
        </Link>
      </div>
    </div>
  );
}

export default AdminPage;
