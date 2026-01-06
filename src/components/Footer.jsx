const Footer = () => {
  return (
    <footer className="bg-linear-to-r from-gray-900 via-slate-900 to-zinc-900 text-white text-center py-6 sm:py-8 mt-auto px-4 relative overflow-hidden">
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-linear-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5 animate-pulse"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-center mb-3 space-x-2">
          <div className="h-px w-16 bg-linear-to-r from-transparent via-blue-400 to-transparent"></div>
          <span className="text-blue-400 font-bold text-lg">AML/CFT</span>
          <div className="h-px w-16 bg-linear-to-r from-transparent via-blue-400 to-transparent"></div>
        </div>
        
        <p className="text-sm sm:text-base text-gray-300 font-medium">
          &copy; 2026 AML/CFT Certification System. All rights reserved.
        </p>
        
        <div className="mt-4 flex justify-center space-x-4 text-xs sm:text-sm text-gray-400">
          <span className="hover:text-blue-400 transition-colors duration-300 cursor-pointer">Privacy</span>
          <span>•</span>
          <span className="hover:text-blue-400 transition-colors duration-300 cursor-pointer">Terms</span>
          <span>•</span>
          <span className="hover:text-blue-400 transition-colors duration-300 cursor-pointer">Contact</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;