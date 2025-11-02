import React, { useEffect, useState } from "react";
import PrimaryButton from "../PrimeryButton";
import { useNavigate, useLocation } from "react-router-dom";
import { FaQuestion } from "react-icons/fa";
export default function LandingPage() {
  const navigate = useNavigate();  
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    setUser(savedUser);
  }, []);

  return (
    <div className="min-h-screen bg-white">
            
      <nav className="flex justify-between items-center p-4 sm:px-12">                
        <div className="flex items-center space-x-2">
          <div className="text-3xl text-green-600"><FaQuestion className="text-green-500"/></div>
          <span className="text-2xl font-bold text-gray-800">Quiz Spark</span>
        </div>
        
        <div>
          {
            !user?
          
          <div
            className="flex items-center gap-4 bg-purple-700 px-5 py-2 rounded-full text-white cursor-pointer hover:bg-green-600 transition font-semibold"
            onClick={() => navigate("/profile")}
          >
            <h1 className="text-3xl font-semibold">
              {user && user.email[0]?.toUpperCase()}
            </h1>
          </div>
:(<span onClick={()=>navigate("/signin")} className=" flex items-center gap-4 bg-purple-700 px-5 py-2 rounded-full text-white cursor-pointer hover:bg-green-600 transition font-semibold">Login</span>)}
        </div>

      </nav>
      
      <main className="flex flex-col items-center justify-center pt-24 pb-16">
        <h1 className="text-6xl font-extrabold text-gray-900 mb-4 tracking-tight text-center">
          Learn <span className="text-green-600">10x Faster!</span>
        </h1>

        <p className="text-xl text-gray-600 mb-10 text-center">
          Unlock Your Potential with Personalized Quizzes
        </p>
        
        <PrimaryButton
          className="px-8 py-3.5 text-lg"
          onClick={() => navigate("/my-quizzes")}
        >
          Get Started Now!
        </PrimaryButton>

        <PrimaryButton
          className="px-8 py-3.5 text-lg m-5"
          onClick={() => navigate("/quiz-builder")}
        >
          Quiz Builder
        </PrimaryButton>
      </main>

    </div>
  );
}
