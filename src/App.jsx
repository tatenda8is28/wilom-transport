import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { supabase } from './api/supabase';

// Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Public Pages
import Home from './pages/public/Home';
import Inventory from './pages/public/Inventory';
import About from './pages/public/About';
import HowItWorks from './pages/public/HowItWorks';
import VehicleDetails from './pages/public/VehicleDetails';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import Login from './pages/admin/Login';

// Protected Route Logic
function ProtectedRoute({ children, session }) {
  if (!session) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// Layout Wrapper to hide/show Navigation
function Layout({ children, session }) {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {!isAdminPath && !isLoginPage && <Navbar />}
      <main className="grow">{children}</main>
      {!isAdminPath && !isLoginPage && <Footer />}
    </div>
  );
}

export default function App() {
  const [session, setSession] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setInitializing(false);
    });

    // Listen for Auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (initializing) return null;

  return (
    <BrowserRouter>
      <Layout session={session}>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/vehicle/:id" element={<VehicleDetails />} />
          
          {/* AUTH ROUTE */}
          <Route path="/login" element={<Login />} />

          {/* PROTECTED ADMIN ROUTES */}
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute session={session}>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}