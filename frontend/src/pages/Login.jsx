import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";

import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/authService";

function Login() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const response = await loginUser(data);

            login(response.user, response.token);

            toast.success("Login Successful");

            navigate("/dashboard");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Login Failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="min-h-screen flex justify-center items-center bg-gray-100">

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-8 rounded-lg shadow-lg w-96"
            >

                <h1 className="text-3xl font-bold mb-6 text-center">
                    Student Task Manager
                </h1>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-3 rounded mb-2"
                    {...register("email", {
                        required: "Email is required"
                    })}
                />

                {errors.email && (
                    <p className="text-red-500 text-sm mb-3">
                        {errors.email.message}
                    </p>
                )}

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-3 rounded mb-2"
                    {...register("password", {
                        required: "Password is required"
                    })}
                />

                {errors.password && (
                    <p className="text-red-500 text-sm mb-4">
                        {errors.password.message}
                    </p>
                )}

                <button
                    className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
                    disabled={loading}
                >

                    {loading ? "Logging In..." : "Login"}
                </button>

                <p className="text-center mt-5">
                    Don't have an account?
                    <Link
                        className="text-blue-600 ml-2"
                        to="/register"
                    >
                        Create Account
                    </Link>
                </p>

            </form>
        </div>
    );
}

export default Login;