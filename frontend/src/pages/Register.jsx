import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

import { registerUser } from "../services/authService";

function Register() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const password = watch("password");

    const onSubmit = async (data) => {

        try {
            setLoading(true);
            delete data.confirmPassword;

            await registerUser(data);

            toast.success("Registration Successful");

            navigate("/");

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Registration Failed"
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
                    Create Account
                </h1>

                <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full border p-3 rounded mb-2"
                    {...register("name", {
                        required: "Name is required"
                    })}
                />

                {errors.name && (
                    <p className="text-red-500 text-sm mb-3">
                        {errors.name.message}
                    </p>
                )}

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
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters"
                        }
                    })}
                />

                {errors.password && (
                    <p className="text-red-500 text-sm mb-3">
                        {errors.password.message}
                    </p>
                )}

                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full border p-3 rounded mb-2"
                    {...register("confirmPassword", {
                        required: "Confirm your password",
                        validate: value =>
                            value === password || "Passwords do not match"
                    })}
                />

                {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mb-4">
                        {errors.confirmPassword.message}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700"
                >
                    {loading ? "Creating Account..." : "Register"}
                </button>

                <p className="text-center mt-5">
                    Already have an account?
                    <Link
                        to="/"
                        className="text-blue-600 ml-2"
                    >
                        Login
                    </Link>
                </p>

            </form>
        </div>
    );
}

export default Register;