import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Swal from "sweetalert2";
import logo from "../assets/logo.png";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { isAuthenticated } from "../auth/useAuth";
import bgimg from "../assets/bgimg.png";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ ADDED

  const navigate = useNavigate();

  // 🔥 PREVENT LOGIN PAGE IF ALREADY AUTHENTICATED
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) return; // ✅ Prevent multiple clicks

    setLoading(true); // ✅ Start loading
    try {
      const res = await api.post("/auth/login", { username, password });
      localStorage.setItem("admin_token", res.data.token);

      navigate("/", { replace: true });
    } catch {
      Swal.fire("Error", "Invalid username or password", "error");
      setPassword("");
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center"
      style={{ backgroundImage: `url(${bgimg})` }}
    >
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-96 text-center"
      >
        <img src={logo} className="mx-auto mb-4 w-full h-full" />

        {/* Username */}
        <div className="relative mb-4">
          <User className="absolute left-3 top-3 text-black" size={22} />
          <input
            placeholder="Username"
            className="w-full p-3 pl-10 border rounded text-[16px]"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="relative mb-6">
          <Lock className="absolute left-3 top-3 text-gray-400" size={22} />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-3 pl-10 pr-10 border rounded text-[16px]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-500"
          >
            {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
          </button>
        </div>

        <button
          disabled={loading} // ✅ Disabled while loading
          className={`w-full bg-blue hover:bg-red text-white py-3 rounded-lg text-[18px] ${loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
        >
          {loading ? "Logging in..." : "Login"} {/* ✅ Loading text */}
        </button>
      </form>
    </div>
  );
}
