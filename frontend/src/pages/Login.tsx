import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api/v1';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect to admin dashboard
  if (token) {
    return <Navigate to="/admin" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/auth/login`, { username, password });
      if (response.data?.success) {
        const adminToken = response.data.data.accessToken;
        localStorage.setItem('adminToken', adminToken);
        navigate('/admin');
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      setAuthError(err.response?.data?.message || 'Tên đăng nhập hoặc mật khẩu không chính xác.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05090a] text-slate-100 flex items-center justify-center pt-24 px-4 font-display">
      <div className="w-full max-w-md bg-[#0a1315] border border-[#1a2e33] rounded-3xl p-8 shadow-card relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
        
        <div className="text-center mb-8">
          <span className="material-symbols-outlined text-primary text-5xl mb-4 animate-pulse">lock</span>
          <h1 className="text-2xl font-bold text-white mb-2">iGen System Control</h1>
          <p className="text-xs text-[#82a1a8] uppercase tracking-widest">Đăng nhập quyền quản trị viên</p>
        </div>

        {authError && (
          <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 text-sm mb-6 flex items-center gap-2 animate-fade-in">
            <span className="material-symbols-outlined text-base">error</span>
            <span>{authError}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#82a1a8] font-bold mb-2">
              Tên đăng nhập
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              autoComplete="username"
              className="w-full bg-[#05090a] border border-[#1a2e33] text-white rounded-xl py-3 px-4 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 text-sm interactable"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#82a1a8] font-bold mb-2">
              Mật khẩu
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              className="w-full bg-[#05090a] border border-[#1a2e33] text-white rounded-xl py-3 px-4 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 text-sm interactable"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full interactable py-4 bg-primary hover:bg-[#008199] text-white rounded-xl font-bold uppercase tracking-wider shadow-glow transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            ) : (
              'Access Command Center'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
