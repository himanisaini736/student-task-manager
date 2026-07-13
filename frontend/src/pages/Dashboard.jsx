import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

import { getTasks } from "../services/taskService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useDebounce from "../hooks/useDebounce";

import TaskCard from "../components/TaskCard";
import AddTaskForm from "../components/AddTaskForm";
import EditTaskForm from "../components/EditTaskForm";

import { deleteTask } from "../services/taskService";

function Dashboard() {
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search);

    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");
    const [sort, setSort] = useState("createdAt")
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const [editingTask, setEditingTask] = useState(null);

    const pending = tasks.filter(
        task => task.status === "Pending"
    ).length;

    const progress = tasks.filter(
        task => task.status === "In Progress"
    ).length;

    const completed = tasks.filter(
        task => task.status === "Completed"
    ).length;

    useEffect(() => {
        fetchTasks();
    }, [
        debouncedSearch,
        status,
        priority,
        sort,
        page
    ]);

    const fetchTasks = async () => {
        try {
            setLoading(true);

            const response = await getTasks({
                search: debouncedSearch,
                status,
                priority,
                sort,
                page,
                limit: 6
            });

            setTasks(response.tasks);
            setTotalPages(response.totalPages);
        }
        catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to load tasks"
            );
        }
        finally {
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

            <div className="animate-pulse space-y-4">
                <div className="bg-gray-300 h-24 rounded"></div>

                <div className="bg-gray-300 h-24 rounded"></div>

                <div className="bg-gray-300 h-24 rounded"></div>
            </div>

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

                <div className="grid md:grid-cols-3 gap-5 my-6">
                    <div className="bg-yellow-100 p-5 rounded-lg">
                        <h2 className="text-xl font-bold">
                            Pending
                        </h2>
                        <p className="text-3xl mt-2">
                            {pending}
                        </p>
                    </div>

                    <div className="bg-blue-100 p-5 rounded-lg">
                        <h2 className="text-xl font-bold">
                            In Progress
                        </h2>
                        <p className="text-3xl mt-2">
                            {progress}
                        </p>
                    </div>

                    <div className="bg-green-100 p-5 rounded-lg">
                        <h2 className="text-xl font-bold">
                            Completed
                        </h2>
                        <p className="text-3xl mt-2">
                            {completed}
                        </p>
                    </div>
                </div>

                <input
                    type="text"
                    placeholder="Search Tasks"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                    className="border p-3 rounded w-full mb-4"
                />

                <div className="grid md:grid-cols-3 gap-4 mb-5">
                    <select
                        value={status}
                        onChange={(e) => {
                            setStatus(e.target.value);
                            setPage(1);
                        }}
                        className="border p-3 rounded"
                    >
                        <option value="">All Status</option>
                        <option>Pending</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                    </select>

                    <select
                        value={priority}
                        onChange={(e) => {
                            setPriority(e.target.value);
                            setPage(1);
                        }}
                        className="border p-3 rounded"
                    >
                        <option value="">All Priority</option>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>

                    <select
                        value={sort}
                        onChange={(e) => {
                            setSort(e.target.value);
                        }}
                        className="border p-3 rounded"
                    >
                        <option value="createdAt">Latest</option>
                        <option value="dueDate">Due Date</option>
                        <option value="priority">Priority</option>
                    </select>
                </div>


                {tasks.length === 0 ? (
                    <div className="text-center py-20">
                        <h2 className="text-3xl font-bold">
                            🎉 You're All Caught Up!
                        </h2>

                        <p className="text-gray-500 mt-4">
                            Create your first task.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

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

                <div className="flex justify-center items-center gap-4 mt-8">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="bg-gray-300 px-4 py-2 rounded"
                    >
                        Previous
                    </button>

                    <span>
                        Page {page} of {totalPages}
                    </span>

                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                        className="bg-gray-300 px-4 py-2 rounded"
                    >
                        Next
                    </button>
                </div>

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