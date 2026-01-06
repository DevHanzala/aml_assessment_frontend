const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl p-6 sm:p-8 text-center max-w-sm w-full mx-4 shadow-2xl animate-slideUp relative overflow-hidden">
        {/* Decorative gradient */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
        
        {/* Spinner */}
        <div className="relative mb-4">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-gray-200 mx-auto"></div>
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-transparent border-t-blue-600 border-r-indigo-600 absolute top-0 left-1/2 -translate-x-1/2"></div>
        </div>
        
        <p className="mt-4 text-base sm:text-lg font-semibold text-gray-800">{message}</p>
        
        {/* Animated dots */}
        <div className="flex justify-center space-x-1 mt-3">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
          <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Loading;