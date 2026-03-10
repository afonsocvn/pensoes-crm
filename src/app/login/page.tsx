'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Shield, Lock, AlertCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;

            router.push('/crm');
        } catch (err: any) {
            setError(err.message || 'Credenciais inválidas');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-header">
                    <Shield size={32} className="login-logo" />
                    <h1>Acesso Reservado</h1>
                    <p>Área de gestão de leads e atendimento</p>
                </div>

                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="admin@segurospro.pt"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Palavra-passe</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && (
                        <div className="login-error">
                            <AlertCircle size={16} />
                            <span>{error}</span>
                        </div>
                    )}

                    <button type="submit" className="btn-primary login-btn" disabled={loading}>
                        {loading ? <Loader2 size={18} className="spinner" /> : <><Lock size={18} /> Entrar no Dashboard</>}
                    </button>
                </form>
            </div>

            <style>{`
        .login-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }
        .login-card {
          background: white;
          width: 100%;
          max-width: 420px;
          border-radius: var(--radius-lg);
          padding: 2.5rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          animation: fadeInUp 0.4s ease;
        }
        .login-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .login-logo {
          color: var(--primary);
          margin-bottom: 1rem;
        }
        .login-header h1 {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text);
          margin-bottom: 0.25rem;
        }
        .login-header p {
          color: var(--text-secondary);
          font-size: 0.875rem;
        }
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .form-group label {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .form-group input {
          padding: 0.75rem 1rem;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          font-size: 1rem;
          transition: all 0.2s;
        }
        .form-group input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
          outline: none;
        }
        .login-error {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: var(--radius);
          color: var(--error);
          font-size: 0.875rem;
        }
        .login-btn {
          width: 100%;
          justify-content: center;
          margin-top: 0.5rem;
        }
      `}</style>
        </div>
    );
}
