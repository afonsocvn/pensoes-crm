'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Users, TrendingUp, MessageSquare } from 'lucide-react';

export default function CRMDashboard() {
    const [stats, setStats] = useState({
        totalLeads: 0,
        convertedLeads: 0,
        totalChats: 0,
        leadsFromChat: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStats() {
            try {
                const { count: totalLeads } = await supabase.from('leads').select('*', { count: 'exact', head: true });
                const { count: convertedLeads } = await supabase.from('leads').select('*', { count: 'exact', head: true }).eq('estado', 'Convertido');
                const { count: totalChats } = await supabase.from('chat_sessions').select('*', { count: 'exact', head: true });
                const { count: leadsFromChat } = await supabase.from('chat_sessions').select('*', { count: 'exact', head: true }).eq('lead_capturado', true);

                setStats({
                    totalLeads: totalLeads || 0,
                    convertedLeads: convertedLeads || 0,
                    totalChats: totalChats || 0,
                    leadsFromChat: leadsFromChat || 0,
                });
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        loadStats();
    }, []);

    if (loading) return null;

    return (
        <div className="crm-page">
            <header className="page-header">
                <h1>Resumo da Plataforma</h1>
                <p>Visão global de performance e conversão</p>
            </header>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon"><Users size={20} /></div>
                    <div>
                        <h3>Total de Leads</h3>
                        <div className="stat-val">{stats.totalLeads}</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon success"><TrendingUp size={20} /></div>
                    <div>
                        <h3>Leads Convertidos</h3>
                        <div className="stat-val">{stats.convertedLeads}</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon msg"><MessageSquare size={20} /></div>
                    <div>
                        <h3>Sessões de Chat</h3>
                        <div className="stat-val">{stats.totalChats}</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon"><Users size={20} /></div>
                    <div>
                        <h3>Leads via Chat</h3>
                        <div className="stat-val">{stats.leadsFromChat}</div>
                    </div>
                </div>
            </div>

            <style>{`
        .crm-page { padding: 2rem; }
        .page-header { margin-bottom: 2rem; }
        .page-header h1 { font-size: 1.5rem; font-weight: 800; color: var(--text); }
        .page-header p { color: var(--text-secondary); font-size: 0.9375rem; }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
        }
        .stat-card {
          background: white;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          box-shadow: var(--shadow-sm);
        }
        .stat-icon {
          width: 48px; height: 48px;
          border-radius: 12px;
          background: #e0f2fe; color: #0284c7;
          display: flex; align-items: center; justify-content: center;
        }
        .stat-icon.success { background: #dcfce7; color: #16a34a; }
        .stat-icon.msg { background: #f3e8ff; color: #9333ea; }
        .stat-card h3 { font-size: 0.8125rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 0.25rem; }
        .stat-val { font-size: 1.5rem; font-weight: 800; color: var(--text); letter-spacing: -0.02em; }
      `}</style>
        </div>
    );
}
