import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Pages
import ProjectsPage from './pages/home'
import CreateProjectPage from './pages/CreateProjectPage'
import LandingPage from "./pages/LandingPage"
import PageLoader from './components/PageLoader';
import ManageProjectPage from "./pages/ManageProjectPage"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import TokenVerificationPage from "./pages/TokenVerificationPage"
import DashboardHome from "./pages/DashboardHome"
import DocsPage from "./pages/DocsPage"
// Toastify imports
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './toast-custom.css'

function App() {
  return (
    <Router>
    <PageLoader />
      <Routes>
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/create/new" element={<CreateProjectPage />} />
        <Route path="/projects/:projectId" element={<ManageProjectPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/zap-in" element={<LoginPage />} />
        <Route path="/auth/join-zapstack" element={<SignupPage />} />
        <Route path="/verify-access" element={<TokenVerificationPage />} />
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/docs" element={<DocsPage />} />

      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Router>
  )
}

export default App
