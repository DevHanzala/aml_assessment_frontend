const Question = ({ question, index, selectedAnswer, onAnswer }) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative overflow-hidden group">
      {/* Question number badge */}
      <div className="absolute top-4 right-4 bg-linear-to-r from-blue-500 to-indigo-500 text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base shadow-lg">
        {index + 1}
      </div>

      {/* Decorative gradient line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

      <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-5 leading-relaxed text-gray-800 pr-12">
        {question.question}
      </h3>

      {question.type === "true_false" ? (
        <div className="space-y-2 sm:space-y-3">
          <label className={`flex items-center p-3 sm:p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
            selectedAnswer === true 
              ? 'border-blue-500 bg-blue-50 shadow-md' 
              : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
          }`}>
            <input
              type="radio"
              name={`q-${question.id}`}
              checked={selectedAnswer === true}
              onChange={() => onAnswer(question.id, true)}
              className="mr-3 w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm sm:text-base font-medium text-gray-700">✓ True</span>
          </label>

          <label className={`flex items-center p-3 sm:p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
            selectedAnswer === false 
              ? 'border-blue-500 bg-blue-50 shadow-md' 
              : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
          }`}>
            <input
              type="radio"
              name={`q-${question.id}`}
              checked={selectedAnswer === false}
              onChange={() => onAnswer(question.id, false)}
              className="mr-3 w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm sm:text-base font-medium text-gray-700">✗ False</span>
          </label>
        </div>
      ) : (
        <div className="space-y-2 sm:space-y-3">
          {question.options.map((opt, idx) => (
            <label 
              key={opt} 
              className={`flex items-start p-3 sm:p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                selectedAnswer === opt 
                  ? 'border-blue-500 bg-blue-50 shadow-md' 
                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
              }`}
            >
              <input
                type="radio"
                name={`q-${question.id}`}
                checked={selectedAnswer === opt}
                onChange={() => onAnswer(question.id, opt)}
                className="mr-3 mt-0.5 w-5 h-5 shrink-0 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm sm:text-base leading-relaxed text-gray-700">
                <span className="font-semibold text-blue-600 mr-2">{String.fromCharCode(65 + idx)}.</span>
                {opt}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default Question;