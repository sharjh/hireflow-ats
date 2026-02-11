import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-teal-600">
          HireFlow
        </Link>

        {/* Right side links */}
        <div className="flex items-center gap-6">
          <Link
            to="/jobs"
            className="text-gray-700 hover:text-teal-600"
          >
            Jobs
          </Link>

          <Link
            to="/login"
            className="text-gray-700 hover:text-teal-600"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700"
          >
            Register
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;