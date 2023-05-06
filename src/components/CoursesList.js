import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Badge } from "react-bootstrap";
import BaisUrl from "../BaisUrl";
const CoursesList = () => {
  // Define a state variable to store the list of courses
  const [courses, setCourses] = useState([]);

  // Fetch the list of courses from the API when the component mounts
  useEffect(() => {
    axios.get(`${BaisUrl}/admin/allCourses`).then((response) => {
      setCourses(response.data);
    });
  }, []);

  return (
    <div>
      <h2 className="text-center text-primary my-3">
        All Courses <i className="fas fa-book"></i>
      </h2>
      {/* Map over the courses array to display each course in a card */}
      <div className="row  g-4 mt-3 d-flex justify-content-center">
        {courses.map((course) => (
          <Card key={course.id} className="col-md-3 mx-2">
            <Card.Img variant="top" src={course.image} />
            <Card.Body>
              <Card.Title>{course.name}</Card.Title>
              <Card.Text>{course.code}</Card.Text>
              <div className="d-flex justify-content-between align-items-center">
                <Badge bg="primary">{course.status}</Badge>
                <button
                  className="btn btn-outline-warning"
                  onClick={() => {
                    window.location.href = `/admin/course-details/${course.code}`;
                  }}
                >
                  see details <i className="fas fa-eye"></i>
                </button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CoursesList;
