import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API}/api/login`, form);

      // ✅ store token
      localStorage.setItem("token", res.data.token);

      alert("Login Successful");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.msg || "Invalid Credentials");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          className="form-control my-2"
          name="email"
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

        <button className="btn btn-success">Login</button>
      </form>

      <p className="mt-3">
        New user? <Link to="/">Register</Link>
      </p>
    </div>
  );
}

export default Login;