import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import BaisUrl from "../BaisUrl";
const AdminAssignCourse = ({ InstructorId }) => {
  console.log(InstructorId, "InstructorId");
  const [courseId, setCourseId] = useState("");
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BaisUrl}/admin/allCourses`); // Replace with your own API endpoint
        const data = response.data;
        setCourses(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleCourseIdChange = (event) => {
    setCourseId(event.target.value);
  };

  const handleSubmit = async (event) => {
    console.log(InstructorId, Number(courseId), "InstructorId, courseId");
    event.preventDefault();
    try {
      await axios.put(
        `${BaisUrl}/admin/assignInstrctor`,
        {
          instructorId: InstructorId,
          courseId: Number(courseId),
        },
        {
          headers: {
            token: "e70324527bd63ab8d25840e45195ea8e2",
          },
        }
      );
      console.log("Course assigned successfully!");
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setCourseId("");
  };

  const handleShow = () => setShowModal(true);

  return (
    <React.Fragment>
      <button onClick={handleShow} className="btn btn-outline-success w-100">
        Assign
      </button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Course to Instructor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="instructorId">Instructor ID:</label>
              <input
                type="text"
                className="form-control"
                id="instructorId"
                name="instructorId"
                value={InstructorId}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="courseId">Course:</label>
              <select
                className="form-control"
                id="courseId"
                name="courseId"
                value={courseId}
                onChange={handleCourseIdChange}
                required
              >
                <option value="">Select a Course</option>
                {courses.map((course) => (
                  <option value={course.id}>
                    {course.name} ({course.code})
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary my-2">
              Assign Course
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default AdminAssignCourse;
