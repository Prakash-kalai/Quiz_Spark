import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { getAllQuizzes } from "../../utils/resultStorage";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);  
  const sampleData = [
    {
      name: "",
      quizTitle: "React Basics Quiz",
      quizId: "react-basics-1",
      correct: 7,
      total: 10,
      score: 70,
      timeTaken: "2m 35s",
      attemptedAt: "2025-10-31 14:22",
      answers: [
        {
          question: "What is JSX?",
          selected: "A syntax extension for JavaScript",
          correctAnswer: "A syntax extension for JavaScript",
          isCorrect: true,
        },
        {
          question: "Which hook is used for state?",
          selected: "useState",
          correctAnswer: "useState",
          isCorrect: true,
        },
      ],
    },
  ];

  const [results, setResults] = useState(sampleData);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (!savedUser) return navigate("/");

    setUser(savedUser);

    const savedResults = getAllQuizzes();
        
    if (savedResults && savedResults.length > 0) {
      setResults(savedResults);
    } else {
      setResults(sampleData);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("quizResults");
    window.google?.accounts?.id?.disableAutoSelect();
    navigate("/signin");
  };

  
  const attempts = results.length;
  const totalCorrect = results.reduce((a, b) => a + b.correct, 0);
  const totalQuestions = results.reduce((a, b) => a + b.total, 0);
  const avgScore = totalQuestions
    ? Math.round((totalCorrect / totalQuestions) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6">
                
        <div className="flex items-center justify-between mb-6">
          <div className="text-3xl hover:bg-red-100 p-3 rounded-full cursor-pointer" onClick={()=>navigate("/")}><FaArrowLeft/></div>
          <div className="text-2xl font-semibold">My Profile</div>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
        
        <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl mb-6"
          
            
          >
          <h1 className="flex items-center gap-4 bg-purple-700 px-5 py-2 rounded-full text-white cursor-pointer hover:bg-green-600 transition font-semibold">{user && user?.email[0]}            
          </h1>
          <div>
            <h2 className="text-xl font-medium">{user?.name}</h2>
            <p className="text-gray-500 text-sm">{user?.email}</p>
          </div>
        </div>

        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-xl text-center">
            <h3 className="text-lg font-semibold">{attempts}</h3>
            <p className="text-gray-600 text-sm">Attempts</p>
          </div>

          <div className="bg-green-50 p-4 rounded-xl text-center">
            <h3 className="text-lg font-semibold">{totalCorrect}</h3>
            <p className="text-gray-600 text-sm">Correct Answers</p>
          </div>

          <div className="bg-purple-50 p-4 rounded-xl text-center">
            <h3 className="text-lg font-semibold">{avgScore}%</h3>
            <p className="text-gray-600 text-sm">Average Score</p>
          </div>
        </div>
        
        <h2 className="text-xl font-semibold mb-3">Quiz History</h2>

        {results.length === 0 ? (
          <p className="text-gray-500">No quizzes attempted yet.</p>
        ) : (
          <div className="space-y-3">
            {results.map((r, index) => (
              <div
                key={index}
                className="p-4 border rounded-xl flex justify-between items-center bg-gray-50"
              >
                <div>
                  <h3 className="font-medium">{r.quizTitle}</h3>                  
                  <p className="text-xs text-gray-500">{r.attemptedAt}</p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-medium">
                    {r.correct}/{r.total} correct
                  </p>
                  <p className="text-xs text-gray-500">
                    Score: {Math.round((r.correct / r.total) * 100)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
