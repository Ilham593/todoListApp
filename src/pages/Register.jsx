import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  })

  const dispatch = useDispatch()
  const { loading, error, success } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  }

  useEffect(() => {
    if (success) {
      navigate("/login")
    }
  }, [success, navigate])

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#205781] p-2">
      <div className="bg-[#4F959D] p-8 rounded-lg shadow-lg w-full max-w-3xl flex flex-col md:flex-row items-center">
        {/* Kiri - Gambar */}
        <div className="w-full md:w-1/2 hidden md:flex items-center justify-center ">
          <img src="/img/bg-reg.png" alt="Register Illustration" className=" max-w-sm object-cover" />
        </div>

        {/* Kanan - Form */}
        <div className="w-full md:w-1/2 px-6">
          <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Register</h2>
          {error && <p className="text-white text-center mb-2">{error}</p>}
          {loading && <p className="text-blue-500 text-center mb-2">Loading...</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="bg-[#F6F8D5] w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black font-bold"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="bg-[#F6F8D5] w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black font-bold"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="bg-[#F6F8D5] w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black font-bold"
              required
            />
            <button
              type="submit"
              className="w-full bg-[#98D2C0] text-black p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="text-center text-black mt-4 ">
            Already have an account?{" "}
            <a href="/login" className="text-white font-bold hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </section>

    // <div className="min-h-screen flex items-center justify-center bg-gray-100">
    //   <div className="bg-white p-8 rounded-lg shadow-md w-96">
    //     <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>
    //     {error && <p className="text-red-500 text-center">{error}</p>}
    //     {loading && <p className="text-blue-500 text-center">Loading...</p>}
    //     <form onSubmit={handleSubmit} className="space-y-4">
    //       <input
    //         type="text"
    //         name="username"
    //         placeholder="Username"
    //         value={formData.username}
    //         onChange={handleChange}
    //         className="w-full p-2 border rounded-lg"
    //         required
    //       />
    //       <input
    //         type="email"
    //         name="email"
    //         placeholder="Email"
    //         value={formData.email}
    //         onChange={handleChange}
    //         className="w-full p-2 border rounded-lg"
    //         required
    //       />
    //       <input
    //         type="password"
    //         name="password"
    //         placeholder="Password"
    //         value={formData.password}
    //         onChange={handleChange}
    //         className="w-full p-2 border rounded-lg"
    //         required
    //       />
    //       <button
    //         type="submit"
    //         className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
    //         disabled={loading}
    //       >
    //         {loading ? "Registering..." : "Register"}
    //       </button>
    //       <p className="text-center">
    //         Already have an account?{" "}
    //         <a href="/login" className="text-blue-500 hover:underline">
    //           Login
    //         </a>
    //       </p>
    //     </form>
    //   </div>
    // </div>
  )
}

export default Register