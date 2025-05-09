import { useNavigate } from 'react-router-dom';
import { useAuth } from '../util/auth';

function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar flex items-center justify-between p-4 bg-gray-100">
      <div className="navbar-logo">
        <h1 className="text-xl font-bold">The Game Counter</h1>
      </div>

      <div className="navbar-links space-x-2">
        {/* Always show Home */}
        <button
          className="nav-button btn btn-ghost"
          onClick={() => navigate('/')}
        >
          Home
        </button>

        {isAuthenticated ? (
          <>
            {/* Signed-in: show Dashboard + Logout */}
            <button
              className="nav-button btn btn-primary"
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </button>
            <button
              className="nav-button btn btn-error"
              onClick={() => {
                logout();
                navigate('/login');
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* Signed-out: show Login + Register */}
            <button
              className="nav-button btn btn-primary"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
            <button
              className="nav-button btn btn-secondary"
              onClick={() => navigate('/register')}
            >
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
