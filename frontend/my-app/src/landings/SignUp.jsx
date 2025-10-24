import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    location: "",
    password: "",
    confirmPassword: ""
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      alert("Please fill in all required fields (Name, Email, Password)");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    alert("Account created successfully!");
    navigate("/dailify");
  };

  return (
    <div className="auth-page">
      <div className="auth-container signup-extended">
        <h2>Create Your Dailify Account</h2>
        <p className="auth-subtitle">Start your productivity journey today</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name *"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="auth-input"
            required
          />
          <input
            type="email"
            placeholder="Email *"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="auth-input"
            required
          />
          <textarea
            placeholder="Bio (Tell us about yourself)"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="auth-textarea"
            rows="3"
          />
          <input
            type="text"
            placeholder="Location (e.g., San Francisco, CA)"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="auth-input"
          />
          <input
            type="password"
            placeholder="Password *"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="auth-input"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password *"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className="auth-input"
            required
          />
          <button type="submit" className="auth-button">Sign Up</button>
        </form>

        <p className="auth-link">
          Already have an account? <span onClick={() => navigate("/signin")}>Sign In</span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;