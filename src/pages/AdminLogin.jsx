import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Lock,
  LogIn,
  ShieldCheck,
  User,
  AlertCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.username === "admin" && formData.password === "admin123") {
      localStorage.setItem("djAdminLoggedIn", "true");
      navigate("/admin");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#030712] px-5 py-8 text-white sm:px-6">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_12%,rgba(34,211,238,0.18),transparent_34%),radial-gradient(circle_at_82%_75%,rgba(168,85,247,0.18),transparent_32%),linear-gradient(180deg,#030712_0%,#020617_55%,#000_100%)]" />
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:90px_90px]" />
      </div>

      <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl flex-col">
        {/* Top Bar */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-bold text-white/80 backdrop-blur-xl transition hover:bg-white hover:text-black"
          >
            <ArrowLeft size={18} />
            Back Home
          </Link>

          <div className="flex items-center gap-3">
            <img
              src="/dj-selva-logo.png"
              alt="DJ Selva Logo"
              className="h-12 w-12 rounded-full object-contain"
            />

            <div className="hidden sm:block">
              <h2 className="font-black leading-none">DJ Selva</h2>
              <p className="mt-1 text-[10px] tracking-[0.3em] text-cyan-300">
                ADMIN LOGIN
              </p>
            </div>
          </div>
        </div>

        {/* Login Layout */}
        <div className="grid flex-1 items-center gap-10 lg:grid-cols-[1fr_0.85fr]">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="text-center lg:text-left"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-cyan-300">
              <ShieldCheck size={15} />
              Secure Admin Access
            </div>

            <h1 className="text-4xl font-black leading-[0.95] tracking-[-0.04em] sm:text-5xl md:text-7xl">
              Control your
              <br />
              <span className="bg-gradient-to-r from-cyan-200 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                event system.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg lg:mx-0">
              Admin can manage bookings, QR ticket verification, event status,
              ticket categories, and customer reservations from one dashboard.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <FeatureBox title="Bookings" text="Manage reservations" />
              <FeatureBox title="QR Scan" text="Verify tickets" />
              <FeatureBox title="Reports" text="Track revenue" />
            </div>
          </motion.div>

          {/* Login Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: 35 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.75 }}
            className="mx-auto w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_0_55px_rgba(0,0,0,0.4)] backdrop-blur-2xl sm:p-8"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cyan-300/10 text-cyan-300 shadow-[0_0_45px_rgba(34,211,238,0.22)]">
              <Lock size={38} />
            </div>

            <div className="mt-6 text-center">
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">
                Login
              </p>
              <h2 className="text-3xl font-black">Admin Panel</h2>
              <p className="mt-3 text-sm text-white/55">
                Enter admin credentials to access dashboard.
              </p>
            </div>

            {error && (
              <div className="mt-6 flex items-center gap-2 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm font-bold text-red-300">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-bold text-white/80">
                  Username
                </label>

                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/35 px-4 py-4 transition focus-within:border-cyan-300/50">
                  <User size={18} className="text-cyan-300" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter username"
                    required
                    className="w-full bg-transparent text-white outline-none placeholder:text-white/30"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-white/80">
                  Password
                </label>

                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/35 px-4 py-4 transition focus-within:border-cyan-300/50">
                  <Lock size={18} className="text-cyan-300" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    required
                    className="w-full bg-transparent text-white outline-none placeholder:text-white/30"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-4 font-black text-black transition hover:bg-cyan-300"
              >
                Login to Dashboard
                <LogIn size={19} />
              </button>
            </form>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/55">
              <p className="font-bold text-white/80">Demo Login:</p>
              <p className="mt-1">Username: admin</p>
              <p>Password: admin123</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function FeatureBox({ title, text }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.03 }}
      className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-2xl transition hover:border-cyan-300/30"
    >
      <h3 className="font-black text-cyan-300">{title}</h3>
      <p className="mt-2 text-sm text-white/55">{text}</p>
    </motion.div>
  );
}

export default AdminLogin;