import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-[#4F959D] text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-wide">📌 TaskMe</h1>
        <div className="flex items-center gap-4">
          {user && <span className="text-lg font-medium">👋 {user.name}</span>}
          <button 
            onClick={handleLogout} 
            className="bg-red-500 px-4 py-2 rounded-lg font-semibold text-white hover:bg-red-600 transition duration-300 shadow-md"
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
