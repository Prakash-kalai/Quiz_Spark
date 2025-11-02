import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./components/pages/LandingPage";
import QuizBuilderPage from "./components/pages/QuizBuilderPage";
import MyQuizzesPage from "./components/pages/MyQuizzesPage";
import QuizQuestionPage from "./components/pages/QuizQuestionPage";
import QuizResultPage from "./components/pages/QuizResultPage";
import SignIn from "./authentication/Signin";
import ProfilePage from "./components/pages/Profile";

import { seedExample } from "./utils/quizStorage";

export default function App() {
  useEffect(() => {
    seedExample();
  }, []);


  return (
    <BrowserRouter>
      <Routes>
          
            <Route path="/" element={<LandingPage />} />
            <Route path="/quiz-builder" element={<QuizBuilderPage />} />
            <Route path="/my-quizzes" element={<MyQuizzesPage />} />
            <Route path="/quiz-question/:id" element={<QuizQuestionPage />} />
            <Route path="/result" element={<QuizResultPage />} />
            <Route path="/signin" element={<SignIn/>} />
            <Route path="/profile" element={<ProfilePage />} />                                  
      </Routes>
    </BrowserRouter>
  );
}
