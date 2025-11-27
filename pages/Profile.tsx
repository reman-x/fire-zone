import React, { useState } from 'react';
import { User } from '../types';
import { mockService } from '../services/mockService';
import { LogOut, User as UserIcon, Gamepad, Mail, Shield, Camera, Mic, MapPin, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Props {
  user: User | null;
  setUser: Function;
}

export const Profile: React.FC<Props> = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState({
    camera: false,
    microphone: false,
    location: false,
    notifications: true
  });

  const handleLogout = () => {
    mockService.logout();
    setUser(null);
    navigate('/');
  };

  const togglePermission = (key: keyof typeof permissions) => {
    setPermissions(prev => ({
        ...prev,
        [key]: !prev[key]
    }));
  };

  if (!user) return <div className="text-center mt-20 text-gray-400">Please login.</div>;

  return (
    <div className="max-w-xl mx-auto pb-20">
        <div className="bg-dark-800 rounded-2xl border border-dark-700 overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-brand-900 to-dark-900"></div>
            <div className="px-6 relative">
                <div className="absolute -top-12 p-1 bg-dark-800 rounded-full">
                    <img src={user.avatarUrl} className="w-24 h-24 rounded-full border-2 border-brand-500" alt="Avatar" />
                </div>
                <div className="pt-16 pb-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold text-white">{user.username}</h2>
                            <p className="text-gray-500 text-sm">Member since 2023</p>
                        </div>
                        <span className="px-3 py-1 bg-brand-900/30 text-brand-500 text-xs font-bold rounded-full border border-brand-500/20">
                            PRO MEMBER
                        </span>
                    </div>

                    <div className="mt-8 space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-dark-900 rounded-lg border border-dark-700">
                            <Gamepad className="text-gray-400" size={20} />
                            <div>
                                <p className="text-xs text-gray-500">Free Fire ID</p>
                                <p className="text-white font-mono">{user.gameId}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-dark-900 rounded-lg border border-dark-700">
                            <Mail className="text-gray-400" size={20} />
                            <div>
                                <p className="text-xs text-gray-500">Email Address</p>
                                <p className="text-white">{user.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-dark-900 rounded-lg border border-dark-700">
                            <Shield className="text-gray-400" size={20} />
                            <div>
                                <p className="text-xs text-gray-500">Account Status</p>
                                <p className="text-green-500 font-bold">Verified</p>
                            </div>
                        </div>
                    </div>

                    {/* Permissions Section */}
                    <div className="mt-8">
                        <h3 className="text-lg font-bold text-white font-['Teko'] mb-4">APP PERMISSIONS</h3>
                        <div className="grid grid-cols-1 gap-3">
                            <div className="flex items-center justify-between p-3 bg-dark-900 rounded-lg border border-dark-700">
                                <div className="flex items-center gap-3">
                                    <Camera size={18} className="text-brand-500" />
                                    <span className="text-sm text-gray-300">Camera Access</span>
                                </div>
                                <button 
                                    onClick={() => togglePermission('camera')}
                                    className={`w-10 h-5 rounded-full relative transition-colors ${permissions.camera ? 'bg-brand-600' : 'bg-dark-700'}`}
                                >
                                    <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${permissions.camera ? 'left-6' : 'left-1'}`}></div>
                                </button>
                            </div>
                            
                            <div className="flex items-center justify-between p-3 bg-dark-900 rounded-lg border border-dark-700">
                                <div className="flex items-center gap-3">
                                    <Mic size={18} className="text-brand-500" />
                                    <span className="text-sm text-gray-300">Microphone</span>
                                </div>
                                <button 
                                    onClick={() => togglePermission('microphone')}
                                    className={`w-10 h-5 rounded-full relative transition-colors ${permissions.microphone ? 'bg-brand-600' : 'bg-dark-700'}`}
                                >
                                    <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${permissions.microphone ? 'left-6' : 'left-1'}`}></div>
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-dark-900 rounded-lg border border-dark-700">
                                <div className="flex items-center gap-3">
                                    <MapPin size={18} className="text-brand-500" />
                                    <span className="text-sm text-gray-300">Location Services</span>
                                </div>
                                <button 
                                    onClick={() => togglePermission('location')}
                                    className={`w-10 h-5 rounded-full relative transition-colors ${permissions.location ? 'bg-brand-600' : 'bg-dark-700'}`}
                                >
                                    <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${permissions.location ? 'left-6' : 'left-1'}`}></div>
                                </button>
                            </div>

                             <div className="flex items-center justify-between p-3 bg-dark-900 rounded-lg border border-dark-700">
                                <div className="flex items-center gap-3">
                                    <Bell size={18} className="text-brand-500" />
                                    <span className="text-sm text-gray-300">Push Notifications</span>
                                </div>
                                <button 
                                    onClick={() => togglePermission('notifications')}
                                    className={`w-10 h-5 rounded-full relative transition-colors ${permissions.notifications ? 'bg-brand-600' : 'bg-dark-700'}`}
                                >
                                    <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${permissions.notifications ? 'left-6' : 'left-1'}`}></div>
                                </button>
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={handleLogout}
                        className="w-full mt-8 bg-dark-700 hover:bg-dark-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};