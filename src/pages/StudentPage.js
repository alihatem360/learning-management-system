import React, { useEffect, useState } from "react";
import axios from "axios";
import RegisterCourseModal from "../components/RegisterCourseModal";
import BaisUrl from "../BaisUrl";
const StudentPage = () => {
  const [courses, setCourses] = useState([]);
  //   get user from local storage
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get(`${BaisUrl}/student/showCouresewithGrades`, {
        headers: {
          token: user.token,
        },
      })
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user.token]);

  return (
    <div className="position-relative container my-5">
      <div className="position-absolute top-0 end-0 ">
        <RegisterCourseModal />
      </div>
      <div className="my-5">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Course Name</th>
              <th scope="col">Code</th>
              <th scope="col">Grade</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={index}>
                <td>{course.courseName}</td>
                <td>{course.code}</td>
                <td>{course.grade ? course.grade : "Not Graded Yet"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentPage;
