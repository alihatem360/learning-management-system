import React, { useEffect, useState } from "react";
import axios from "axios";
import { Badge } from "react-bootstrap";
import InstructorImage from "../assets/male.png";
import { Link } from "react-router-dom";
import AdminAssignCourse from "./AdminAssignCourse";
import BaisUrl from "../BaisUrl";
const AdminGetAllInstructor = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const fetchInstructors = async () => {
      const response = await axios.get(`${BaisUrl}/admin/allInstrctors`, {
        headers: {
          token: "e70324527bd63ab8d25840e45195ea8e2",
        },
      }); // replace with your own API endpoint
      setInstructors(response.data);
    };
    fetchInstructors();
  }, []);

  const handleDelete = async (instructorId) => {
    console.log(instructorId, "instructorId");
    try {
      await axios.delete(`${BaisUrl}/admin/deleteInstrctor/${instructorId}`, {
        headers: {
          token: "e70324527bd63ab8d25840e45195ea8e2",
        },
      });
      setInstructors(
        instructors.filter((instructor) => instructor._id !== instructorId)
      );
      alert("Instructor deleted successfully!");
      window.location.href = "/admin/get-all-instructors";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center my-3 w-100 container">
        <a href="/admin " className="btn btn-outline-warning mx-2">
          back to dashboard <i className="fas fa-arrow-left"></i>
        </a>
        <a href="/admin/add-instructor" className="btn btn-outline-success">
          Add Instructor <i className="fas fa-plus"></i>
        </a>
      </div>

      <div>
        <h2>
          List of Instructors <i class="fas fa-list"></i>
        </h2>
        <div className="row d-flex justify-content-center my-4">
          {instructors.map((instructor) => (
            <div className="card col-md-3 m-2">
              <img
                src={InstructorImage}
                class="card-img-top rounded-lg mx-auto my-2"
                alt="..."
                style={{ width: "30%", margin: "auto" }}
              />

              <div class="card-body">
                <h5 class="card-title">
                  {instructor.fName + " " + instructor.lName}{" "}
                  <i class="fas fa-user"></i>
                </h5>
                <div className="d-flex justify-content-between">
                  <p class="card-text">
                    {instructor.email} <i class="fas fa-envelope"></i>
                  </p>
                </div>
                <div className="d-flex justify-content-between my-2 align-items-center">
                  <Badge pill bg="success">
                    {instructor.status}
                  </Badge>
                  <p class="card-text float-end">
                    {instructor.phone} <i class="fas fa-phone"></i>
                  </p>
                </div>
                <div className="d-flex justify-content-between my-2">
                  <Link
                    to={`/admin/update-instructor/${instructor.id}`}
                    class="btn btn-outline-warning"
                  >
                    Update <i class="fas fa-edit"></i>
                  </Link>
                  <a
                    class="btn btn-outline-danger"
                    onClick={() => handleDelete(instructor.id)}
                  >
                    Delete <i class="fas fa-trash"></i>
                  </a>
                </div>
                <div className="d-flex justify-content-between my-2">
                  <AdminAssignCourse InstructorId={instructor.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminGetAllInstructor;
