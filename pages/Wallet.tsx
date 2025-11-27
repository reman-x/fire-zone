import React from 'react';
import { User, Transaction } from '../types';
import { mockService } from '../services/mockService';
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react';

interface Props {
  user: User | null;
}

export const Wallet: React.FC<Props> = ({ user }) => {
  const transactions = user ? mockService.getTransactions(user.id) : [];

  if (!user) return <div className="text-center mt-20 text-gray-400">Please login to view wallet.</div>;

  return (
    <div className="max-w-2xl mx-auto pb-20">
      <h2 className="text-3xl font-bold text-white font-['Teko'] mb-6">MY WALLET</h2>

      {/* Balance Card */}
      <div className="bg-gradient-to-br from-brand-900 to-dark-900 p-6 rounded-2xl border border-brand-800/50 relative overflow-hidden mb-8">
        <div className="absolute top-0 right-0 p-32 bg-brand-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        
        <div className="relative z-10">
            <p className="text-brand-200 text-sm font-medium mb-1">Total Balance</p>
            <h1 className="text-5xl font-bold text-white mb-6">${user.balance.toFixed(2)}</h1>
            
            <div className="flex gap-4">
                <button className="flex-1 bg-white text-brand-900 font-bold py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
                    <ArrowDownLeft size={18} /> Deposit
                </button>
                <button className="flex-1 bg-brand-600/30 text-white font-bold py-2 rounded-lg border border-brand-500/30 flex items-center justify-center gap-2 hover:bg-brand-600/40 transition-colors">
                    <ArrowUpRight size={18} /> Withdraw
                </button>
            </div>
        </div>
      </div>

      {/* Transactions */}
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <Clock size={20} className="text-brand-500" />
        Transaction History
      </h3>
      
      <div className="space-y-3">
        {transactions.length === 0 ? (
            <div className="text-gray-500 text-center py-8 bg-dark-800 rounded-xl">No transactions yet.</div>
        ) : (
            transactions.map(tx => (
                <div key={tx.id} className="bg-dark-800 p-4 rounded-xl border border-dark-700 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full ${tx.amount > 0 ? 'bg-green-900/30 text-green-500' : 'bg-red-900/30 text-red-500'}`}>
                            {tx.amount > 0 ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                        </div>
                        <div>
                            <p className="font-bold text-white">{tx.type.replace('_', ' ')}</p>
                            <p className="text-xs text-gray-500">{new Date(tx.date).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <span className={`font-bold ${tx.amount > 0 ? 'text-green-500' : 'text-white'}`}>
                        {tx.amount > 0 ? '+' : ''}{tx.amount} USD
                    </span>
                </div>
            ))
        )}
      </div>
    </div>
  );
};