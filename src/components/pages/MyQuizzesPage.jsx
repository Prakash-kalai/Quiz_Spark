import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllQuizzes } from "../../utils/quizStorage";

const QuizCard = ({ id, title, questions }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/quiz-question/${id}`)}
      className="w-full max-w-sm bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden cursor-pointer"
    >
      <div className="h-28 bg-green-600 flex items-center justify-center p-4 text-white text-5xl">
        {'</>'}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-500 text-sm mb-3">{questions.length} question(s)</p>
      </div>
    </div>
  );
};

export default function MyQuizzesPage() {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setQuizzes(getAllQuizzes());
  }, []);

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-900 mb-10">My Quizzes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {quizzes.map(q => (
          <QuizCard key={q.id} {...q} />
        ))}
        <div
          onClick={() => navigate("/quiz-builder")}
          className="w-full max-w-sm border border-gray-200 rounded-xl shadow-lg flex flex-col items-center justify-center text-gray-400 hover:border-green-500 hover:text-green-600 transition duration-300 cursor-pointer min-h-[300px]"
        >
          <div className="text-7xl mb-2">+</div>
          <p className="text-lg">Add a new Quiz</p>
        </div>
      </div>
    </div>
  );
}
