import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigateTo = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`landing-navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="landing-logo" onClick={() => navigateTo("/")}>
        Dailify
      </div>

      <button 
        className="landing-mobile-toggle"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        ☰
      </button>

      <ul className={`landing-nav-links ${mobileMenuOpen ? "open" : ""}`}>
        <li onClick={() => navigateTo("/")}>Home</li>
        <li onClick={() => navigateTo("/about")}>About</li>
        <li onClick={() => navigateTo("/contact")}>Contact</li>
      </ul>

      <div className="landing-auth-btns">
        <button onClick={() => navigateTo("/signin")}>Sign In</button>
        <button className="primary" onClick={() => navigateTo("/signup")}>Sign Up</button>
      </div>
    </nav>
  );
}

export default Navbar;
