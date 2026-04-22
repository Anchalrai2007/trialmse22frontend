import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [student, setStudent] = useState({});
  const [course, setCourse] = useState("");
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: ""
  });

  const token = localStorage.getItem("token");

  // Fetch student data
  useEffect(() => {
    axios.get("http://localhost:5000/api/dashboard", {
      headers: { Authorization: token }
    })
    .then(res => setStudent(res.data))
    .catch(() => alert("Unauthorized"));
  }, []);

  // Update Course
  const updateCourse = async () => {
    await axios.put("http://localhost:5000/api/update-course",
      { course },
      { headers: { Authorization: token } }
    );
    alert("Course Updated");
  };

  // Update Password
  const updatePassword = async () => {
    await axios.put("http://localhost:5000/api/update-password",
      passwords,
      { headers: { Authorization: token } }
    );
    alert("Password Updated");
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>

      <p><b>Name:</b> {student.name}</p>
      <p><b>Email:</b> {student.email}</p>
      <p><b>Course:</b> {student.course}</p>

      <hr />

      <h4>Update Course</h4>
      <input className="form-control my-2" placeholder="New Course" onChange={(e) => setCourse(e.target.value)} />
      <button className="btn btn-warning" onClick={updateCourse}>Update Course</button>

      <hr />

      <h4>Change Password</h4>
      <input className="form-control my-2" placeholder="Old Password"
        onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })} />
      <input className="form-control my-2" placeholder="New Password"
        onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })} />
      <button className="btn btn-danger" onClick={updatePassword}>Update Password</button>

      <hr />

      <button className="btn btn-dark" onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;