import { Link, useNavigate } from "react-router";
import { useAuth } from "../../auth/AuthContext";
import { useState, useRef, useEffect } from 'react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    await logout();
    setOpen(false);
    navigate('/');
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-teal-600">
          HireFlow
        </Link>

        <div className="flex items-center gap-6">

          <Link
            to="/jobs"
            className="text-gray-700 hover:text-teal-600"
          >
            Jobs
          </Link>

          {!isAuthenticated && (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-teal-600"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
              >
                Register
              </Link>
            </>
          )}

          {isAuthenticated && (
            <div className="relative" ref={dropdownRef}>

              {/* Profile Icon */}
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center text-gray-700 hover:text-teal-600 cursor-pointer"
              >
                <span className="material-icons text-3xl">
                  account_circle
                </span>
              </button>

              {/* Dropdown */}
              {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md border">

                  {user.role === 'COMPANY' && (
                    <>
                      <Link
                        to="/companies/me"
                        className="block px-4 py-2 hover:bg-teal-100"
                        onClick={() => setOpen(false)}
                      >
                        Profile
                      </Link>

                      <Link
                        to="/dashboard/company"
                        className="block px-4 py-2 hover:bg-teal-100"
                        onClick={() => setOpen(false)}
                      >
                        Dashboard
                      </Link>
                    </>
                  )}

                  {user.role === 'CANDIDATE' && (
                    <Link
                      to="/dashboard/candidate"
                      className="block px-4 py-2 hover:bg-teal-100"
                      onClick={() => setOpen(false)}
                    >
                      My Applications
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-teal-100 cursor-pointer"
                  >
                    Logout
                  </button>

                </div>
              )}

            </div>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;