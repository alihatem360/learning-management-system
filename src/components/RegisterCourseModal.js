import React, { useState, useEffect } from "react";
import axios from "axios";
import BaisUrl from "../BaisUrl";
const RegisterCourseModal = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [showModal, setShowModal] = useState(false);
  const [studentId, setStudentId] = useState(user.id);
  const [courseName, setCourseName] = useState("");
  const [loading, setLoading] = useState(false); // state to show loading spinner when submitting form
  const [error, setError] = useState("");
  const [courses, setCourses] = useState([]);
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    console.log(studentId, courseName, "studentId, courseName");
    try {
      // Call the API to register for the course
      const res = await axios.post(
        `${BaisUrl}/student/registerCourse`,
        {
          studentId: studentId,
          code: courseName,
        },
        {
          headers: {
            token: user.token,
          },
        }
      );
      console.log(res);
      setShowModal(false); // close the modal on successful submission
      window.location.reload(); // refresh the page to show the new course
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again later."); // display the error message
    } finally {
      setLoading(false); // stop showing the loading spinner
    }
  };

  useEffect(() => {
    console.log(user.token, "user.token");
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BaisUrl}/admin/allCourses`);
        setCourses(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <React.Fragment>
      {/* Button to trigger the modal */}
      <button className="btn btn-primary" onClick={() => setShowModal(true)}>
        Register for a new course <i className="bi bi-plus-circle"></i>
      </button>

      {/* Modal component */}
      <div
        className={`modal fade ${showModal ? "show d-block" : ""}`}
        tabIndex="-1"
        aria-labelledby="registerCourseModalLabel"
        aria-hidden={!showModal}
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="registerCourseModalLabel">
                Register for a new course
              </h5>
              <button
                type="button"
                className="close"
                onClick={() => setShowModal(false)}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="form-group">
                  <label htmlFor="studentId">Student ID:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="studentId"
                    name="studentId"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="course">Course:</label>
                  <select
                    className="form-control"
                    id="course"
                    name="course"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                  >
                    <option value="">-- Select a course --</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.code}>
                        {course.name} ({course.code})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {loading ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    "Register"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default RegisterCourseModal;
