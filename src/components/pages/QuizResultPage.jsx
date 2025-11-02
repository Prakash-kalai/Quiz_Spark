import React, { use, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function QuizResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { width, height } = useWindowSize(); 

  const { quizTitle, total, correct ,answer} = location.state || {
    quizTitle: "React Quiz",
    total: 5,
    correct: 3,
  };           
  const percentage = Math.round((correct / total) * 100);
  
  const getMessage = () => {
    if (percentage === 100) return " Perfect Score! You nailed it!";
    if (percentage >= 80) return "Excellent Job!";
    if (percentage >= 60) return " Good Effort!";
    return " Keep Practicing!";
  };
  
  const confettiPieces =
    percentage >= 90
      ? 400
      : percentage >= 70
      ? 200
      : percentage >= 50
      ? 100
      : 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8 relative overflow-hidden">      
      {confettiPieces > 0 && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={confettiPieces}
          recycle={false}
          gravity={0.3}
          tweenDuration={10000}
        />
      )}

      
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-lg text-center relative z-10">        
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{quizTitle}</h1>
        <p className="text-gray-500 mb-8">Your Quiz Results</p>
        
        <div className="relative w-40 h-40 mx-auto mb-8">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="#e5e7eb"
              strokeWidth="12"
              fill="transparent"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="#22c55e"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray="440"
              strokeDashoffset={440 - (440 * percentage) / 100}
              strokeLinecap="round"
              className="transition-all duration-700"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-green-600">
              {percentage}%
            </span>
          </div>
        </div>

        
        <div className="space-y-2 mb-8 text-gray-700">
          <p>
            <span className="font-semibold">Total Questions:</span> {total}
          </p>
          <p>
            <span className="font-semibold">Correct Answers:</span> {correct}
          </p>
          <p>
            <span className="font-semibold">Incorrect:</span> {total - correct}
          </p>
        </div>

        
        <p className="text-xl font-semibold text-gray-800 mb-8">
          {getMessage()}
        </p>

        
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
          >
            🔁 Retake Quiz
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition"
          >
             Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
