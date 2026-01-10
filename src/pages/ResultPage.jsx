import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useExamStore } from "../store/examStore";

const ResultPage = () => {
  const { result, clearExam,  candidateName } = useExamStore();
  const navigate = useNavigate();
  const [isGeneratingCert, setIsGeneratingCert] = useState(false);
  const [certReady, setCertReady] = useState(false);

  useEffect(() => {
    if (!result) {
      navigate("/");
    } else if (result.percentage >= 80) {
      // Simulate certificate generation
      setIsGeneratingCert(true);
      setTimeout(() => {
        setIsGeneratingCert(false);
        setCertReady(true);
      }, 2000);
    }
  }, [result, navigate]);

  if (!result) return null;

  const isPassed = result.percentage >= 80;
  const attempts = result.attempts || 1;

  const handleRetry = async () => {
    clearExam();
    navigate("/start");
  };

  const handleBackToHome = () => {
    clearExam();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="max-w-3xl w-full">
        {/* Result Card */}
        <div className="bg-white/90 backdrop-blur-xl p-6 sm:p-10 md:p-12 rounded-3xl shadow-2xl border border-white/30 text-center animate-fadeIn relative overflow-hidden">
          
          {/* Decorative Elements */}
          <div className={`absolute top-0 left-0 w-40 h-40 ${isPassed ? 'bg-green-400' : 'bg-red-400'} rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob`}></div>
          <div className={`absolute top-0 right-0 w-40 h-40 ${isPassed ? 'bg-emerald-400' : 'bg-orange-400'} rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000`}></div>
          <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-40 ${isPassed ? 'bg-teal-400' : 'bg-rose-400'} rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000`}></div>

          <div className="relative z-10">
            {/* Header */}
            <div className="animate-slideDown mb-8">
              <div className="inline-block mb-4">
                <div className={`text-6xl sm:text-7xl ${isPassed ? 'animate-bounce' : 'animate-shake'}`}>
                  {isPassed ? '🎉' : '😔'}
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Exam Result
              </h2>
            </div>

            {/* Pass/Fail Badge */}
            <div className="animate-scaleIn mb-8" style={{ animationDelay: "0.2s" }}>
              <div className={`inline-flex items-center justify-center gap-3 px-10 sm:px-16 py-5 sm:py-7 rounded-3xl ${
                isPassed 
                  ? 'bg-linear-to-r from-green-500 via-emerald-500 to-teal-500 shadow-2xl shadow-green-500/40' 
                  : 'bg-linear-to-r from-red-500 via-rose-500 to-pink-500 shadow-2xl shadow-red-500/40'
              } transform transition-all duration-300 hover:scale-105 relative overflow-hidden group`}>
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="text-5xl sm:text-6xl relative z-10">
                  {isPassed ? '✓' : '✗'}
                </span>
                <span className="text-4xl sm:text-5xl md:text-6xl font-black text-white relative z-10">
                  {isPassed ? "PASSED!" : "FAILED"}
                </span>
              </div>
            </div>

            {/* Score Display */}
            <div className="animate-slideUp mb-8" style={{ animationDelay: "0.3s" }}>
              <div className="bg-linear-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-6 sm:p-8 border-2 border-blue-200 shadow-lg">
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  <div className="text-center">
                    <p className="text-sm sm:text-base text-gray-600 mb-1">Questions</p>
                    <p className="text-3xl sm:text-4xl font-black text-blue-600">{result.score}</p>
                  </div>
                  <div className="text-4xl text-gray-300">/</div>
                  <div className="text-center">
                    <p className="text-sm sm:text-base text-gray-600 mb-1">Percentage</p>
                    <p className="text-3xl sm:text-4xl font-black text-indigo-600">{result.percentage.toFixed(1)}%</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <div className="flex-1 max-w-xs bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${
                        isPassed ? 'bg-linear-to-r from-green-500 to-emerald-500' : 'bg-linear-to-r from-red-500 to-rose-500'
                      }`}
                      style={{ width: `${result.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-gray-600">{isPassed ? 'Pass: 80%' : 'Need: 80%'}</span>
                </div>
              </div>
            </div>

            {/* Message Box */}
            {isPassed ? (
              <div className="animate-slideUp mb-8" style={{ animationDelay: "0.4s" }}>
                {isGeneratingCert ? (
                  <div className="bg-linear-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 text-blue-700 px-6 sm:px-8 py-6 sm:py-8 rounded-2xl shadow-xl">
                    <div className="flex items-center justify-center mb-4">
                      <div className="relative">
                        <svg className="animate-spin h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl animate-pulse">📜</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-lg sm:text-xl font-bold mb-2">Generating Your Certificate...</p>
                    <p className="text-sm sm:text-base text-blue-600">Please wait while we create your AML/CFT certification</p>
                    <div className="flex justify-center space-x-1 mt-4">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                      <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  </div>
                ) : certReady ? (
                  <div className="bg-linear-to-r from-green-50 to-emerald-50 border-2 border-green-400 text-green-700 px-6 sm:px-8 py-6 sm:py-8 rounded-2xl shadow-xl animate-scaleIn">
                    <div className="flex items-center justify-center mb-4">
                      <div className="bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-xl sm:text-2xl font-black mb-3">🎊 Congratulations!</p>
                    <p className="text-base sm:text-lg font-semibold mb-3">
                      Your certificate has been generated successfully!
                    </p>
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 mb-3">
                      <p className="text-sm sm:text-base">
                        📥 <strong className="text-green-800">AML_CFT_Certificate_{candidateName || "Candidate"}.pdf</strong>
                      </p>
                      <p className="text-xs sm:text-sm text-green-600 mt-2">Check your downloads folder</p>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm sm:text-base text-green-700 bg-green-100 rounded-lg p-3 animate-pulse">
                      <span className="text-xl">✨</span>
                      <span className="font-semibold">You are now AML/CFT Certified!</span>
                      <span className="text-xl">✨</span>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="animate-slideUp bg-linear-to-r from-red-50 to-rose-50 border-2 border-red-400 text-red-700 px-6 sm:px-8 py-6 sm:py-8 rounded-2xl shadow-xl mb-8" style={{ animationDelay: "0.4s" }}>
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-red-500 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <p className="text-xl sm:text-2xl font-black mb-3">Don't Give Up!</p>
                <p className="text-base sm:text-lg font-semibold mb-3">
                  You need <span className="text-red-800 font-black">80%</span> to pass.
                </p>
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-3xl">📝</span>
                    <div className="text-left">
                      <p className="font-bold text-red-800">Attempts Used: {attempts}/3</p>
                      {attempts < 3 && (
                        <p className="text-sm text-red-600 mt-1">You have {3 - attempts} attempt{3 - attempts > 1 ? 's' : ''} remaining</p>
                      )}
                      {attempts >= 3 && (
                        <p className="text-sm text-red-600 mt-1">⚠️ Maximum attempts reached</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slideUp" style={{ animationDelay: "0.5s" }}>
              {isPassed ? (
                <button
                  onClick={handleBackToHome}
                  className="group w-full sm:w-auto bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-10 sm:px-14 py-4 sm:py-5 rounded-2xl text-lg sm:text-xl font-bold hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back to Home
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-purple-600 via-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              ) : (
                <>
                  {attempts < 3 && (
                    <button
                      onClick={handleRetry}
                      className="group w-full sm:w-auto bg-linear-to-r from-orange-600 via-amber-600 to-yellow-600 text-white px-10 sm:px-14 py-4 sm:py-5 rounded-2xl text-lg sm:text-xl font-bold hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                        </svg>
                        Try Again (Attempt {attempts + 1}/3)
                      </span>
                      <div className="absolute inset-0 bg-linear-to-r from-yellow-600 via-amber-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  )}
                  <button
                    onClick={handleBackToHome}
                    className="group w-full sm:w-auto bg-linear-to-r from-gray-600 to-slate-700 text-white px-10 sm:px-14 py-4 sm:py-5 rounded-2xl text-lg sm:text-xl font-bold hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                      </svg>
                      Back to Home
                    </span>
                    <div className="absolute inset-0 bg-linear-to-r from-slate-700 to-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8) rotate(-5deg); }
          to { opacity: 1; transform: scale(1) rotate(0deg); }
        }

        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px) rotate(-5deg); }
          75% { transform: translateX(10px) rotate(5deg); }
        }

        .animate-fadeIn { animation: fadeIn 0.8s ease-out; }
        .animate-slideDown { animation: slideDown 0.6s ease-out; }
        .animate-slideUp { animation: slideUp 0.6s ease-out; animation-fill-mode: both; }
        .animate-scaleIn { animation: scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); animation-fill-mode: both; }
        .animate-blob { animation: blob 7s infinite; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
};

export default ResultPage;