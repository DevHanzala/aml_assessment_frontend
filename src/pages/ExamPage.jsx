import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useExamStore } from "../store/examStore";
import Question from "../components/Question.jsx";
import Loading from "../components/Loading.jsx";
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

  useEffect(() => {
    if (questions.length === 0) {
      navigate("/start");
    } else {
      // LOG QUESTIONS HERE - Paste this console output to me!
      console.log("Current exam questions:", questions);
    }
  }, [questions, navigate]);

  const handleSubmit = async () => {
    const res = await submitExam();
    if (res.success) {
      navigate("/result");
    }
  };

  return (
    <>
      {loading && <Loading message="Submitting exam..." />}
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8 animate-slideDown">
            <h2 className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              AML/CFT Certification Exam
            </h2>
            <div className="h-1 w-40 bg-linear-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <ErrorMessage message={error} />

          {/* Name Input Card */}
          <div className="bg-white/80 backdrop-blur-lg p-4 sm:p-6 rounded-2xl shadow-xl border border-white/20 mb-6 sm:mb-8 animate-fadeIn relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            
            <div className="relative z-10">
              <label className="block text-base sm:text-lg font-medium mb-2 text-gray-700">
                Your Full Name (for certificate)
              </label>
              <div className="relative group">
                <input
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  required
                  placeholder="John Doe"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 text-sm sm:text-base transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-blue-300"
                />
                <div className="absolute inset-0 rounded-xl bg-linear-to-r from-blue-400 to-purple-400 opacity-0 group-focus-within:opacity-20 blur-xl transition-opacity duration-300 -z-10"></div>
              </div>
            </div>
          </div>

          {/* Questions */}
          <div className="space-y-6 sm:space-y-8">
            {questions.map((q, idx) => (
              <div 
                key={q.id}
                className="animate-slideUp"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="bg-white/80 backdrop-blur-lg p-4 sm:p-6 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-2 h-full bg-linear-to-b from-blue-500 to-purple-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>
                  
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
          <div className="text-center mt-8 sm:mt-12 animate-slideUp" style={{ animationDelay: `${questions.length * 0.1}s` }}>
            <button
              onClick={handleSubmit}
              disabled={loading || !candidateName.trim()}
              className="w-full sm:w-auto bg-linear-to-r from-green-600 via-emerald-600 to-teal-600 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-xl text-lg sm:text-xl font-semibold hover:shadow-2xl hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Submit Exam</span>
              <div className="absolute inset-0 bg-linear-to-r from-teal-600 via-emerald-600 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
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

export default ExamPage;