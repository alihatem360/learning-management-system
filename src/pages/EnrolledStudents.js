import { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { FaSave } from "react-icons/fa";
import { useParams } from "react-router-dom";
import BaisUrl from "../BaisUrl";
const EnrolledStudents = () => {
  // get user from local storage
  const user = JSON.parse(localStorage.getItem("user"));
  // Define a state variable to store the list of enrolled students
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const instructorCode = useParams().code;
  //   console.log(instructorCode, "instructorCode");

  // Fetch the list of enrolled students from the API when the component mounts
  useEffect(() => {
    console.log(user.token, "user.token", instructorCode);
    const fetchEnrolledStudents = async () => {
      try {
        // Make a GET request to the API to fetch the enrolled students
        const response = await axios.get(
          `${BaisUrl}/instructor/enrolledStudents`,
          {
            code: instructorCode,
          },
          {
            headers: {
              token: "e7043727bd63ab8d25840e45195ea8e4",
            },
          }
        );
        console.log(response.data, "response.data");
        // Set the enrolledStudents state variable with the response
        setEnrolledStudents(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEnrolledStudents();
  }, []);

  // Define a function to update the grade for a student
  const updateGrade = (studentId, grade) => {
    // Make a PUT request to update the grade for the student
    axios
      .put(`${BaisUrl}/instructor/grades/${studentId}`, { grade })
      .then((response) => {
        // Update the enrolledStudents state variable with the updated grade
        const updatedEnrolledStudents = enrolledStudents.map((student) => {
          if (student.studentId === studentId) {
            return { ...student, grade };
          }
          return student;
        });
        setEnrolledStudents(updatedEnrolledStudents);
      });
  };

  return (
    <div>
      <h2>Enrolled Students</h2>
      {/* Display the list of enrolled students in a table */}
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Student ID</th>
            <th>Grade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody></tbody>
      </Table>
    </div>
  );
};

export default EnrolledStudents;
