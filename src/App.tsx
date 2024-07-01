// @ts-nocheck
import React from 'react';
import { BrowserRouter as Router, Route, BrowserRouter, Routes } from 'react-router-dom';
import Login from './features/auth/login';
import Register from './features/auth/register';
import AuthLayout from './features/layout/auth.layout';
import './App.css'
import ForgotPassword from './features/auth/forgot-password';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
        <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
        <Route path="/forgot-password" element={<AuthLayout><ForgotPassword /></AuthLayout>} />
      </Routes>
    </Router>
  );
};


export default App;
