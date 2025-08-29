import { Link} from "react-router-dom";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { login } from "../../services/api";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(credentials);
      // Save token to localStorage
      localStorage.setItem('token', response.token);
      // Redirect to dashboard or home page
      navigate('/page2');
    } catch (error) {
      setError(error.message || 'Login failed');
    }
  };

  return (
    <>
 
      <h1 className="page-title">Login Page</h1>
      <div className="login-form">
      {error && <div className="error">{error}</div>}
        <form id="loginForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email: </label>
            <input type="email" id="email" onChange={handleChange} value={credentials.email} name="email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password: </label>
            <input type="password" id="password" onChange={handleChange} value={credentials.password} name="password" />
          </div>
          <button type="submit">Login</button>
          <p>
            If you don't have an account,{" "}
            <Link to="/registration">Register here</Link>.
          </p>
        </form>
      </div>
    </>
  );
}
export default Login;
