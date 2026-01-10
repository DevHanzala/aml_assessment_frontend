import { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import ErrorMessage from "../components/ErrorMessage.jsx";

const AdminDashboard = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [enrollments, setEnrollments] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [displayCount, setDisplayCount] = useState(15);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingEnrollments, setIsLoadingEnrollments] = useState(true);
  const [isEnrolling, setIsEnrolling] = useState(false);

  const {
    enrollStudent,
    fetchEnrollments,
    unenrollStudent,
    getCandidateResult,
    error,
    clearError,
  } = useAuthStore();

  useEffect(() => {
    loadEnrollments();
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setEmail("");
        setMessage("");
        clearError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const loadEnrollments = async () => {
    setIsLoadingEnrollments(true);
    const res = await fetchEnrollments();
    if (res.success) {
      setEnrollments(res.data);
    }
    setTimeout(() => setIsLoadingEnrollments(false), 300);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadEnrollments();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const handleEnroll = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsEnrolling(true);
    const res = await enrollStudent(email.trim());
    if (res.success) {
      setMessage(`Student enrolled successfully! Access code: ${res.data.accessCode}`);
      setEmail("");
      await loadEnrollments();
    }
    setIsEnrolling(false);
  };

  const handleUnenroll = async (id, email) => {
    if (!confirm("Are you sure? This will PERMANENTLY delete the student and all their attempt history.")) {
      return;
    }

    const res = await unenrollStudent(id, email);
    if (res.success) {
      loadEnrollments();
    }
  };

  const handleViewResult = async (email) => {
    const res = await getCandidateResult(email);
    if (res.success) {
      setSelectedResult(res.data);
    }
  };

  const closeResult = () => setSelectedResult(null);

  const handleShowMore = () => {
    setDisplayCount(prev => prev + 15);
  };

  const displayedEnrollments = enrollments.slice(0, displayCount);
  const hasMore = displayCount < enrollments.length;

  // Skeleton components
  const TableSkeleton = () => (
    <div className="hidden lg:block bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 overflow-hidden animate-fadeIn">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-linear-to-r from-blue-100 via-indigo-100 to-purple-100">
            <tr>
              <th className="p-4 text-left font-semibold text-gray-700 w-16">#</th>
              <th className="p-4 text-left font-semibold text-gray-700">Email</th>
              <th className="p-4 text-left font-semibold text-gray-700 w-52">Enrolled Date</th>
              <th className="p-4 text-left font-semibold text-gray-700 w-36">Access Code</th>
              <th className="p-4 text-center font-semibold text-gray-700 w-64">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, idx) => (
              <tr key={idx} className="border-b border-gray-100">
                <td className="p-4">
                  <div className="h-4 w-6 bg-linear-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
                </td>
                <td className="p-4">
                  <div className="h-4 w-48 bg-linear-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
                </td>
                <td className="p-4">
                  <div className="h-4 w-40 bg-linear-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
                </td>
                <td className="p-4">
                  <div className="h-6 w-24 bg-linear-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse"></div>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-8 w-24 bg-linear-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse"></div>
                    <div className="h-8 w-20 bg-linear-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const CardSkeleton = () => (
    <div className="lg:hidden space-y-4">
      {[...Array(3)].map((_, idx) => (
        <div
          key={idx}
          className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-4 sm:p-5 animate-fadeIn"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-6 w-10 bg-linear-to-r from-gray-200 to-gray-300 rounded-full animate-pulse"></div>
            <div className="h-6 w-24 bg-linear-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse"></div>
          </div>
          <div className="h-4 w-full bg-linear-to-r from-gray-200 to-gray-300 rounded animate-pulse mb-2"></div>
          <div className="h-3 w-40 bg-linear-to-r from-gray-200 to-gray-300 rounded animate-pulse mb-4"></div>
          <div className="flex gap-2">
            <div className="flex-1 h-9 bg-linear-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse"></div>
            <div className="flex-1 h-9 bg-linear-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="w-full max-w-450 mx-auto">

          {/* Header */}
          <div className="text-center mb-6 sm:mb-8 animate-slideDown">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Admin Dashboard
            </h2>
            <div className="h-1 w-32 sm:w-40 bg-linear-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>

          {/* Enroll New Student Form */}
          <div className="bg-white/90 backdrop-blur-xl p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl border border-white/30 mb-6 sm:mb-8 animate-fadeIn relative overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="absolute top-0 left-0 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/3 w-32 h-32 bg-indigo-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-4000"></div>

            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-800 flex items-center gap-2">
                <span className="text-2xl">➕</span> Enroll New Student
              </h3>

              <ErrorMessage message={error} />

              {message && (
                <div className="bg-linear-to-r from-green-50 to-emerald-50 border-2 border-green-400 text-green-700 px-4 sm:px-6 py-3 sm:py-4 rounded-xl mb-4 sm:mb-6 shadow-lg animate-slideUp">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 shrink-0 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium text-sm sm:text-base">{message}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleEnroll} className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-base sm:text-lg font-medium mb-2 text-gray-700">
                    📧 Student Email
                  </label>
                  <div className="relative group">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isEnrolling}
                      placeholder="student@example.com"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 text-sm sm:text-base transition-all duration-300 bg-white/70 backdrop-blur-sm hover:border-blue-300 hover:bg-white disabled:opacity-60"
                    />
                    <div className="absolute inset-0 rounded-xl bg-linear-to-r from-blue-400 to-purple-400 opacity-0 group-focus-within:opacity-20 blur-xl transition-opacity duration-300 -z-10"></div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isEnrolling}
                  className="w-full bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-2.5 sm:py-3 rounded-xl text-base sm:text-lg font-semibold hover:shadow-2xl hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isEnrolling ? (
                      <>
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enrolling...
                      </>
                    ) : (
                      <>🚀 Enroll Student & Send Access</>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-purple-600 via-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </form>
            </div>
          </div>

          {/* Enrolled Students Section */}
          <div className="animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 flex items-center gap-2">
                <span className="text-2xl">👥</span> Enrolled Students 
                {!isLoadingEnrollments && (
                  <span className="bg-linear-to-r from-blue-600 to-indigo-600 text-white text-sm sm:text-base px-3 py-1 rounded-full font-bold">
                    {enrollments.length}
                  </span>
                )}
              </h3>
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-indigo-600 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-sm sm:text-base font-semibold hover:shadow-xl hover:scale-105 disabled:opacity-50 transition-all duration-300"
              >
                <svg
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${isRefreshing ? 'animate-spin' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>

            {isLoadingEnrollments ? (
              <>
                <TableSkeleton />
                <CardSkeleton />
              </>
            ) : enrollments.length === 0 ? (
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-8 sm:p-12 text-center hover:shadow-2xl transition-shadow duration-300">
                <div className="text-gray-400 mb-4 animate-bounce">
                  <svg className="w-16 h-16 sm:w-20 sm:h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="text-gray-600 text-base sm:text-lg font-medium">No students enrolled yet</p>
                <p className="text-gray-500 text-sm sm:text-base mt-2">Start by enrolling your first student above 👆</p>
              </div>
            ) : (
              <>
                {/* Desktop Table View */}
                <div className="hidden lg:block bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-linear-to-r from-blue-100 via-indigo-100 to-purple-100">
                        <tr>
                          <th className="p-4 text-left font-semibold text-gray-700 w-20">#</th>
                          <th className="p-4 text-left font-semibold text-gray-700">Email</th>
                          <th className="p-4 text-left font-semibold text-gray-700 w-56">Enrolled Date</th>
                          <th className="p-4 text-left font-semibold text-gray-700 w-40">Access Code</th>
                          <th className="p-4 text-center font-semibold text-gray-700 w-72">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {displayedEnrollments.map((enroll, idx) => (
                          <tr
                            key={enroll.id}
                            className="border-b border-gray-100 hover:bg-linear-to-r hover:from-blue-50 hover:via-indigo-50 hover:to-purple-50 transition-all duration-300 group"
                          >
                            <td className="p-4 text-gray-600 font-semibold group-hover:text-blue-600 transition-colors">{idx + 1}</td>
                            <td className="p-4 text-gray-800 font-medium group-hover:text-blue-700 transition-colors">{enroll.email}</td>
                            <td className="p-4 text-gray-600 text-sm">
                              {new Date(enroll.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </td>
                            <td className="p-4">
                              <span className="inline-block font-mono text-sm bg-linear-to-r from-blue-100 to-indigo-100 px-3 py-1.5 rounded-lg text-blue-800 font-bold border border-blue-200">
                                {enroll.accessCode}
                              </span>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => handleViewResult(enroll.email)}
                                  className="bg-linear-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-200"
                                >
                                  📊 View Result
                                </button>
                                <button
                                  onClick={() => handleUnenroll(enroll.id, enroll.email)}
                                  className="bg-linear-to-r from-red-600 to-rose-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-200"
                                >
                                  🗑️ Unenroll
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Mobile/Tablet Card View */}
                <div className="lg:hidden space-y-4">
                  {displayedEnrollments.map((enroll, idx) => (
                    <div
                      key={enroll.id}
                      className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-white/30 p-4 sm:p-5 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 animate-slideUp"
                      style={{ animationDelay: `${idx * 0.05}s` }}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className="bg-linear-to-r from-blue-500 to-indigo-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                              #{idx + 1}
                            </span>
                            <span className="font-mono text-xs sm:text-sm bg-linear-to-r from-blue-100 to-indigo-100 px-2.5 sm:px-3 py-1 rounded-lg text-blue-800 font-bold border border-blue-200">
                              {enroll.accessCode}
                            </span>
                          </div>
                          <p className="text-sm sm:text-base font-semibold text-gray-800 break-all mb-2">
                            📧 {enroll.email}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-1">
                            📅 {new Date(enroll.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => handleViewResult(enroll.email)}
                          className="flex-1 bg-linear-to-r from-blue-600 to-indigo-600 text-white px-3 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
                        >
                          📊 View Result
                        </button>
                        <button
                          onClick={() => handleUnenroll(enroll.id, enroll.email)}
                          className="flex-1 bg-linear-to-r from-red-600 to-rose-600 text-white px-3 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
                        >
                          🗑️ Unenroll
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Show More Button */}
                {hasMore && (
                  <div className="text-center mt-6 animate-fadeIn">
                    <button
                      onClick={handleShowMore}
                      className="inline-flex items-center gap-2 bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-8 sm:px-12 py-3 sm:py-3.5 rounded-xl text-base sm:text-lg font-bold hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Show More ({enrollments.length - displayCount} remaining)
                        <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                      <div className="absolute inset-0 bg-linear-to-r from-purple-600 via-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Result Modal */}
          {selectedResult && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">
              <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 animate-scaleIn relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
                    📋 Candidate Result
                  </h3>
                  <button
                    onClick={closeResult}
                    className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all p-2 rounded-lg hover:rotate-90 duration-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {selectedResult.message ? (
                  <div className="text-center py-6">
                    <div className="text-gray-400 mb-4 animate-pulse">
                      <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-gray-600 text-base sm:text-lg font-medium">{selectedResult.message}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border-l-4 border-blue-500 hover:shadow-md transition-shadow">
                      <p className="text-sm text-gray-600 mb-1 font-medium">👤 Candidate Name</p>
                      <p className="text-base sm:text-lg font-bold text-gray-800">
                        {selectedResult.name || "Not provided"}
                      </p>
                    </div>

                    <div className="bg-linear-to-r from-green-50 to-emerald-50 rounded-xl p-4 border-l-4 border-green-500 hover:shadow-md transition-shadow">
                      <p className="text-sm text-gray-600 mb-1 font-medium">🎯 Status</p>
                      <p className={`text-base sm:text-lg font-black ${selectedResult.passed ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedResult.passed ? '✓ PASSED' : '✗ FAILED'}
                      </p>
                    </div>

                    <div className="bg-linear-to-r from-purple-50 to-pink-50 rounded-xl p-4 border-l-4 border-purple-500 hover:shadow-md transition-shadow">
                      <p className="text-sm text-gray-600 mb-1 font-medium">📊 Last Score</p>
                      <p className="text-base sm:text-lg font-bold text-gray-800">
                        {selectedResult.lastScore?.toFixed(2)}%
                      </p>
                    </div>

                    <div className="bg-linear-to-r from-orange-50 to-amber-50 rounded-xl p-4 border-l-4 border-orange-500 hover:shadow-md transition-shadow">
                      <p className="text-sm text-gray-600 mb-1 font-medium">📅 Last Attempt</p>
                      <p className="text-base sm:text-lg font-bold text-gray-800">
                        {selectedResult.lastAttemptDate
                          ? new Date(selectedResult.lastAttemptDate).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',minute: '2-digit'
                      })
                      : "N/A"}
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={closeResult}
              className="mt-6 w-full bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-3 sm:py-3.5 rounded-xl text-base sm:text-lg font-bold hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">✓ Close</span>
              <div className="absolute inset-0 bg-linear-to-r from-purple-600 via-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      )}
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
      from { opacity: 0; transform: scale(0.9); }
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
    .animate-scaleIn { animation: scaleIn 0.4s ease-out; }
    .animate-blob { animation: blob 7s infinite; }
    .animation-delay-2000 { animation-delay: 2s; }
    .animation-delay-4000 { animation-delay: 4s; }
  `}</style>
</>)}

export default AdminDashboard;