import React, { useState } from "react";
import axios from "axios";
import BaisUrl from "../BaisUrl";
const AdminAddInstructor = () => {
  const [instructor, setInstructor] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    phone: "",
    status: "",
  });

  const handleChange = (event) => {
    setInstructor({ ...instructor, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    console.log(instructor, "instructor");
    event.preventDefault();
    try {
      await axios.post(`${BaisUrl}/admin/addInstrctor`, instructor, {
        headers: {
          token: "e70324527bd63ab8d25840e45195ea8e2",
        },
      }); // Replace with your own API endpoint
      console.log("Instructor added successfully!");
      alert("Instructor added successfully!");
      window.location.href = "/admin/get-all-instructors";
      setInstructor({
        fName: "",
        lName: "",
        email: "",
        password: "",
        phone: "",
        status: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2>Add New Instructor</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fName">
            First Name: <i>(required)</i>
          </label>
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
          <label htmlFor="lName">
            Last Name: <i>(required)</i>
          </label>
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
          <label htmlFor="email">
            Email: <i>(required)</i>
          </label>
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
          <label htmlFor="password">
            Password: <i>(required)</i>
          </label>
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
          <label htmlFor="phone">
            Phone: <i>(required)</i>
          </label>
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
          <label htmlFor="status">
            Status: <i>(required)</i>
          </label>
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
        <div className="form-group d-flex justify-content-between  my-2">
          <button type="submit" className="btn btn-primary">
            Add Instructor <i className="fas fa-plus"></i>
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              window.location.href = "/admin/get-all-instructors";
            }}
          >
            Cancel and Go Back <i className="fas fa-undo-alt"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddInstructor;
