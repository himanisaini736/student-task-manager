import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold">
            📋 Student Task Manager
          </h1>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          <div className="hidden sm:block">
            <p className="text-sm opacity-80">
              Welcome
            </p>

            <p className="font-semibold">
              {user?.name}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;