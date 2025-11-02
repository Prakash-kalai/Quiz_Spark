import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PrimaryButton from "../PrimeryButton";
import { createQuiz } from "../../utils/quizStorage";
import { useNavigate } from "react-router-dom";


const BuilderSection = ({ number, title, children }) => (
  <div className="mb-8 border border-gray-200 rounded-lg p-6 relative bg-white">
    <div
      className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 
                  w-8 h-8 flex items-center justify-center 
                  bg-green-600 text-white font-bold rounded-md shadow-lg"
    >
      {number}
    </div>
    <h2 className="text-xl font-semibold text-gray-800 ml-4 mb-4">{title} :</h2>
    {children}
  </div>
);

const QuizBuilderPage = () => {
  const navigate = useNavigate();  
  const [quizName, setQuizName] = useState("");
  const [questions, setQuestions] = useState([
    {      
      question: "",
      choices: ["", ""],
      answerIndex: null,
    },
  ]);

  
  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {        
        question: "",
        choices: ["", ""],
        answerIndex: null,
      },
    ]);
  };


  const handleAddChoice = (qIndex) => {
    const updated = [...questions];
    updated[qIndex].choices.push("");
    setQuestions(updated);
  };

  
  const handleSave = () => {
    if (!quizName.trim()) {
      alert("Please enter a quiz name!");
      return;
    }
    
    const isValid = questions.every(
      (q) => q.question.trim() && q.choices.some((c) => c.trim())
    );

    if (!isValid) {
      alert("Please fill out all questions and at least one choice per question.");
      return;
    }

    const newQuiz = {
      id: uuidv4(),
      title: quizName,
      questions,
    };

    createQuiz(newQuiz); 
    navigate("/my-quizzes");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 md:p-12">
      
      <header className="flex justify-between items-center mb-10">
        <div className="flex items-center space-x-3">
          <div className="text-3xl">
            <span className="bg-green-600 p-0.5 rounded-sm text-white">A</span>
            <span className="bg-yellow-400 p-0.5 rounded-sm text-white">B</span>
            <span className="bg-red-500 p-0.5 rounded-sm text-white">C</span>
          </div>
          <span className="text-2xl font-bold text-gray-800">Quiz Builder</span>
        </div>

        <PrimaryButton onClick={handleSave}>Save Quiz</PrimaryButton>
      </header>

      
      <BuilderSection number={1} title="Quiz Name">
        <div className="flex items-center p-2 border-b-2 border-green-500">
          <input
            type="text"
            value={quizName}
            onChange={(e) => setQuizName(e.target.value)}
            placeholder="Enter the Name of The Quiz..."
            className="flex-grow p-1 focus:outline-none text-gray-700 bg-transparent"
          />
          <div className="ml-4 text-3xl text-green-600">🌐</div>
        </div>
      </BuilderSection>

      
      <BuilderSection number={2} title="Quiz Questions">
        {questions.map((q, qIndex) => (
          <div
            key={q.id}
            className="p-4 border border-gray-300 rounded-lg mb-6 bg-white shadow-sm"
          >
            
            <div className="flex items-start mb-4">
              <label className="text-gray-600 w-24 flex-shrink-0 pt-2">
                Question {qIndex + 1}
              </label>
              <input
                type="text"
                placeholder="Enter your question..."
                value={q.question}
                onChange={(e) => {
                  const updated = [...questions];
                  updated[qIndex].question = e.target.value;
                  setQuestions(updated);
                }}
                className="flex-grow p-2 border-b border-gray-300 focus:outline-none focus:border-green-500 transition duration-200"
              />
            </div>

            
            <div className="flex space-x-6 pt-2">
              <label className="text-gray-600 w-24 flex-shrink-0">Choices</label>
              <div className="flex-grow space-y-3">
                {q.choices.map((choice, cIndex) => (
                  <div key={cIndex} className="flex items-center">
                    <span className="font-bold text-gray-800 mr-2">
                      {String.fromCharCode(65 + cIndex)}:
                    </span>
                    <input
                      type="text"
                      placeholder={`Enter choice ${cIndex + 1}`}
                      value={choice}
                      onChange={(e) => {
                        const updated = [...questions];
                        updated[qIndex].choices[cIndex] = e.target.value;
                        setQuestions(updated);
                      }}
                      className="flex-grow p-2 border border-gray-200 rounded-md focus:outline-none focus:border-green-500"
                    />
                    <input
                      type="radio"
                      name={`answer-${qIndex}`}
                      checked={q.answerIndex === cIndex}
                      onChange={() => {
                        const updated = [...questions];
                        updated[qIndex].answerIndex = cIndex;
                        setQuestions(updated);
                      }}
                      className="ml-4 text-green-600 focus:ring-green-500"
                    />
                  </div>
                ))}

                
                <button
                  onClick={() => handleAddChoice(qIndex)}
                  className="mt-3 px-4 py-2 bg-green-700 text-white text-sm font-semibold rounded-lg shadow hover:bg-green-800 transition duration-300"
                >
                  + Add Another Choice
                </button>
              </div>
            </div>
          </div>
        ))}

        
        <div className="text-center mt-8">
          <button
            onClick={handleAddQuestion}
            className="px-6 py-3 bg-green-700 text-white font-semibold rounded-lg shadow-lg hover:bg-green-800 transition duration-300"
          >
            + Add New Question
          </button>
        </div>
      </BuilderSection>
    </div>
  );
};

export default QuizBuilderPage;
