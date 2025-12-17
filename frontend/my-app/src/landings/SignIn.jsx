import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";          // ✅ FIX 1
import "./SignIn.css";

function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:9000/signin", formData);

      alert("Login successful");   
      navigate("/dailify");        

    } catch (err) {
      alert(
        err.response?.data?.message || "Login failed"
      );                      
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Welcome Back</h2>
        <p className="auth-subtitle">Sign in to continue to Dailify</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="auth-input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="auth-input"
            required
          />
          <button type="submit" className="auth-button">Sign In</button>
        </form>

        <p className="auth-link">
          New here?{" "}
          <span onClick={() => navigate("/signup")}>
            Create an account
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
