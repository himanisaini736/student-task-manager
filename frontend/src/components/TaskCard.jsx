function TaskCard({ task, onEdit, onDelete }) {

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

            <h2 className="text-2xl font-bold text-gray-800">
                {task.title}
            </h2>

            <p className="mt-3 text-gray-600 leading-relaxed min-h-[50px]">
                {task.description}
            </p>

           <p className="text-sm text-gray-500 mt-5 flex items-center gap-2">
                <span className="font-medium">📅 Due:</span>
                {
                    task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString()
                        : "No Due Date"
                }
            </p>

            <div className="mt-3 flex justify-between">
                <span
   className={`px-4 py-1 rounded-full text-sm font-semibold text-white ${
            task.status === "Completed"
                ? "bg-green-100 text-green-700"
                : task.status === "In Progress"
                ? "bg-blue-100 text-blue-700"
                : "bg-yellow-100 text-yellow-700"
        }`}
>
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
    className="bg-yellow-500 hover:bg-yellow-600 transition-colors text-white px-5 py-2 rounded-lg font-medium"
>
    ✏️ Edit
</button>

                <button
    onClick={() => onDelete(task._id)}
    className="bg-red-500 hover:bg-red-600 transition-colors text-white px-5 py-2 rounded-lg font-medium"
>
    🗑 Delete
</button>
            </div>
        </div>
    );
}

export default TaskCard;