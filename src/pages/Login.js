import React, { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      localStorage.setItem("isAuthenticated", "true");
      const response = await loginUser(formData);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      toast.success("Login Successful!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Invalid Credentials");
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer position="top-right" autoClose={2000} />
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="form-control mb-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="form-control mb-2"
        />
        <button type="submit" className="btn btn-success">Login</button>
      </form>
    </div>
  );
};

export default Login;