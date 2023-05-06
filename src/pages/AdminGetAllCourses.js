import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateCourseModal from "../components/UpdateCourseModal";
import BaisUrl from "../BaisUrl";
const AdminGetAllCourses = () => {
  // get user from local storage
  const user = JSON.parse(localStorage.getItem("user"));
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [courseId, setCourseId] = useState("");
  useEffect(() => {
    console.log(user.token, "user.token");
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BaisUrl}/admin/allCourses`, {
          headers: {
            token: "e70324527bd63ab8d25840e45195ea8e2",
          },
        });
        setCourses(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourses();
  }, []);

  const handleDelete = async (courseId) => {
    console.log(courseId, "courseId");
    try {
      await axios.delete(`${BaisUrl}/deleteCourse/${courseId}`, {
        headers: {
          token: "e70324527bd63ab8d25840e45195ea8e2",
        },
      });
      setCourses(courses.filter((course) => course.id !== courseId));
      alert("Course deleted successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between my-3 w-100 ">
        <a href="/admin " className="btn btn-outline-warning">
          back to dashboard <i className="fas fa-arrow-left"></i>
        </a>

        <a href="/admin/add-course" className="btn btn-outline-success">
          Add Course <i className="fas fa-plus"></i>
        </a>
      </div>
      <div>
        <h2>All Courses</h2>
        <UpdateCourseModal
          showModal={showModal}
          setShowModal={setShowModal}
          courseId={courseId}
        />
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Code</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.id}</td>
                <td>{course.name}</td>
                <td>{course.code}</td>
                <td>{course.status}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(course.id)}
                  >
                    Delete
                  </button>{" "}
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-toggle="modal"
                    onClick={() => setShowModal(true) & setCourseId(course.id)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminGetAllCourses;
