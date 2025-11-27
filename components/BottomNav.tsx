import React from 'react';
import { Home, Trophy, Wallet, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const BottomNav: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="md:hidden fixed bottom-0 w-full bg-dark-900 border-t border-dark-700 pb-safe z-40">
      <div className="flex justify-around items-center h-16">
        <Link to="/" className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive('/') ? 'text-brand-500' : 'text-gray-400'}`}>
          <Home size={20} />
          <span className="text-[10px] uppercase font-medium">Home</span>
        </Link>
        <Link to="/my-tournaments" className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive('/my-tournaments') ? 'text-brand-500' : 'text-gray-400'}`}>
          <Trophy size={20} />
          <span className="text-[10px] uppercase font-medium">Matches</span>
        </Link>
        <Link to="/wallet" className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive('/wallet') ? 'text-brand-500' : 'text-gray-400'}`}>
          <Wallet size={20} />
          <span className="text-[10px] uppercase font-medium">Wallet</span>
        </Link>
        <Link to="/profile" className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive('/profile') ? 'text-brand-500' : 'text-gray-400'}`}>
          <User size={20} />
          <span className="text-[10px] uppercase font-medium">Profile</span>
        </Link>
      </div>
    </div>
  );
};