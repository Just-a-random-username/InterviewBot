import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock, Eye, EyeOff, GitBranch } from "lucide-react";
import { Link,useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginError,setLoginError] = useState(null)

  const validateForm = () => {
    const newErrors = {};

    if (!name) {
      newErrors.name = "Name is required";
    }

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

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      
      const res = await axios.post('http://localhost:3000/api/v1/register',{
        name,email,password
      })
      navigate('/login')
    } catch (error) {
      setLoginError(error.message)
      console.log(error) 
    }
  };

  //   const socialLoginOptions = [
  //     {
  //       icon: GitBranch,
  //       name: "GitHub",
  //       color: "text-gray-100",
  //     },
  //   ];

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
          <h2 className="text-3xl font-bold text-white">Create Account</h2>
          <p className="text-gray-300 mt-2">
            Sign Up to get started with InterviewAI
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className={`w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border ${
                  errors.name
                    ? "border-red-500"
                    : "border-white/20 focus:border-blue-500"
                } text-white placeholder-gray-400 focus:outline-none`}
              />
            </div>
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name}</p>
            )}
          </div>

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

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors duration-300"
          >
            Sign Up
          </button>
        </form>

        {/* <div className="mt-6">
          <div className="flex items-center justify-center space-x-4">
            {socialLoginOptions.map((social) => (
              <button
                key={social.name}
                className={`${social.color} bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors`}
              >
                <social.icon size={24} />
              </button>
            ))}
          </div>
        </div> */}

        <div className="text-center mt-6 text-gray-300">
          {loginError}
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:text-blue-300">
            Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
