import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    course: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API}/api/register`, form);

      alert("Registered Successfully");

      // ✅ optional: auto redirect to login
      navigate("/login");

    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control my-2"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          className="form-control my-2"
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          className="form-control my-2"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <input
          className="form-control my-2"
          name="course"
          placeholder="Course"
          value={form.course}
          onChange={handleChange}
          required
        />

        <button className="btn btn-primary">Register</button>
      </form>

      <p className="mt-3">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;