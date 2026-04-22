import { useEffect, useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

function Dashboard() {
  const [student, setStudent] = useState({});
  const [course, setCourse] = useState("");
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: ""
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API}/api/dashboard`, {
          headers: { Authorization: `Bearer ${token}` }   // ✅ FIX
        });
        setStudent(res.data);
      } catch (err) {
        console.error(err);
        alert("Unauthorized - Please login again");
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  const updateCourse = async () => {
    try {
      await axios.put(
        `${API}/api/update-course`,
        { course },
        { headers: { Authorization: `Bearer ${token}` } }   // ✅ FIX
      );
      alert("Course Updated");
    } catch (err) {
      console.error(err);
      alert("Failed to update course");
    }
  };

  const updatePassword = async () => {
    try {
      await axios.put(
        `${API}/api/update-password`,
        passwords,
        { headers: { Authorization: `Bearer ${token}` } }   // ✅ FIX
      );
      alert("Password Updated");
    } catch (err) {
      console.error(err);
      alert("Failed to update password");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>

      <p><b>Name:</b> {student?.name}</p>
      <p><b>Email:</b> {student?.email}</p>
      <p><b>Course:</b> {student?.course}</p>

      <hr />

      <h4>Update Course</h4>
      <input
        className="form-control my-2"
        placeholder="New Course"
        onChange={(e) => setCourse(e.target.value)}
      />
      <button className="btn btn-warning" onClick={updateCourse}>
        Update Course
      </button>

      <hr />

      <h4>Change Password</h4>
      <input
        className="form-control my-2"
        placeholder="Old Password"
        onChange={(e) =>
          setPasswords({ ...passwords, oldPassword: e.target.value })
        }
      />
      <input
        className="form-control my-2"
        placeholder="New Password"
        onChange={(e) =>
          setPasswords({ ...passwords, newPassword: e.target.value })
        }
      />
      <button className="btn btn-danger" onClick={updatePassword}>
        Update Password
      </button>

      <hr />

      <button className="btn btn-dark" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;