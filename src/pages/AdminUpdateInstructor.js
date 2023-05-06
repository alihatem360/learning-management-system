import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BaisUrl from "../BaisUrl";
const UpdateInstructor = () => {
  const [instructor, setInstructor] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    phone: "",
    status: "",
  });

  const instructorId = useParams().id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BaisUrl}/admin/showInstructor/${instructorId}`,
          {
            headers: {
              token: "e70324527bd63ab8d25840e45195ea8e2",
            },
          }
        ); // Replace with your own API endpoint
        const data = response.data;
        setInstructor(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [instructorId]);

  const handleChange = (event) => {
    setInstructor({ ...instructor, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    console.log(
      instructor.fName,
      instructor.lName,
      instructor.email,
      instructor.password,
      instructor.phone,
      instructor.status,
      instructorId,
      "instructor"
    );
    event.preventDefault();
    axios
      .put(
        `${BaisUrl}/admin/updateInstrctor/${instructorId}`,
        {
          fName: instructor.fName,
          lName: instructor.lName,
          email: instructor.email,
          password: instructor.password,
          phone: instructor.phone,
          status: instructor.status,
        },
        {
          headers: {
            token: "e70324527bd63ab8d25840e45195ea8e2",
          },
        }
      )
      .then((res) => {
        console.log(res);
        console.log("Instructor updated successfully!");
        alert("Instructor updated successfully!");
        window.location.href = "/admin/get-all-instructors";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <h2>Update Instructor</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fName">First Name:</label>
          <input
            type="text"
            className="form-control"
            id="fName"
            name="fName"
            value={instructor.fName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lName">Last Name:</label>
          <input
            type="text"
            className="form-control"
            id="lName"
            name="lName"
            value={instructor.lName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={instructor.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={instructor.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={instructor.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            className="form-control"
            id="status"
            name="status"
            value={instructor.status}
            onChange={handleChange}
            required
          >
            <option value="">Select a Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="form-group d-flex justify-content-between my-2">
          <button type="submit" className="btn btn-primary">
            Update Instructor
          </button>

          <button
            className="btn btn-outline-secondary"
            onClick={() =>
              (window.location.href = "/admin/get-all-instructors")
            }
          >
            go back <i className="fas fa-arrow-circle-left"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateInstructor;
