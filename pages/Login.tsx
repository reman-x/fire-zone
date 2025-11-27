import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockService } from '../services/mockService';

interface Props {
  setUser: Function;
}

export const Login: React.FC<Props> = ({ setUser }) => {
  const [email, setEmail] = useState('user@example.com');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = mockService.login(email);
    if (user) {
      setUser(user);
      if (user.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      alert("Invalid credentials. Try user@example.com or admin@example.com");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-dark-800 p-8 rounded-2xl border border-dark-700 w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-brand-500 font-['Teko']">WELCOME BACK</h2>
            <p className="text-gray-400 text-sm">Login to continue your journey</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
            <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-dark-900 border border-dark-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors"
            />
            <p className="text-xs text-gray-500 mt-2">Hint: user@example.com or admin@example.com</p>
          </div>

          <button type="submit" className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-lg transition-all transform active:scale-95">
            LOGIN NOW
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
            Don't have an account? <span className="text-brand-500 cursor-pointer">Register here</span>
        </div>
      </div>
    </div>
  );
};