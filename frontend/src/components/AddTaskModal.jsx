import AddTaskForm from "./AddTaskForm";

function AddTaskModal({ onClose, onTaskCreated }) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-full max-w-xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl"
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold mb-5">
          Create Task
        </h2>

        <AddTaskForm
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