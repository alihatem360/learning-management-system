import React, { useState } from "react";
import axios from "axios";
import BaisUrl from "../BaisUrl";
const Register = () => {
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    confiremPassword: "",
    phone: "",
  });

  const { fName, lName, email, password, confiremPassword, phone } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData, "formData");
      const res = await axios.post(`${BaisUrl}/register`, formData);
      console.log(res);
      if (res.data.message === "account created !") {
        window.location.href = "/";
      }
      // redirect to login page or show success message
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <h1 className="text-center">Register</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fName">First Name:</label>
              <input
                type="text"
                className="form-control"
                name="fName"
                value={fName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lName">Last Name:</label>
              <input
                type="text"
                className="form-control"
                name="lName"
                value={lName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confiremPassword">Confirm Password:</label>
              <input
                type="password"
                className="form-control"
                name="confiremPassword"
                value={confiremPassword}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <input
                type="tel"
                className="form-control"
                name="phone"
                value={phone}
                onChange={handleChange}
              />
            </div>
            <div className="text-center d-flex justify-content-between align-items-center my-3">
              <button type="submit" className="btn btn-primary">
                Register Now ! <i className="fas fa-arrow-right"></i>
              </button>

              <div>
                are you already have an account ? <a href="/">Login</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
