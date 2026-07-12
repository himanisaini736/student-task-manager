import { useAuth } from "../context/AuthContext";

import { useNavigate } from "react-router-dom";

function Dashboard() {

    const {
        user,
        logout
    } = useAuth();

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold">
                Welcome
                {" "}
                {user?.name}
            </h1>

            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-5 py-2 rounded mt-6"

            >
                Logout
            </button>
        </div>
    );

}

export default Dashboard;