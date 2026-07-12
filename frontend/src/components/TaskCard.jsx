function TaskCard({ task }) {

    return (

        <div className="bg-white shadow rounded-lg p-5 border">
            <h2 className="text-xl font-semibold">
                {task.title}
            </h2>

            <p className="text-gray-600 mt-2">
                {task.description || "No description"}
            </p>

            <div className="mt-4 flex justify-between">
                <span className="text-blue-600 font-medium">
                    {task.status}
                </span>

                <span className="text-red-500 font-medium">
                    {task.priority}
                </span>
            </div>

        </div>
    );
}

export default TaskCard;