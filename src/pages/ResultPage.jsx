import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useExamStore } from "../store/examStore";
import api from "../store/api";

const ResultPage = () => {
  const { result, clearExam, setQuestions, setSessionId, setAnswers, setResult, candidateName } = useExamStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!result) {
      navigate("/");
    }
  }, [result, navigate]);

  if (!result) return null;

  const isPassed = result.percentage >= 80;
  const attempts = result.attempts || 1;

  const handleRetry = async () => {
    try {
      const res = await api.post("/api/exam/start");

      setQuestions(res.data.questions);
      setSessionId(res.data.sessionId);
      setAnswers({});
      setResult(null);

      navigate("/exam");
    } catch (err) {
      alert(err.response?.data?.message || "Cannot start new attempt");
      clearExam();
      navigate("/");
    }
  };

  const handleBackToHome = () => {
    clearExam();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-gray-50 to-zinc-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
      <div className="max-w-2xl w-full">
        {/* Result Card */}
        <div className="bg-white/80 backdrop-blur-lg p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl border border-white/20 text-center animate-fadeIn relative overflow-hidden">
          
          {/* Decorative Blobs */}
          <div className={`absolute top-0 left-0 w-32 h-32 ${isPassed ? 'bg-green-400' : 'bg-red-400'} rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob`}></div>
          <div className={`absolute top-0 right-0 w-32 h-32 ${isPassed ? 'bg-emerald-400' : 'bg-orange-400'} rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000`}></div>
          <div className={`absolute bottom-0 left-1/2 w-32 h-32 ${isPassed ? 'bg-teal-400' : 'bg-rose-400'} rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-4000`}></div>

          <div className="relative z-10">
            {/* Header */}
            <div className="animate-slideDown">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Exam Result
              </h2>
            </div>

            {/* Pass/Fail Badge */}
            <div className="animate-scaleIn" style={{ animationDelay: "0.2s" }}>
              <div className={`inline-block px-8 sm:px-12 py-4 sm:py-6 rounded-2xl mb-6 sm:mb-8 ${
                isPassed 
                  ? 'bg-linear-to-r from-green-500 to-emerald-500 shadow-lg shadow-green-500/50' 
                  : 'bg-linear-to-r from-red-500 to-rose-500 shadow-lg shadow-red-500/50'
              } transform transition-all duration-300 hover:scale-105`}>
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
                  {isPassed ? "PASSED!" : "FAILED"}
                </div>
              </div>
            </div>

            {/* Score Display */}
            <div className="animate-slideUp" style={{ animationDelay: "0.3s" }}>
              <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border-2 border-blue-200">
                <p className="text-xl sm:text-2xl font-semibold text-gray-800">
                  Score: <span className="text-blue-600">{result.score}</span> / <span className="text-indigo-600">{result.percentage.toFixed(2)}%</span>
                </p>
              </div>
            </div>

            {/* Message Box */}
            {isPassed ? (
              <div className="animate-slideUp bg-linear-to-r from-green-50 to-emerald-50 border-2 border-green-400 text-green-700 px-4 sm:px-6 md:px-8 py-4 sm:py-6 rounded-2xl mb-6 sm:mb-8 shadow-lg" style={{ animationDelay: "0.4s" }}>
                <div className="flex items-start justify-center mb-3">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 mr-2 shrink-0 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-lg sm:text-xl font-semibold">
                    Congratulations! Your certificate has been downloaded automatically.
                  </p>
                </div>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base">
                  Check your downloads folder for <strong className="text-green-800">AML_CFT_Certificate_{candidateName || "Candidate"}.pdf</strong>
                </p>
              </div>
            ) : (
              <div className="animate-slideUp bg-linear-to-r from-red-50 to-rose-50 border-2 border-red-400 text-red-700 px-4 sm:px-6 md:px-8 py-4 sm:py-6 rounded-2xl mb-6 sm:mb-8 shadow-lg" style={{ animationDelay: "0.4s" }}>
                <p className="text-base sm:text-lg md:text-xl font-medium">
                  You need 80% to pass. 
                  You have used <strong>{attempts}</strong> attempt{attempts > 1 ? 's' : ''}.
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 animate-slideUp" style={{ animationDelay: "0.5s" }}>
              {isPassed ? (
                <button
                  onClick={handleBackToHome}
                  className="w-full sm:w-auto bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-xl text-lg sm:text-xl font-semibold hover:shadow-xl hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">Back to Home</span>
                  <div className="absolute inset-0 bg-linear-to-r from-purple-600 via-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              ) : (
                <>
                  {attempts < 3 && (
                    <button
                      onClick={handleRetry}
                      className="w-full sm:w-auto bg-linear-to-r from-orange-600 to-amber-600 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-xl text-lg sm:text-xl font-semibold hover:shadow-xl hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group"
                    >
                      <span className="relative z-10">Try Again (Attempt {attempts + 1}/3)</span>
                      <div className="absolute inset-0 bg-linear-to-r from-amber-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  )}
                  <button
                    onClick={handleBackToHome}
                    className="w-full sm:w-auto bg-linear-to-r from-gray-600 to-slate-600 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-xl text-lg sm:text-xl font-semibold hover:shadow-xl hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Back to Home</span>
                    <div className="absolute inset-0 bg-linear-to-r from-slate-600 to-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </>
              )}
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

        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
        .animate-slideDown { animation: slideDown 0.6s ease-out; }
        .animate-slideUp { animation: slideUp 0.6s ease-out; animation-fill-mode: both; }
        .animate-scaleIn { animation: scaleIn 0.6s ease-out; animation-fill-mode: both; }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
};

export default ResultPage;