"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function AdminLoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!form.email.trim() || !form.password) {
      alert("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post(
        "/api/auth/login",
        {
          email: form.email.trim(),
          password: form.password,
        }
      );

      console.log("Login successful:", res.data);

      /*
       * IMPORTANT:
       *
       * FastAPI sets the JWT as an HttpOnly cookie:
       *
       * admin_session=<JWT>
       *
       * We DO NOT store the JWT in localStorage.
       * We DO NOT manually handle the cookie.
       *
       * Axios uses withCredentials: true,
       * so the browser automatically sends
       * the cookie with future API requests.
       */

      if (res.data?.success) {
        router.replace("/admin/dashboard");
      } else {
        alert("Login failed. Please try again.");
      }

    } catch (error: any) {
      console.error("Login Error:", error);

      if (error.response) {
        const message =
          error.response.data?.detail ||
          "Invalid email or password.";

        alert(message);
      } else {
        alert(
          "Cannot connect to the backend. Please make sure the server is running."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">

      {/* Header */}

      <div className="bg-gradient-to-r from-blue-700 to-sky-500 text-white text-center p-8">

        <div className="w-20 h-20 rounded-full bg-white/20 mx-auto flex items-center justify-center text-3xl font-bold">
          HR
        </div>

        <h1 className="text-3xl font-bold mt-5">
          Vision Dholera
        </h1>

        <p className="mt-2 text-blue-100">
          Admin Dashboard Login
        </p>

      </div>

      {/* Login Form */}

      <form
        onSubmit={handleSubmit}
        className="p-8 space-y-6"
      >

        {/* Email */}

        <div>

          <label
            htmlFor="email"
            className="text-sm font-medium"
          >
            Email
          </label>

          <div className="mt-2 relative">

            <Mail
              className="absolute left-4 top-3.5 text-gray-400"
              size={20}
            />

            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="admin@example.com"
              autoComplete="username"
              disabled={loading}
              required
              className="w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100"
            />

          </div>

        </div>

        {/* Password */}

        <div>

          <label
            htmlFor="password"
            className="text-sm font-medium"
          >
            Password
          </label>

          <div className="mt-2 relative">

            <Lock
              className="absolute left-4 top-3.5 text-gray-400"
              size={20}
            />

            <input
              id="password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="********"
              autoComplete="current-password"
              disabled={loading}
              required
              className="w-full pl-12 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  (prev) => !prev
                )
              }
              disabled={loading}
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
              className="absolute right-4 top-3.5 text-gray-500 hover:text-gray-700 disabled:opacity-50"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

        </div>

        {/* Remember Me / Forgot Password */}

        <div className="flex items-center justify-between text-sm">

          <label className="flex items-center gap-2 text-gray-600">

            <input
              type="checkbox"
              disabled={loading}
              className="rounded"
            />

            Remember Me

          </label>

          <button
            type="button"
            disabled={loading}
            className="text-blue-600 hover:underline disabled:opacity-50"
            onClick={() => {
              alert(
                "Password recovery will be available soon."
              );
            }}
          >
            Forgot Password?
          </button>

        </div>

        {/* Login Button */}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 transition text-white font-semibold py-3 rounded-xl"
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

      </form>

    </div>
  );
}