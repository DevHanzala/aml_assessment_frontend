import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useExamStore } from "../store/examStore";
import Question from "../components/Question.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

const ExamPage = () => {
  const {
    questions,
    answers,
    candidateName,
    setCandidateName,
    setAnswer,
    submitExam,
    loading,
    error,
  } = useExamStore();
  const navigate = useNavigate();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (questions.length === 0) {
      navigate("/start");
    } else {
      // console.log("Current exam questions:", questions);
      setTimeout(() => setIsInitialLoading(false), 300);
    }
  }, [questions, navigate]);

  useEffect(() => {
    const answeredCount = Object.keys(answers).length;
    const totalQuestions = questions.length;
    setProgress(totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0);
  }, [answers, questions]);

  const handleSubmit = async () => {
    const res = await submitExam();
    if (res.success) {
      navigate("/result");
    }
  };

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = questions.length;
  const isComplete = answeredCount === totalQuestions && candidateName.trim();

  // Skeleton Loader
  const QuestionSkeleton = () => (
    <div className="space-y-6 sm:space-y-8">
      {[...Array(5)].map((_, idx) => (
        <div
          key={idx}
          className="bg-white/80 backdrop-blur-lg p-4 sm:p-6 rounded-2xl shadow-xl border border-white/20 animate-fadeIn"
        >
          <div className="mb-4">
            <div className="h-6 w-3/4 bg-linear-to-r from-gray-200 to-gray-300 rounded animate-pulse mb-3"></div>
            <div className="h-4 w-1/2 bg-linear-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
          </div>
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-12 bg-linear-to-r from-gray-200 to-gray-300 rounded-xl animate-pulse"></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  if (isInitialLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8 animate-slideDown">
            <h2 className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              AML/CFT Certification Exam
            </h2>
            <div className="h-1 w-40 bg-linear-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>

          {/* Name Input Skeleton */}
          <div className="bg-white/80 backdrop-blur-lg p-4 sm:p-6 rounded-2xl shadow-xl border border-white/20 mb-6 sm:mb-8 animate-fadeIn">
            <div className="h-5 w-48 bg-linear-to-r from-gray-200 to-gray-300 rounded animate-pulse mb-3"></div>
            <div className="h-12 w-full bg-linear-to-r from-gray-200 to-gray-300 rounded-xl animate-pulse"></div>
          </div>

          <QuestionSkeleton />
        </div>
      </div>
    );
  }

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 text-center max-w-sm w-full animate-scaleIn relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
            
            <div className="relative mb-4">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 mx-auto"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-blue-600 border-r-indigo-600 absolute top-0 left-1/2 -translate-x-1/2"></div>
            </div>
            
            <p className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Submitting Your Exam...</p>
            <p className="text-sm text-gray-600">Please wait while we process your answers</p>
            
            <div className="flex justify-center space-x-1 mt-4">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
              <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8 animate-slideDown">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              📝 AML/CFT Certification Exam
            </h2>
            <div className="h-1 w-40 bg-linear-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-3 text-sm sm:text-base">Complete all questions to submit your exam</p>
          </div>

          {/* Progress Bar */}
          <div className="bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-lg border border-white/30 mb-6 animate-fadeIn">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm sm:text-base font-semibold text-gray-700">
                📊 Progress: {answeredCount} / {totalQuestions}
              </span>
              <span className="text-sm sm:text-base font-bold text-blue-600">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white/30 animate-shimmer"></div>
              </div>
            </div>
          </div>

          <ErrorMessage message={error} />

          {/* Name Input Card */}
          <div className="bg-white/90 backdrop-blur-xl p-4 sm:p-6 rounded-2xl shadow-xl border border-white/30 mb-6 sm:mb-8 animate-fadeIn relative overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            
            <div className="relative z-10">
              <label className="block text-base sm:text-lg font-semibold mb-2 text-gray-800  items-center gap-2">
                👤 Your Full Name (for certificate)
              </label>
              <div className="relative group">
                <input
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  required
                  placeholder="Enter your full name as it should appear on certificate"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 text-sm sm:text-base transition-all duration-300 bg-white/70 backdrop-blur-sm hover:border-blue-300 hover:bg-white font-medium"
                />
                <div className="absolute inset-0 rounded-xl bg-linear-to-r from-blue-400 to-purple-400 opacity-0 group-focus-within:opacity-20 blur-xl transition-opacity duration-300 -z-10"></div>
              </div>
              {!candidateName.trim() && (
                <p className="text-xs sm:text-sm text-amber-600 mt-2 flex items-center gap-1">
                  ⚠️ Name is required to submit the exam
                </p>
              )}
            </div>
          </div>

          {/* Questions */}
          <div className="space-y-6 sm:space-y-8">
            {questions.map((q, idx) => (
              <div 
                key={q.id}
                className="animate-slideUp"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="bg-white/90 backdrop-blur-xl p-4 sm:p-6 rounded-2xl shadow-xl border border-white/30 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 relative overflow-hidden group">
                  {/* Left accent bar */}
                  <div className={`absolute top-0 left-0 w-2 h-full bg-linear-to-b from-blue-500 to-purple-500 transform transition-transform duration-300 origin-top ${
                    answers[q.id] !== undefined ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'
                  }`}></div>
                  
                  {/* Answered checkmark */}
                  {answers[q.id] !== undefined && (
                    <div className="absolute top-4 right-4 bg-linear-to-r from-green-500 to-emerald-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg animate-scaleIn">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  
                  <Question
                    question={q}
                    index={idx}
                    selectedAnswer={answers[q.id]}
                    onAnswer={setAnswer}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="sticky bottom-2 mt-8 sm:mt-12 animate-slideUp" style={{ animationDelay: `${questions.length * 0.05}s` }}>
            <div className="bg-linear-to-r from-blue-50 via-indigo-50 to-purple-50 p-1 rounded-2xl shadow-2xl border border-white/40 backdrop-blur-xl">
              <div className="text-center">
                {!isComplete && (
                  <p className="text-sm sm:text-base text-gray-700 mb-2 font-medium">
                    {!candidateName.trim() 
                      ? "⚠️ Please enter your name to continue"
                      : `📝 Please answer all questions (${totalQuestions - answeredCount} remaining)`
                    }
                  </p>
                )}
                <button
                  onClick={handleSubmit}
                  disabled={loading || !isComplete}
                  className={`w-full sm:w-auto bg-linear-to-r from-green-600 via-emerald-600 to-teal-600 text-white px-10 sm:px-16 py-3.5 sm:py-4 rounded-xl text-lg sm:text-xl font-bold hover:shadow-2xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed transition-all duration-300 relative overflow-hidden group ${
                    isComplete ? 'animate-pulse' : ''
                  }`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isComplete ? '✓' : '🔒'} Submit Exam
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-teal-600 via-emerald-600 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                {isComplete && (
                  <p className="text-sm text-green-600 mt-2 font-semibold animate-bounce">
                    ✨ Ready to submit! Click the button above
                  </p>
                )}
              </div>
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
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
        .animate-slideDown { animation: slideDown 0.6s ease-out; }
        .animate-slideUp { animation: slideUp 0.6s ease-out; animation-fill-mode: both; }
        .animate-scaleIn { animation: scaleIn 0.4s ease-out; }
        .animate-blob { animation: blob 7s infinite; }
        .animate-shimmer { animation: shimmer 2s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </>
  );
};

export default ExamPage;