import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from '@material-tailwind/react'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './i18n.js';
ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <GoogleOAuthProvider clientId="42218779760-6u9424pu6cb47ai3vloehuses6mroq6i.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </ThemeProvider>

)
