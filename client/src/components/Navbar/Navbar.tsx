import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, Upload, Home, LogIn ,Bot, icons} from "lucide-react";

interface UserDetail {
  name: string;
  email: string;
  token : string;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user_desc= localStorage.getItem("userdetail");
    if (user_desc) {
      setUserDetail(JSON.stringify(user_desc));
    }
  }, []);

  const handleLogout = async() => {
    localStorage.removeItem("userdetail");
    setUserDetail(null);
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Upload Resume", path: "/upload", icon: Upload },
    userDetail
      ? { name: "Logout", path: "#", icon: LogIn, action: handleLogout }
      : { name: "Login", path: "/login", icon: LogIn },
      {name : "Chabot", path : userDetail ? "/chatbot":"/login" , icon : Bot},
      // userDetail ? {name : "Chabot", path : "/chatbot" , icon : Bot} :{name : "",path : "",icons : ""},
      userDetail
      ? { name: userDetail.name, path: "/profile", icon: User }
      : { name: "Signup", path: "/signup", icon: User }
    
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gray-900/80 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white">
          InterviewBot
        </Link>

        <div className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link,id) => (
            <div key={id}>
              {link.action ? (
                <button
                  onClick={link.action}
                  className="text-white/80 hover:text-white flex items-center space-x-2"
                >
                  <link.icon size={20} />
                  <span>{link.name}</span>
                </button>
              ) : (
                <Link
                  to={link.path}
                  className="text-white/80 hover:text-white flex items-center space-x-2"
                >
                  <link.icon size={20} />
                  <span>{link.name}</span>
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="md:hidden fixed top-4 right-4 z-[9999]">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-b from-gray-900 to-blue-900 z-[9998] md:hidden"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="container mx-auto px-4 py-20 space-y-8"
            >
              <Link
                to="/"
                onClick={toggleMenu}
                className="block text-4xl font-bold text-white text-center"
              >
                InterviewAI
              </Link>

              <div className="space-y-6">
                {navLinks.map((link) => (
                  <motion.div
                    key={link.name}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {link.action ? (
                      <button
                        onClick={() => {
                          link.action();
                          toggleMenu();
                        }}
                        className="flex items-center justify-center space-x-4 text-2xl text-white/80 hover:text-white py-4"
                      >
                        <link.icon size={30} />
                        <span>{link.name}</span>
                      </button>
                    ) : (
                      <Link
                        to={link.path}
                        onClick={toggleMenu}
                        className="flex items-center justify-center space-x-4 text-2xl text-white/80 hover:text-white py-4"
                      >
                        <link.icon size={30} />
                        <span>{link.name}</span>
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
