import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { AICoach } from './components/AICoach';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Wallet } from './pages/Wallet';
import { MyTournaments } from './pages/MyTournaments';
import { Profile } from './pages/Profile';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { mockService } from './services/mockService';
import { User, UserRole } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session (mock)
    const storedUser = mockService.getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  if (loading) return <div className="min-h-screen bg-dark-900 text-white flex items-center justify-center">Loading...</div>;

  return (
    <HashRouter>
      <div className="min-h-screen bg-dark-900 text-gray-200 font-sans selection:bg-brand-500 selection:text-white">
        <Navbar user={user} />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/wallet" element={<Wallet user={user} />} />
            <Route path="/my-tournaments" element={<MyTournaments user={user} />} />
            <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
            
            {/* Admin Routes */}
            <Route 
              path="/admin" 
              element={
                user && user.role === UserRole.ADMIN 
                  ? <AdminDashboard /> 
                  : <Navigate to="/login" />
              } 
            />
          </Routes>
        </main>

        <AICoach />
        <BottomNav />
      </div>
    </HashRouter>
  );
}

export default App;