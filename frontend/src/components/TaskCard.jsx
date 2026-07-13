function TaskCard({ task, onEdit, onDelete }) {

    return (
        <div className="bg-blue-100 shadow rounded-lg p-5">

            <h2 className="text-xl font-semibold">
                {task.title}
            </h2>

            <p className="mt-2 text-gray-600">
                {task.description}
            </p>

            <p className="text-sm text-gray-500 mt-3">
                Due:
                {
                    task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString()
                        : "No Due Date"
                }
            </p>

            <div className="mt-3 flex justify-between">
                <span className="text-blue-600 font-medium">
                    {task.status}
                </span>

                <span
                    className={`px-3 py-1 rounded text-white ${task.priority === "High"
                            ? "bg-red-500"
                            : task.priority === "Medium"
                                ? "bg-yellow-500"
                                : "bg-green-500"
                        }`}
                >
                    {task.priority}
                </span>
            </div>

            <div className="mt-3 flex justify-between">
                <button
                    onClick={() => onEdit(task)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                    Edit
                </button>

                <button
                    onClick={() => onDelete(task._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default TaskCard;