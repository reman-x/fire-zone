import React, { useState } from 'react';
import { mockService } from '../../services/mockService';
import { Tournament, TournamentStatus } from '../../types';
import { Plus, Trash, Users, Calendar } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>(mockService.getTournaments());
  const [showForm, setShowForm] = useState(false);
  
  // Form State
  const [title, setTitle] = useState('');
  const [map, setMap] = useState('Bermuda');
  const [entryFee, setEntryFee] = useState(0);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    mockService.createTournament({
        title,
        map,
        mode: 'Squad',
        entryFee,
        prizePool: entryFee * 40, // Simple logic
        maxPlayers: 48,
        startTime: new Date().toISOString(),
        imageUrl: `https://picsum.photos/800/400?random=${Math.random()}`
    });
    setTournaments(mockService.getTournaments());
    setShowForm(false);
    alert("Tournament Created");
  };

  const handleDelete = (id: string) => {
    if(confirm('Delete this tournament?')) {
        mockService.deleteTournament(id);
        setTournaments(mockService.getTournaments());
    }
  };

  return (
    <div className="pb-20">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white font-['Teko']">ADMIN DASHBOARD</h2>
        <button 
            onClick={() => setShowForm(!showForm)}
            className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold"
        >
            <Plus size={18} /> Create New
        </button>
      </div>

      {showForm && (
          <div className="bg-dark-800 p-6 rounded-xl border border-dark-700 mb-8">
              <h3 className="text-white font-bold mb-4">Create Tournament</h3>
              <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="bg-dark-900 border border-dark-700 p-2 rounded text-white" required />
                  <select value={map} onChange={e => setMap(e.target.value)} className="bg-dark-900 border border-dark-700 p-2 rounded text-white">
                      <option>Bermuda</option>
                      <option>Purgatory</option>
                      <option>Kalahari</option>
                  </select>
                  <input type="number" placeholder="Entry Fee" value={entryFee} onChange={e => setEntryFee(Number(e.target.value))} className="bg-dark-900 border border-dark-700 p-2 rounded text-white" required />
                  <button type="submit" className="bg-green-600 text-white rounded font-bold">Save</button>
              </form>
          </div>
      )}

      <div className="bg-dark-800 rounded-xl border border-dark-700 overflow-hidden">
        <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-dark-900 text-gray-200 uppercase font-bold text-xs">
                <tr>
                    <th className="p-4">Tournament</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Players</th>
                    <th className="p-4 text-right">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-dark-700">
                {tournaments.map(t => (
                    <tr key={t.id} className="hover:bg-dark-700/50 transition-colors">
                        <td className="p-4 font-medium text-white">{t.title}</td>
                        <td className="p-4">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${t.status === 'OPEN' ? 'bg-green-900/30 text-green-500' : 'bg-red-900/30 text-red-500'}`}>
                                {t.status}
                            </span>
                        </td>
                        <td className="p-4">{t.currentPlayers}/{t.maxPlayers}</td>
                        <td className="p-4 text-right">
                            <button onClick={() => handleDelete(t.id)} className="text-red-500 hover:text-red-400">
                                <Trash size={16} />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};