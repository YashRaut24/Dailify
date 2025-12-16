import "./SignUp.css";
import { useState } from "react";

function SignUp() {

  const[name,setName] = useState("");
  const[email,setEmail] = useState("");
  const[about,setAbout] = useState("");
  const[location,setLocation] = useState("");
  const[password,setPassword] = useState("");
  const[confirmPassword,setConfirmPassword] = useState("");

  const handleSubmit = () => {
    alert("Signup successful");

    const formData = {
      name,
      email,
      about,
      location,
      password
    }

    if(password !== confirmPassword){
      alert("Password doesn't match please try again!")
    }else{
      
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container signup-extended">
        <h2>Create Your Dailify Account</h2>
        <p className="auth-subtitle">Start your productivity journey today</p>

        <form className="auth-form" onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Full Name *"
            className="auth-input"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email *"
            className="auth-input"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <textarea
            placeholder="Bio (Tell us about yourself)"
            className="auth-textarea"
            rows="3"
            required
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />

          <input
            type="text"
            placeholder="Location (e.g., San Francisco, CA)"
            className="auth-input"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password *"
            className="auth-input"
            required
            value = {password}
            minLength={6}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password *"
            className="auth-input"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit" className="auth-button">
            Sign Up
          </button>

        </form>

        <p className="auth-link">
          Already have an account? <span>Sign In</span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
