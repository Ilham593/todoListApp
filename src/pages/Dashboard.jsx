import { useSelector } from "react-redux";
import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth); // 🔥 Ambil data user dari Redux

  return (
    <section className="min-h-screen bg-[#F6F8D5] p-6 flex justify-center">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 🔹 Info User (Kiri) */}
        <div className="bg-white p-6 rounded-lg shadow-xl transition-all duration-300 transform hover:scale-105">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">👤 Info Pengguna</h2>
          {user ? (
            <div className="text-gray-700 space-y-2">
              <p className="text-lg"><strong>Nama:</strong> {user.username}</p>
              <p className="text-lg"><strong>Email:</strong> {user.email}</p>
            </div>
          ) : (
            <p className="text-gray-500 text-lg">Belum login.</p>
          )}
        </div>

        {/* 🔹 Form Tambah Task & List Task (Kanan) */}
        <div className="md:col-span-2 space-y-6">
          <AddTask /> {/* 🔥 Form tambah task */}
          <TaskList /> {/* 🔥 List task */}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
