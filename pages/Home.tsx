import React, { useEffect, useState } from 'react';
import { TournamentCard } from '../components/TournamentCard';
import { mockService } from '../services/mockService';
import { Tournament, User } from '../types';
import { Filter } from 'lucide-react';

interface Props {
  user: User | null;
}

export const Home: React.FC<Props> = ({ user }) => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    setTournaments(mockService.getTournaments());
  }, []);

  const handleJoin = (id: string) => {
    if (!user) {
      alert("Please login first!");
      return;
    }
    const success = mockService.joinTournament(id);
    if (success) {
      alert("Joined successfully!");
      setTournaments(mockService.getTournaments()); // Refresh
    } else {
      alert("Failed to join. Check balance or slots.");
    }
  };

  const filteredTournaments = filter === 'All' 
    ? tournaments 
    : tournaments.filter(t => t.mode === filter);

  return (
    <div className="space-y-6 pb-20">
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden h-48 md:h-64 border border-dark-700">
        <img 
            src="https://picsum.photos/1200/400?random=100" 
            alt="Hero" 
            className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900/90 via-dark-900/40 to-transparent flex items-center p-6 md:p-10">
            <div className="max-w-md">
                <h1 className="text-4xl md:text-6xl font-bold text-white font-['Teko'] mb-2">DOMINATE <br/><span className="text-brand-500">THE ARENA</span></h1>
                <p className="text-gray-300 text-sm md:text-base mb-4">Join daily Free Fire tournaments and win real cash prizes.</p>
            </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        <div className="bg-dark-800 p-2 rounded-lg border border-dark-700 text-brand-500">
            <Filter size={20} />
        </div>
        {['All', 'Solo', 'Duo', 'Squad'].map(f => (
            <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${
                    filter === f 
                    ? 'bg-brand-600 text-white' 
                    : 'bg-dark-800 text-gray-400 hover:bg-dark-700'
                }`}
            >
                {f}
            </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTournaments.map(t => (
            <TournamentCard key={t.id} tournament={t} onJoin={handleJoin} />
        ))}
      </div>
    </div>
  );
};