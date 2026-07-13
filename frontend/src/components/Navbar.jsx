import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {

    const { user, logout } = useAuth();

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (

        <nav className="bg-blue-600 text-white px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">
                Student Task Manager
            </h1>

            <div className="flex items-center gap-5">
                <span>
                    {user?.name}
                </span>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 px-4 py-2 rounded"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;