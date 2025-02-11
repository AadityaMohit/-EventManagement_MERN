import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
 

const Auth = ({ type }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = type === "login" ? "/auth/login" : "/auth/register";
      const { data } = await API.post(endpoint, form);
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      console.error("Auth error:", error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{type === "login" ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button type="submit">{type === "login" ? "Login" : "Register"}</button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
