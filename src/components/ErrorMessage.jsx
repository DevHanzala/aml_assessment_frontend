const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className="bg-linear-to-r from-red-50 to-rose-50 border-2 border-red-400 text-red-700 px-6 py-4 rounded-xl mb-6 shadow-lg animate-slideDown relative overflow-hidden">
      {/* Animated border effect */}
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-red-500 via-rose-500 to-red-500 animate-shimmer"></div>
      
      <div className="flex items-start">
        {/* Error icon */}
        <svg className="w-5 h-5 mr-3 mt-0.5 shrink-0 animate-shake" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
        
        <div>
          <strong className="font-bold">Error:</strong>{" "}
          <span className="font-medium">{message}</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .animate-slideDown {
          animation: slideDown 0.4s ease-out;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default ErrorMessage;