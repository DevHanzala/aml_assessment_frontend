import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { token, role, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    localStorage.clear();
    navigate("/");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-linear-to-r from-blue-900 via-indigo-900 to-purple-900 text-white shadow-2xl relative overflow-hidden">
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-linear-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 animate-shimmer"></div>
      
      <div className="container mx-auto px-4 py-4 relative z-10">
        <div className="flex justify-between items-center">
          {/* Logo / Brand */}
          <Link
            to="/"
            className="text-2xl sm:text-3xl font-bold tracking-wide hover:scale-105 transition-transform duration-300 group"
            onClick={closeMenu}
          >
            <span className="bg-linear-to-r from-blue-200 via-indigo-200 to-purple-200 bg-clip-text text-transparent group-hover:from-white group-hover:to-white transition-all duration-300">
              AML/CFT
            </span>
          </Link>

          {/* Hamburger Menu Button - Visible on mobile */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X size={24} className="animate-rotate" />
            ) : (
              <Menu size={24} />
            )}
          </button>

          {/* Desktop Menu - Hidden on mobile */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            {!token ? (
              <>
                <Link
                  to="/"
                  className="px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/admin/login"
                  className="px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm font-medium"
                >
                  Admin Login
                </Link>
                <Link
                  to="/start"
                  className="px-4 py-2 rounded-lg bg-linear-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium"
                >
                  Start Exam
                </Link>
              </>
            ) : role === "admin" ? (
              <>
                <Link
                  to="/admin/dashboard"
                  className="px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm font-medium"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-red-500/90 hover:bg-red-600 transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/exam"
                  className="px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm font-medium"
                >
                  Exam
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-red-500/90 hover:bg-red-600 transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu - Visible when hamburger is clicked */}
        <div
          className={`${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } md:hidden overflow-hidden transition-all duration-500 ease-in-out`}
        >
          <div className="mt-4 pb-2 space-y-2">
            {!token ? (
              <>
                <Link
                  to="/"
                  className="block py-3 px-4 hover:bg-white/10 rounded-lg transition-all duration-300 backdrop-blur-sm font-medium transform hover:translate-x-2"
                  onClick={closeMenu}
                >
                  🏠 Home
                </Link>
                <Link
                  to="/admin/login"
                  className="block py-3 px-4 hover:bg-white/10 rounded-lg transition-all duration-300 backdrop-blur-sm font-medium transform hover:translate-x-2"
                  onClick={closeMenu}
                >
                  👤 Admin Login
                </Link>
                <Link
                  to="/start"
                  className="block py-3 px-4 bg-linear-to-r from-blue-500 to-indigo-500 rounded-lg transition-all duration-300 font-medium hover:shadow-lg transform hover:translate-x-2"
                  onClick={closeMenu}
                >
                  🚀 Start Exam
                </Link>
              </>
            ) : role === "admin" ? (
              <>
                <Link
                  to="/admin/dashboard"
                  className="block py-3 px-4 hover:bg-white/10 rounded-lg transition-all duration-300 backdrop-blur-sm font-medium transform hover:translate-x-2"
                  onClick={closeMenu}
                >
                  📊 Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-3 px-4 bg-red-500/90 hover:bg-red-600 rounded-lg transition-all duration-300 font-medium hover:shadow-lg transform hover:translate-x-2"
                >
                  🚪 Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/exam"
                  className="block py-3 px-4 hover:bg-white/10 rounded-lg transition-all duration-300 backdrop-blur-sm font-medium transform hover:translate-x-2"
                  onClick={closeMenu}
                >
                  📝 Exam
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-3 px-4 bg-red-500/90 hover:bg-red-600 rounded-lg transition-all duration-300 font-medium hover:shadow-lg transform hover:translate-x-2"
                >
                  🚪 Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(90deg); }
        }

        .animate-shimmer {
          animation: shimmer 3s infinite;
        }

        .animate-rotate {
          animation: rotate 0.3s ease-out;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;