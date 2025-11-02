
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="380127494172-rvsvcem9l4hl9e31u1ugr7db4ebsqjn6.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
)
