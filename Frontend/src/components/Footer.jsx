import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>LearnHub</h3>
          <p>Empowering minds through quality education</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/courses">All Courses</a></li>
            <li><a href="/user/signin">Login</a></li>
            <li><a href="/user/signup">Sign Up</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <ul>
            <li>Email: support@learnhub.com</li>
            <li>Phone: (555) 123-4567</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 LearnHub. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
