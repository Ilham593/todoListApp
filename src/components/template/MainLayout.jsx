import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar /> {/* 🔥 Navbar hanya ditampilkan sekali */}
      <div className="container mx-auto p-6">
        <Outlet /> {/* 🔥 Ini akan menampilkan halaman yang sedang aktif */}
      </div>
    </div>
  );
};

export default MainLayout;
