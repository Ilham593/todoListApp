import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#205781] p-2">
      <div className="bg-[#4F959D] p-8 rounded-lg shadow-lg w-full max-w-3xl flex flex-col md:flex-row items-center">
        {/* Kiri - Gambar */}
        <div className="w-full md:w-1/2 hidden md:flex items-center justify-center p-4">
          <img src="/img/bg-reg.png" alt="Login Illustration" className="w-full max-w-sm object-cover" />
        </div>

        {/* Kanan - Form */}
        <div className="w-full md:w-1/2 px-6">
          <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Login</h2>
          {error && <p className="text-red-500 text-center mb-2">{error}</p>}
          {loading && <p className="text-blue-500 text-center mb-2">Loading...</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border bg-[#F6F8D5] border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div className="flex flex-col">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border bg-[#F6F8D5] border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#98D2C0] text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-black font-bold mt-4">
            Don't have an account?{" "}
            <a href="/register" className="text-white  hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
