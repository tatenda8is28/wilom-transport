import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { supabase } from './api/supabase';

// Layout Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Public Pages
import Home from './pages/public/Home';
import Inventory from './pages/public/Inventory';
import About from './pages/public/About';
import HowItWorks from './pages/public/HowItWorks';
import VehicleDetails from './pages/public/VehicleDetails';
import Privacy from './pages/public/Privacy';
import Terms from './pages/public/Terms';
import Export from './pages/public/Export'; // ← ADDED

// Admin & Auth Pages
import Dashboard from './pages/admin/Dashboard';
import Login from './pages/admin/Login';

// Component to protect Admin routes
function ProtectedRoute({ children, session }) {
  if (!session) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// Layout wrapper to handle nav/footer visibility
function Layout({ children, session }) {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Hide public Navbar/Footer on Admin and Login pages */}
      {!isAdminPath && !isLoginPage && <Navbar />}
      <main className="grow">
        {children}
      </main>
      {!isAdminPath && !isLoginPage && <Footer />}
    </div>
  );
}

export default function App() {
  const [session, setSession] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // 1. Check for initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setInitializing(false);
    });

    // 2. Listen for Auth changes (Login/Logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Show nothing or a loading spinner while checking auth status
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
          <Route path="/export" element={<Export />} /> {/* ← ADDED */}

          {/* LEGAL ROUTES */}
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />

          {/* AUTHENTICATION */}
          <Route path="/login" element={<Login />} />

          {/* PROTECTED COMMAND CENTER ROUTES */}
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