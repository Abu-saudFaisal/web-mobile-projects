import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(username, password);
      navigate("/");
    } catch {
      setError("Invalid username or password");
    }
  };

  return (
    <section className="min-h-screen bg-[#1A120B] text-white flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#24160D] border border-[#3C2A21] rounded-2xl p-8"
      >
        <h1 className="text-3xl font-bold text-[#D5A373] mb-2">Login</h1>
        <p className="text-white/70 mb-6">Welcome back to BloomLab.</p>

        {error && <p className="mb-4 text-red-400">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 px-4 py-3 rounded-lg bg-[#1A120B] border border-[#3C2A21] outline-none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-3 rounded-lg bg-[#1A120B] border border-[#3C2A21] outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-[#D5A373] text-[#1A120B] font-semibold py-3 rounded-lg">
          Login
        </button>

        <p className="text-white/70 mt-5 text-center">
          New here?{" "}
          <Link to="/register" className="text-[#D5A373]">
            Create account
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Login;