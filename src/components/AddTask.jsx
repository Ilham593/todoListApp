import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../features/taskSlice";
import { useState } from "react";

const AddTask = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.tasks);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask(formData));
    setFormData({
      title: "",
      description: "",
      dueDate: "",
      category: "",
    });
  };

  return (
    <div className="bg-[#4F959D] p-6 shadow-lg rounded-lg mb-6 text-white">
      <h2 className="text-2xl font-semibold text-center mb-4">📝 Tambah Task</h2>
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

        <button
          type="submit"
          className="w-full bg-[#98D2C0] text-gray-800 font-bold p-3 rounded-lg hover:bg-[#86B8A5] transition duration-300 shadow-md"
          disabled={loading}
        >
          {loading ? "Menambahkan..." : "Tambah Task"}
        </button>
      </form>
    </div>
  );
};

export default AddTask;
