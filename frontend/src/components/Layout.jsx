import { NavLink } from 'react-router-dom';

const linkClass = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`;

export function Layout({ token, loading, onRefresh, children }) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Course Platform</p>
          <h1 className="brand-title">React frontend for the Spring Boot backend</h1>
          <p className="hero-copy">
            Simple pages for auth, users, courses, and enrollments.
          </p>
        </div>
        <div className="hero-card compact-card">
          <span className="status-label">Backend connection</span>
          <strong>{loading ? 'Working...' : 'Ready'}</strong>
          <span className="muted">API base: /api</span>
          <button className="secondary-button" type="button" onClick={onRefresh}>
            Refresh data
          </button>
          {token && <span className="token-chip">Token saved</span>}
        </div>
      </header>

      <nav className="nav-bar">
        <NavLink className={linkClass} to="/">
          Home
        </NavLink>
        <NavLink className={linkClass} to="/auth">
          Auth
        </NavLink>
        <NavLink className={linkClass} to="/users">
          Users
        </NavLink>
        <NavLink className={linkClass} to="/courses">
          Courses
        </NavLink>
        <NavLink className={linkClass} to="/enrollments">
          Enrollments
        </NavLink>
      </nav>

      {children}
    </div>
  );
}
