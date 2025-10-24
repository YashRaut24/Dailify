import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Navbar will be in App.jsx routing */}
      
      <section className="hero">
        <h1>Welcome to Dailify</h1>
        <p>Your daily productivity companion - manage tasks, check weather, convert currency, and more in one simple dashboard</p>
        <button onClick={() => navigate("/signup")}>Get Started</button>
      </section>

      <section className="features">
        <div className="feature">
          <div className="feature-icon">✅</div>
          <h3>Manage Tasks</h3>
          <p>Create, organize, and track your daily tasks with ease. Multiple categories to keep everything organized.</p>
        </div>

        <div className="feature">
          <div className="feature-icon">🌤️</div>
          <h3>Check Weather</h3>
          <p>Stay informed about current weather conditions and forecasts right from your dashboard.</p>
        </div>

        <div className="feature">
          <div className="feature-icon">💰</div>
          <h3>Convert Currency</h3>
          <p>Quick and accurate currency conversions for your financial needs.</p>
        </div>

        <div className="feature">
          <div className="feature-icon">📝</div>
          <h3>Quick Notes</h3>
          <p>Capture ideas and important information instantly with our intuitive note-taking system.</p>
        </div>
      </section>

      <section className="about-preview">
        <h2>Built for Productivity</h2>
        <p>
          Dailify brings together all your essential daily tools in one place. 
          No more switching between apps - everything you need is right here, 
          designed with simplicity and efficiency in mind.
        </p>
        <button onClick={() => navigate("/about")}>Learn More</button>
      </section>

      <footer className="footer">
        <p>&copy; 2025 Dailify. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;