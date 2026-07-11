import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api/v1';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('adminToken');

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
        sessionStorage.setItem('adminToken', adminToken);
        navigate('/admin');
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      setAuthError(err.response?.data?.message || 'Tên đăng nhập hoặc mật khẩu không chính xác.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full bg-surface-alt border border-line text-ink rounded-lg py-3 px-4 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm transition-all';

  return (
    <div className="min-h-screen bg-surface-alt flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-md bg-white border border-line rounded-card p-8 shadow-card">
        <div className="text-center mb-8">
          <span className="inline-flex w-14 h-14 rounded-2xl bg-primary-light items-center justify-center mb-4">
            <span className="material-symbols-outlined text-primary text-3xl">lock</span>
          </span>
          <h1 className="text-2xl font-bold text-ink mb-1">iGen System Control</h1>
          <p className="text-sm text-muted">Đăng nhập quyền quản trị viên</p>
        </div>

        {authError && (
          <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-base">error</span>
            <span>{authError}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-ink mb-2">Tên đăng nhập</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              autoComplete="username"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-2">Mật khẩu</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              className={inputClass}
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 disabled:opacity-50">
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            ) : (
              'Đăng nhập'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
