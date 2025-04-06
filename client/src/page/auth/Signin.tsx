import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface Errors {
  email?: string;
  password?: string;
}

const Signin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});
  const [err, setErr] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const res = await axios.post("http://localhost:3000/api/v1/login", {
        email,
        password,

      }
      ,
      {headers : {
        Accept : '*'
      }});
      localStorage.setItem("userdetail", JSON.stringify(res.data.userdetail));
      navigate("/");
      window.location.reload();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setErr(error.response.data?.message || "An error occurred during login");
      } else {
        setErr("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 shadow-2xl"
      >
        <div className="text-center mb-8">
          <LogIn className="mx-auto text-blue-400 mb-4" size={50} />
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
          <p className="text-gray-300 mt-2">Sign in to continue to InterviewAI</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className={`w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border ${
                  errors.email
                    ? "border-red-500"
                    : "border-white/20 focus:border-blue-500"
                } text-white placeholder-gray-400 focus:outline-none`}
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className={`w-full pl-10 pr-10 py-3 rounded-lg bg-white/10 border ${
                  errors.password
                    ? "border-red-500"
                    : "border-white/20 focus:border-blue-500"
                } text-white placeholder-gray-400 focus:outline-none`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-blue-400 hover:text-blue-300 text-sm"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors duration-300"
          >
            Sign In
          </button>
        </form>

        {err && <p className="text-red-400 text-center mt-4">{err}</p>}

        <div className="text-center mt-6 text-gray-300">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:text-blue-300">
            Sign Up
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Signin;
