import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaTasks, FaUserCircle } from "react-icons/fa";

function Navbar({ onCreateTask }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-xl">
            <FaTasks className="text-2xl text-white" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-wide">
              Student Task Manager
            </h1>

            <p className="text-xs text-blue-100">
              Organize • Track • Complete
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          <div className="relative hidden md:block">

            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-xl transition"
            >
             {user?.profileImage ? (
  <img
    src={user.profileImage}
    alt="Profile"
    className="w-12 h-12 rounded-full object-cover border-2 border-white"
  />
) : (
  <FaUserCircle className="text-4xl text-blue-100" />
)}

              <div className="text-left">
                <p className="text-xs text-blue-100">Welcome</p>
                <p className="font-semibold">{user?.name}</p>
              </div>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl text-gray-700 overflow-hidden">

                <button
  onClick={() => {
    navigate("/profile");
    setShowProfileMenu(false);
  }}
  className="w-full text-left px-4 py-3 hover:bg-gray-100"
>
  👤 My Profile
</button>

                <button
  onClick={() => {
    navigate("/profile");
    setShowProfileMenu(false);
  }}
  className="w-full text-left px-4 py-3 hover:bg-gray-100"
>
  🖼 Change Profile Photo
</button>

               <button
  onClick={() => {
    navigate("/settings");
    setShowProfileMenu(false);
  }}
  className="w-full text-left px-4 py-3 hover:bg-gray-100"
>
  ⚙️ Settings
</button>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50"
                >
                  🚪 Logout
                </button>

              </div>
            )}

          </div>

          <button
            onClick={onCreateTask}
            className="bg-emerald-500 hover:bg-emerald-600 px-5 py-2 rounded-xl font-semibold shadow-lg hover:scale-105 transition-all duration-300"
          >
            + Create Task
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;