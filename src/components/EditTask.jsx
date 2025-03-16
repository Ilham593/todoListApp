import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../features/taskSlice";
import { format } from "date-fns";

const EditTask = ({ task, onClose }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.tasks);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    category: "",
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate ? format(new Date(task.dueDate), "yyyy-MM-dd") : "",
        category: task.category,
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const updatedTask = {
      ...formData,
      _id: task._id,
      dueDate: new Date(formData.dueDate).toISOString(), // 🔥 Pastikan formatnya kembali ke ISO sebelum dikirim
    };
  
    dispatch(updateTask(updatedTask));
    onClose();
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#4F959D] p-6 rounded-lg shadow-lg w-full max-w-md text-white">
        <h2 className="text-2xl font-semibold text-center mb-4">✏ Edit Task</h2>
        {error && <p className="text-red-200 text-center mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="title"
            placeholder="Judul Task"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border bg-[#F6F8D5] text-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#98D2C0] focus:outline-none"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Deskripsi"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border bg-[#F6F8D5] text-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#98D2C0] focus:outline-none"
            required
          />
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full p-3 border bg-[#F6F8D5] text-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#98D2C0] focus:outline-none"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Kategori"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 border bg-[#F6F8D5] text-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#98D2C0] focus:outline-none"
            required
          />

          <div className="flex justify-end gap-2 mt-4">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-4 py-2 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-500 transition duration-300"
            >
              ❌ Batal
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-[#98D2C0] text-gray-800 font-bold rounded-lg hover:bg-[#86B8A5] transition duration-300 shadow-md"
              disabled={loading}
            >
              {loading ? "Menyimpan..." : "💾 Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
