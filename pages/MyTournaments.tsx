import React from 'react';
import { TournamentCard } from '../components/TournamentCard';
import { mockService } from '../services/mockService';
import { User } from '../types';

interface Props {
  user: User | null;
}

export const MyTournaments: React.FC<Props> = ({ user }) => {
  if (!user) return <div className="text-center mt-20 text-gray-400">Please login to view your tournaments.</div>;

  const tournaments = mockService.getMyTournaments(user.id);

  return (
    <div className="pb-20">
      <h2 className="text-3xl font-bold text-white font-['Teko'] mb-6">MY MATCHES</h2>
      
      {tournaments.length === 0 ? (
          <div className="text-center py-20 bg-dark-800 rounded-2xl border border-dark-700 border-dashed">
              <p className="text-gray-400 mb-4">You haven't joined any tournaments yet.</p>
              <button className="text-brand-500 font-bold hover:underline">Browse Tournaments</button>
          </div>
      ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tournaments.map(t => (
                <TournamentCard key={t.id} tournament={t} joined={true} />
            ))}
          </div>
      )}
    </div>
  );
};