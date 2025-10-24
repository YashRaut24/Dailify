import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";

function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert("Please fill in all fields");
      return;
    }
    alert("Sign in successful!");
    navigate("/dailify");
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Welcome Back</h2>
        <p className="auth-subtitle">Sign in to continue to Dailify</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="auth-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="auth-input"
          />
          <button type="submit" className="auth-button">Sign In</button>
        </form>

        <p className="auth-link">
          New here? <span onClick={() => navigate("/signup")}>Create an account</span>
        </p>
      </div>
    </div>
  );
}

export default SignIn;