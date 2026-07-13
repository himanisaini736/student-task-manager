import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";

import { createTask } from "../services/taskService";

function AddTaskForm({ onTaskCreated }) {

    const {
        register,
        handleSubmit,
        reset
    } = useForm();

    const [loading, setLoading] = useState(false);

    const onSubmitForm = async (data) => {

        try {
            setLoading(true);

            await createTask(data);

            toast.success("Task Created Successfully");

            reset();

            onTaskCreated();
            
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to create task"
            );
        } finally {
            setLoading(false);
        }

    };

    return (

        <form
            onSubmit={handleSubmit(onSubmitForm)}
            className="bg-white p-6 rounded-lg shadow mb-8"
        >

            <h2 className="text-2xl font-bold mb-4">
                Add New Task
            </h2>

            <input
                type="text"
                placeholder="Task Title"
                className="w-full border p-3 rounded mb-3"
                {...register("title", {
                    required: "Title is required"
                })}
            />

            <textarea
                placeholder="Description"
                className="w-full border p-3 rounded mb-3"
                rows="3"
                {...register("description")}
            />

            <div className="grid md:grid-cols-3 gap-3">
                <select
                    className="border p-3 rounded"
                    {...register("status")}
                >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>

                <select
                    className="border p-3 rounded"
                    {...register("priority")}
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>

                <input
                    type="date"
                    className="border p-3 rounded"
                    {...register("dueDate")}
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="mt-5 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
            >
                {loading ? "Creating..." : "Add Task"}
            </button>
        </form>
    );
}

export default AddTaskForm;