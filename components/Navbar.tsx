import React from 'react';
import { Bell, Menu, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  user: any;
}

export const Navbar: React.FC<NavbarProps> = ({ user }) => {
  return (
    <nav className="sticky top-0 z-40 w-full bg-dark-900/80 backdrop-blur-md border-b border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-3xl font-bold text-brand-500 font-['Teko'] tracking-wider">FIREZONE</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Tournaments</Link>
              <Link to="/my-tournaments" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">My Matches</Link>
              <Link to="/wallet" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Wallet</Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full text-gray-400 hover:text-white focus:outline-none">
              <Bell size={20} />
            </button>
            {user ? (
              <Link to="/profile" className="flex items-center gap-2">
                 <img className="h-8 w-8 rounded-full border border-brand-500" src={user.avatarUrl} alt="" />
                 <span className="hidden md:block text-sm font-medium text-white">{user.username}</span>
              </Link>
            ) : (
              <Link to="/login" className="text-sm font-medium text-brand-400 hover:text-brand-300">Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};