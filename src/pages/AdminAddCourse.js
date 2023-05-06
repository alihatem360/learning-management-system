import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BaisUrl from "../BaisUrl";
const AdminAddCourse = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    code: "",
    status: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formValues, "formValues");
    try {
      const response = await axios.post(
        `${BaisUrl}/admin/addCourse`,
        formValues,
        {
          headers: {
            token: "e70324527bd63ab8d25840e45195ea8e2",
          },
        }
      );
      console.log(response.data);
      if (response.data.message === "course created !") {
        alert("course created !");
        window.location.href = "/admin";
      } else {
        alert("course not created !");
      }

      // clear form inputs
      setFormValues({
        name: "",
        code: "",
        status: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2>Add New Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">course Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter name"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="code">course Code</label>
          <input
            type="text"
            className="form-control"
            id="code"
            placeholder="Enter code"
            name="code"
            value={formValues.code}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            className="form-control"
            id="status"
            name="status"
            value={formValues.status}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled hidden>
              Select status
            </option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="form-group d-flex justify-content-between">
          <button type="submit" className="btn btn-primary my-2">
            Submit Course <i className="fas fa-plus-circle"></i>
          </button>
          <Link
            className="btn btn-outline-warning my-2"
            to="/admin/get-all-courses"
          >
            back to all courses <i className="fas fa-arrow-left"></i>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AdminAddCourse;
