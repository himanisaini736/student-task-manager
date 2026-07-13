import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

import { getTasks } from "../services/taskService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import TaskCard from "../components/TaskCard";
import AddTaskForm from "../components/AddTaskForm";
import EditTaskForm from "../components/EditTaskForm";

import { deleteTask } from "../services/taskService";

function Dashboard() {

    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        const loadTasks = async () => {
            await fetchTasks();
        };

        loadTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await getTasks();
            setTasks(response.tasks);

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to fetch tasks"
            );

        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Delete this task?"
        );

        if (!confirmDelete) return;

        try {

            await deleteTask(id);

            toast.success("Task Deleted");

            fetchTasks();

        } catch (error) {
            toast.error("Delete Failed");
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    if (loading) {
        return (

            <h2 className="text-center mt-20 text-2xl">
                Loading Tasks...
            </h2>

        );
    }

    return (

        <div className="min-h-screen bg-gray-100">
            <div className="flex justify-between items-center p-6 bg-white shadow">
                <h1 className="text-3xl font-bold">
                    Welcome, {user?.name}
                </h1>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Logout
                </button>

            </div>

            <div className="p-6">

                <AddTaskForm
                    onTaskCreated={fetchTasks}
                />

                {tasks.length === 0 ? (
                    <h2 className="text-center text-xl">
                        No Tasks Found
                    </h2>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

                        {tasks.map((task) => (
                            <TaskCard
                                key={task._id}
                                task={task}
                                onEdit={setEditingTask}
                                onDelete={handleDelete}
                            />

                        ))}

                    </div>
                )}

                {editingTask && (
                    <EditTaskForm
                        task={editingTask}
                        onClose={() => setEditingTask(null)}
                        onTaskUpdated={fetchTasks}
                    />
                )}

            </div>
        </div>
    );
}

export default Dashboard;