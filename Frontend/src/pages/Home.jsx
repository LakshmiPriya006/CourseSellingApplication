import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to LearnHub</h1>
          <p>Discover and master new skills with our expert-led courses</p>
          <Link to="/courses" className="btn btn-primary">Explore Courses</Link>
        </div>
      </section>
      
      <section className="features">
        <h2>Why Choose LearnHub?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <i className="fas fa-laptop-code"></i>
            <h3>Expert Instructors</h3>
            <p>Learn from industry professionals</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-clock"></i>
            <h3>Learn at Your Pace</h3>
            <p>Access content anytime, anywhere</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-certificate"></i>
            <h3>Get Certified</h3>
            <p>Earn certificates upon completion</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
