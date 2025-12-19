import "./SignUp.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again!");
      return;
    }

    const formData = {
      name,
      email,
      bio: about,
      location,
      password
    };

    try {
      const res = await axios.post(
        "http://localhost:9000/signup",
        formData
      );

      alert(res.data.message || "Signup successful!");
      navigate("/signin"); 
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message ||
        "Signup failed. Please try again."
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container signup-extended">
        <h2>Create Your Dailify Account</h2>
        <p className="auth-subtitle">
          Start your productivity journey today
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Full Name *"
            className="auth-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email *"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <textarea
            placeholder="Bio (Tell us about yourself)"
            className="auth-textarea"
            rows="3"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />

          <input
            type="text"
            placeholder="Location (e.g., San Francisco, CA)"
            className="auth-input"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password *"
            className="auth-input"
            value={password}
            minLength={6}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password *"
            className="auth-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" className="auth-button">
            Sign Up
          </button>
        </form>

        <p className="auth-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/signin")}>
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
