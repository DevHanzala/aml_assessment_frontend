import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Home = () => {
  const { role } = useAuthStore();

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full text-center">

        {/* Hero Section */}
        <div className="animate-fadeIn">
          {/* Title */}
          <div className="animate-slideDown mb-6 sm:mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              AML/CFT Certification
            </h1>
            <div className="h-1.5 w-48 bg-linear-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>

          {/* Description Card */}
          <div className="animate-slideUp bg-white/80 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-xl border border-white/20 mb-8 sm:mb-10 md:mb-12 relative overflow-hidden" style={{ animationDelay: "0.2s" }}>
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>

            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed relative z-10">
              This platform is for the <strong className="text-indigo-600">mandatory AML/CFT certification assessment </strong>
              <p>Achieve <strong className="text-green-600 font-semibold">80% or higher</strong> to earn your certificate.</p>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 sm:space-y-6 animate-slideUp" style={{ animationDelay: "0.4s" }}>
            {!role ? (
              <div className="flex flex-col items-center gap-4">
                <Link
                  to="/start"
                  className="inline-block w-full sm:w-auto bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-10 sm:px-14 py-4 sm:py-5 rounded-xl text-lg sm:text-xl font-semibold hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Start Exam (Student)
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-purple-600 via-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>

                <Link
                  to="/admin/login"
                  className="inline-block text-indigo-600 underline text-base sm:text-lg font-medium hover:text-purple-600 transition-colors duration-200 hover:scale-105 transform"
                >
                  Admin Login →
                </Link>
              </div>
            ) : role === "admin" ? (
              <Link
                to="/admin/dashboard"
                className="inline-block w-full sm:w-auto bg-linear-to-r from-green-600 via-emerald-600 to-teal-600 text-white px-10 sm:px-14 py-4 sm:py-5 rounded-xl text-lg sm:text-xl font-semibold hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Go to Admin Dashboard
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-teal-600 via-emerald-600 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            ) : (
              <Link
                to="/exam"
                className="inline-block w-full sm:w-auto bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-10 sm:px-14 py-4 sm:py-5 rounded-xl text-lg sm:text-xl font-semibold hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                  Continue Exam
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-purple-600 via-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            )}
          </div>

          {/* Feature Badges */}
          <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-slideUp" style={{ animationDelay: "0.6s" }}>
            <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-blue-200 hover:border-blue-400 transition-all duration-300 hover:scale-105">
              <div className="text-blue-600 text-3xl mb-2">📚</div>
              <div className="font-semibold text-gray-800">Comprehensive</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-indigo-200 hover:border-indigo-400 transition-all duration-300 hover:scale-105">
              <div className="text-indigo-600 text-3xl mb-2">🏆</div>
              <div className="font-semibold text-gray-800">Certified</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-purple-200 hover:border-purple-400 transition-all duration-300 hover:scale-105">
              <div className="text-purple-600 text-3xl mb-2">⚡</div>
              <div className="font-semibold text-gray-800">Instant Results</div>
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

        .animate-fadeIn { animation: fadeIn 0.8s ease-out; }
        .animate-slideDown { animation: slideDown 0.6s ease-out; }
        .animate-slideUp { animation: slideUp 0.6s ease-out; animation-fill-mode: both; }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
};

export default Home;