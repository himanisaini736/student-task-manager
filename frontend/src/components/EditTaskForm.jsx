import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { updateTask } from "../services/taskService";

function EditTaskForm({ task, onClose, onTaskUpdated }) {

    const {
        register,
        handleSubmit,
        reset
    } = useForm();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        reset(task);
    }, [task, reset]);

    const onSubmit = async (data) => {

        try {

            setLoading(true);

            await updateTask(task._id, data);

            toast.success("Task Updated");

            onTaskUpdated();

            onClose();

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Update Failed"
            );
        } finally {
            setLoading(false);
        }

    };

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

            <div className="bg-white p-6 rounded-lg w-[500px]">
                <h2 className="text-2xl font-bold mb-4">
                    Edit Task
                </h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        className="w-full border p-3 rounded mb-3"
                        {...register("title")}
                    />

                    <textarea
                        className="w-full border p-3 rounded mb-3"
                        rows="3"
                        {...register("description")}
                    />

                    <select
                        className="w-full border p-3 rounded mb-3"
                        {...register("status")}
                    >
                        <option>Pending</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                    </select>

                    <select
                        className="w-full border p-3 rounded mb-3"
                        {...register("priority")}
                    >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>

                    <input
                        type="date"
                        className="w-full border p-3 rounded mb-5"
                        {...register("dueDate")}
                    />

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 border rounded"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 text-white px-5 py-2 rounded"
                        >
                            {loading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditTaskForm;