import "./About.css";

function About() {
  return (
    <div className="about-page">

      <div className="about-container">
        <section className="about-hero">
          <h1>About Dailify</h1>
          <p>Your all-in-one productivity dashboard</p>
        </section>

        <section className="about-content">
          <div className="about-section">
            <h2>What is Dailify?</h2>
            <p>
              Dailify is a comprehensive productivity platform designed to simplify your daily routine. 
              We bring together essential tools like task management, weather updates, currency conversion, 
              and note-taking into a single, intuitive dashboard.
            </p>
          </div>

          <div className="about-section">
            <h2>Our Vision</h2>
            <p>
              To make your daily routine simpler and more productive. We believe that productivity 
              shouldn't be complicated - it should be effortless, accessible, and integrated into 
              your everyday workflow.
            </p>
          </div>

          <div className="about-section">
            <h2>How It Works</h2>
            <div className="how-it-works">
              <div className="step">
                <div className="step-number">1</div>
                <h3>Sign Up</h3>
                <p>Create your free account in seconds</p>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <h3>Customize</h3>
                <p>Set up your dashboard with your preferred tools</p>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <h3>Productive</h3>
                <p>Start managing your day efficiently</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="footer">
        <p>&copy; 2025 Dailify. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default About;