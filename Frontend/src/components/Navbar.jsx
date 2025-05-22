import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const isAdmin = location.pathname.includes('/admin');

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">LearnHub</Link>
      </div>
      <div className="navbar-links">
        {isAdmin ? (
          <>
            <Link to="/admin/courses">Manage Courses</Link>
            <Link to="/admin/create-course">Create Course</Link>
            <Link to="/" className="btn btn-secondary">Logout</Link>
          </>
        ) : (
          <>
            <Link to="/courses">Courses</Link>
            <Link to="/user/purchases">My Courses</Link>
            <Link to="/user/signin">Login</Link>
            <Link to="/user/signup" className="btn btn-primary">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
