import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import Loading from "../components/Loading.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

const AdminDashboard = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { enrollStudent, loading, error } = useAuthStore();

  const handleEnroll = async (e) => {
    e.preventDefault();
    setMessage("");
    const res = await enrollStudent(email.trim());
    if (res.success) {
      setMessage(`Student enrolled successfully! Access code: ${res.data.accessCode}`);
      setEmail("");
    }
  };

  return (
    <>
      {loading && <Loading message="Enrolling student..." />}
      <div className="min-h-screen bg-linear-to-br from-emerald-50 via-teal-50 to-cyan-50 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-10 animate-slideDown">
            <h2 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">
              Admin Dashboard
            </h2>
            <div className="h-1 w-32 bg-linear-to-r from-emerald-600 to-cyan-600 mx-auto rounded-full"></div>
          </div>

          {/* Main Card */}
          <div className="bg-white/80 backdrop-blur-lg p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl border border-white/20 animate-fadeIn relative overflow-hidden">
            
            {/* Decorative Blobs */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/2 w-24 h-24 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-800 animate-slideUp">
                Enroll New Student
              </h3>

              <ErrorMessage message={error} />

              {message && (
                <div className="bg-linear-to-r from-green-50 to-emerald-50 border-2 border-green-400 text-green-700 px-4 sm:px-6 py-3 sm:py-4 rounded-xl mb-4 sm:mb-6 text-sm sm:text-base animate-slideUp shadow-lg">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 mr-2 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">{message}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleEnroll} className="space-y-4 sm:space-y-6">
                <div className="animate-slideUp" style={{ animationDelay: "0.1s" }}>
                  <label className="block text-base sm:text-lg font-medium mb-2 text-gray-700">
                    Student Email
                  </label>
                  <div className="relative group">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="student@example.com"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 text-sm sm:text-base transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-emerald-300"
                    />
                    <div className="absolute inset-0 rounded-xl bg-linear-to-r from-emerald-400 to-cyan-400 opacity-0 group-focus-within:opacity-20 blur-xl transition-opacity duration-300 -z-10"></div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white py-2.5 sm:py-3 rounded-xl text-base sm:text-lg font-semibold hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 transition-all duration-300 animate-slideUp relative overflow-hidden group"
                  style={{ animationDelay: "0.2s" }}
                >
                  <span className="relative z-10">Enroll Student & Send Access</span>
                  <div className="absolute inset-0 bg-linear-to-r from-cyan-600 via-teal-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
        .animate-slideDown { animation: slideDown 0.6s ease-out; }
        .animate-slideUp { animation: slideUp 0.6s ease-out; animation-fill-mode: both; }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </>
  );
};

export default AdminDashboard;