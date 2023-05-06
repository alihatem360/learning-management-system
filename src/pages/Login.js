import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

import BaisUrl from "../BaisUrl";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BaisUrl}/login`, {
        email,
        password,
      });
      console.log(res);
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      console.error(err);
    }
  };

  switch (user.role) {
    case "instructor":
      window.location.href = "/instructor";
      break;
    case "student":
      window.location.href = "/student";
      break;
    case "admin":
      window.location.href = "/admin";
      break;
    default:
      break;
  }

  return (
    <div className="container">
      <h1 className="text-center">
        Login <i className="fas fa-sign-in-alt"></i>
      </h1>
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <div className="d-flex justify-content-between  my-2">
              <Button variant="primary" type="submit" className="w-25 d-block">
                Login <i className="fas fa-sign-in-alt"></i>
              </Button>
              <Link
                className="text-primary ms-2 text-end text-decoration-none"
                to="/register"
              >
                create an account
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
