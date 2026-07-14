import TaskForm from "./TaskForm";

function AddTaskModal({ onClose, onTaskCreated }) {
    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl shadow-xl w-full max-w-xl p-6 relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-2xl"
                >
                    ×
                </button>

                <h2 className="text-2xl font-bold mb-6">
                    Create Task
                </h2>

                <TaskForm
                    onTaskCreated={() => {
                        onTaskCreated();
                        onClose();
                    }}
                />
            </div>
        </div>
    );
}

export default AddTaskModal;