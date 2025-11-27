import React from 'react';
import { Users, Clock, MapPin, Trophy } from 'lucide-react';
import { Tournament, TournamentStatus } from '../types';

interface Props {
  tournament: Tournament;
  onJoin?: (id: string) => void;
  joined?: boolean;
}

export const TournamentCard: React.FC<Props> = ({ tournament, onJoin, joined }) => {
  const isFull = tournament.currentPlayers >= tournament.maxPlayers;
  const progress = (tournament.currentPlayers / tournament.maxPlayers) * 100;

  return (
    <div className="bg-dark-800 rounded-xl overflow-hidden border border-dark-700 shadow-lg hover:shadow-brand-900/20 transition-all duration-300 group">
      <div className="relative h-40">
        <img 
          src={tournament.imageUrl} 
          alt={tournament.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs font-bold text-white uppercase border border-white/10">
          {tournament.status}
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-dark-900 to-transparent"></div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-white font-['Teko'] tracking-wide text-2xl mb-1 truncate">{tournament.title}</h3>
        
        <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
          <div className="flex items-center gap-1">
            <MapPin size={14} className="text-brand-500" />
            {tournament.map}
          </div>
          <div className="flex items-center gap-1">
            <Users size={14} className="text-brand-500" />
            {tournament.mode}
          </div>
          <div className="flex items-center gap-1">
             <Clock size={14} className="text-brand-500" />
             {new Date(tournament.startTime).toLocaleDateString()}
          </div>
        </div>

        <div className="flex justify-between items-end mb-2">
            <div>
                <p className="text-xs text-gray-500">Prize Pool</p>
                <div className="flex items-center gap-1 text-brand-400 font-bold text-lg">
                    <Trophy size={16} />
                    ${tournament.prizePool}
                </div>
            </div>
             <div>
                <p className="text-xs text-gray-500 text-right">Entry</p>
                <p className="text-white font-bold text-lg text-right">${tournament.entryFee}</p>
            </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-dark-700 h-2 rounded-full mb-2 overflow-hidden">
            <div 
                className="bg-brand-600 h-full rounded-full" 
                style={{ width: `${progress}%` }}
            ></div>
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 mb-4">
            <span>{tournament.currentPlayers} joined</span>
            <span>{tournament.maxPlayers} slots</span>
        </div>

        {onJoin && !joined && (
           <button 
            onClick={() => onJoin(tournament.id)}
            disabled={isFull}
            className={`w-full py-2.5 rounded-lg font-bold text-sm uppercase tracking-wider transition-colors ${
                isFull 
                ? 'bg-dark-700 text-gray-500 cursor-not-allowed' 
                : 'bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-900/30'
            }`}
           >
             {isFull ? 'Full' : 'Join Tournament'}
           </button>
        )}
        {joined && (
             <button disabled className="w-full py-2.5 rounded-lg font-bold text-sm uppercase tracking-wider bg-green-600/20 text-green-500 border border-green-500/30 cursor-default">
                 Joined
             </button>
        )}
      </div>
    </div>
  );
};