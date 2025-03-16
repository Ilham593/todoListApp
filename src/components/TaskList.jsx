import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, deleteTask, toggleTaskStatus } from "../features/taskSlice";
import EditTask from "./EditTask"; // Import modal edit

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleToggleStatus = (taskId) => {
    dispatch(toggleTaskStatus(taskId));
  };

  const handleDelete = (taskId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus task ini?")) {
      dispatch(deleteTask(taskId));
    }
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
    setSelectedTask(null);
  };

  if (loading) {
    return <p className="text-center text-[#205781] text-lg font-semibold">⏳ Memuat tugas...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 text-lg font-semibold">❌ Error: {error}</p>;
  }

  return (
    <div className="bg-[#F6F8D5] p-6 shadow-xl rounded-xl mt-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">📋 Daftar Task</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">Belum ada task.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div
            key={task._id}
            className="p-6 border rounded-2xl bg-white shadow-lg flex flex-col h-full min-h-[260px] transition-all transform hover:scale-105 hover:shadow-2xl"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-xl text-gray-900 flex-1 truncate">{task.title}</h3>
              <span className={`text-sm font-semibold px-3 py-1 rounded-full w-24 text-center transition-all duration-300 ${
                task.status === "completed"
                  ? "bg-[#98D2C0] text-[#205781]"
                  : "bg-yellow-200 text-yellow-800"
              }`}>
                {task.status === "completed" ? "✅ Selesai" : "⏳ Pending"}
              </span>
            </div>
          
            <p className="text-md text-gray-700 mb-3">{task.description}</p>
            <p className="text-xs text-gray-500 italic mb-2">📅 Deadline: {task.dueDate}</p>
          
            {/* Perbaikan Tombol */}
            <div className="mt-auto pt-4 flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => handleToggleStatus(task._id)}
                className={`px-3 py-2 w-24 text-center rounded-lg font-semibold text-white transition-all duration-300 shadow-md 
                  ${task.status === "completed"
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-yellow-500 hover:bg-yellow-600"
                  }`}
              >
                {task.status === "completed" ? "✅ Selesai" : "⏳ Pending"}
              </button>
          
              <button
                onClick={() => handleEdit(task)}
                className="bg-blue-500 text-white px-3 py-2 w-24 text-center rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-md"
              >
                ✏ Edit
              </button>
          
              <button
                onClick={() => handleDelete(task._id)}
                className="bg-red-500 text-white px-3 py-2 w-24 text-center rounded-lg hover:bg-red-600 transition-all duration-300 shadow-md"
              >
                🗑 Hapus
              </button>
            </div>
          </div>
          
          ))}
        </div>
      )}

      {isEditModalOpen && selectedTask && <EditTask task={selectedTask} onClose={closeModal} />}
    </div>
  );
};

export default TaskList;
