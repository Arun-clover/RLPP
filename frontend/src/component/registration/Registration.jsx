import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";
import { register } from "../../services/api";
import "./registration.css";
function Registration() {
  const [userdata, setuserdata] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, seterror] = useState("");
  const nav = useNavigate();

  const handleChange = (e) => {
    setuserdata({
      ...userdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(userdata);
      localStorage.setItem("token", response.token);
      nav("/Login");
    } catch (error) {
      seterror(error.response?.data || "Registration failed");
    }
  };

  return (
    <div className="registration-container">
      <h1 className="page-title">Registration Page</h1>
      <div className="registration-form">
      {error && <div className="error">{error}</div>}
        <form id="registerForm" className="form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              id="username"
              onChange={handleChange}
              value={userdata.username}
              name="username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              id="email"
              onChange={handleChange}
              value={userdata.email}
              name="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              onChange={handleChange}
              value={userdata.password}
              name="password"
            />
          </div>
          <button type="submit">Register</button>
          <p>
            If you already have an account, <Link to="/Login">Login here</Link>.
          </p>
        </form>
      </div>
    </div>
  );
}
export default Registration;
