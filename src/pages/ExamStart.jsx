import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useExamStore } from "../store/examStore";
import Loading from "../components/Loading.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

const ExamStart = () => {
  const [email, setEmail] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const { startExam, loading, error } = useExamStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await startExam(email.trim(), accessCode.trim());
    if (res.success) {
      navigate("/exam");
    }
  };

  return (
    <>
      {loading && <Loading message="Starting exam..." />}
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-6 sm:py-8 bg-linear-to-br from-violet-50 via-purple-50 to-fuchsia-50">
        <div className="max-w-md w-full animate-fadeIn">
          <div className="bg-white/80 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-2xl border border-white/20 transform transition-all duration-300 hover:shadow-3xl relative overflow-hidden">
            
            {/* Decorative Blobs */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-violet-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-fuchsia-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-10 w-20 h-20 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

            {/* Header */}
            <div className="text-center mb-6 sm:mb-8 animate-slideDown relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent mb-2">
                Start Your Exam
              </h2>
              <div className="h-1 w-24 bg-linear-to-r from-violet-600 to-fuchsia-600 mx-auto rounded-full"></div>
            </div>

            <div className="relative z-10">
              <ErrorMessage message={error} />

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Email Input */}
                <div className="animate-slideUp" style={{ animationDelay: "0.1s" }}>
                  <label className="block text-base sm:text-lg font-medium mb-2 text-gray-700">
                    Your Email
                  </label>
                  <div className="relative group">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 text-sm sm:text-base transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-violet-300"
                      placeholder="student@example.com"
                    />
                    <div className="absolute inset-0 rounded-xl bg-linear-to-r from-violet-400 to-fuchsia-400 opacity-0 group-focus-within:opacity-20 blur-xl transition-opacity duration-300 -z-10"></div>
                  </div>
                </div>

                {/* Access Code Input */}
                <div className="animate-slideUp" style={{ animationDelay: "0.2s" }}>
                  <label className="block text-base sm:text-lg font-medium mb-2 text-gray-700">
                    Access Code
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      value={accessCode}
                      onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                      required
                      placeholder="e.g. A1B2C3D4"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 uppercase text-sm sm:text-base transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-violet-300"
                    />
                    <div className="absolute inset-0 rounded-xl bg-linear-to-r from-violet-400 to-fuchsia-400 opacity-0 group-focus-within:opacity-20 blur-xl transition-opacity duration-300 -z-10"></div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-linear-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white py-2.5 sm:py-3 rounded-xl text-base sm:text-lg font-semibold hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 transition-all duration-300 animate-slideUp relative overflow-hidden group"
                  style={{ animationDelay: "0.3s" }}
                >
                  <span className="relative z-10">Start Exam</span>
                  <div className="absolute inset-0 bg-linear-to-r from-fuchsia-600 via-purple-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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

export default ExamStart;