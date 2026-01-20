import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import FieldDetails from './pages/FieldDetails'
import { useState, useEffect } from 'react'

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token')
    if (!token) {
        return <Navigate to="/login" replace />
    }
    return children
}

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50 text-gray-900">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } />
                    <Route path="/field/:id" element={
                        <ProtectedRoute>
                            <FieldDetails />
                        </ProtectedRoute>
                    } />
                </Routes>
            </div>
        </Router>
    )
}

export default App
