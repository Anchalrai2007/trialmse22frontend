import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    course: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API}/api/register`, form);
      alert("Registered Successfully");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input className="form-control my-2" name="name" placeholder="Name" onChange={handleChange} />
        <input className="form-control my-2" name="email" placeholder="Email" onChange={handleChange} />
        <input className="form-control my-2" type="password" name="password" placeholder="Password" onChange={handleChange} />
        <input className="form-control my-2" name="course" placeholder="Course" onChange={handleChange} />
        <button className="btn btn-primary">Register</button>
      </form>

      <p className="mt-3">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;