import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  // get user from local storage
  const user = JSON.parse(localStorage.getItem("user"));
  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };
  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            learning management system{" "}
            <i class="fa-solid fa-graduation-cap"></i>
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            {user !== null ? (
              <div className="d-flex align-items-center align-self-center">
                <div className="mx-2">Hello {user.fName} 👋 </div>
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  onClick={() => logout()}
                >
                  Log out <i class="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            ) : (
              <div>
                <button type="button" class="btn btn-outline-primary">
                  <a
                    href="/"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Login <i class="fa-solid fa-arrow-right"></i>
                  </a>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
