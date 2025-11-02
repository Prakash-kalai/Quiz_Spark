import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Navigate, useNavigate } from "react-router-dom";
export default function SignIn() {
  const [user, setUser] = useState(null);
    const navigate=useNavigate()
  const handleSuccess = (credentialResponse) => {
    const userData = jwtDecode(credentialResponse.credential);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    navigate("/", { state: userData });
  };

  const handleError = () => {
    console.error("Google Login Failed");
  };

  const logout=()=>{
    setUser(null)
    
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Sign in with Google
        </h1>

        {!user ? (
          <div className="flex justify-center">
            <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
          </div>
        ) : (
          <div className="space-y-4 text-center">
            <img
              src={user.picture}
              alt="profile"
              className="w-16 h-16 rounded-full mx-auto"
            />
            <h2 className="text-xl font-medium">{user.name}</h2>
            <p className="text-gray-600 text-sm">{user.email}</p>

            
          </div>
        )}

      </div>
    </div>
  );
}
