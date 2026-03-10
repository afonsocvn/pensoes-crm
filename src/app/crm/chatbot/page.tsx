'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase, ChatSession } from '@/lib/supabase';
import {
    Shield, MessageSquare, Download, RefreshCw, BarChart2,
    Users, Bot, AlertCircle
} from 'lucide-react';
import Link from 'next/link';

export default function ChatbotCRMPage() {
    const [sessions, setSessions] = useState<ChatSession[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null);

    const fetchSessions = useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('chat_sessions')
            .select('*')
            .order('created_at', { ascending: false });
        if (!error && data) {
            setSessions(data as ChatSession[]);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchSessions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function exportCSV() {
        const header = 'ID Sessão,Data,Estado,Lead Capturado,Contacto';
        const rows = sessions.map(s =>
            [s.id, new Date(s.created_at).toLocaleString('pt-PT'), s.estado, s.lead_capturado ? 'Sim' : 'Não', s.contacto ?? ''].join(',')
        );
        const blob = new Blob([[header, ...rows].join('\n')], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = `chat_logs_${new Date().toISOString().slice(0, 10)}.csv`; a.click();
        URL.revokeObjectURL(url);
    }

    // Stats
    const totalChats = sessions.length;
    const capturedLeads = sessions.filter(s => s.lead_capturado).length;
    const conversionRate = totalChats ? ((capturedLeads / totalChats) * 100).toFixed(1) : '0';



    return (
        <div className="crm-page">
            {/* Sidebar */}
            <aside className="crm-sidebar">
                <div className="sidebar-logo">
                    <Shield size={22} />
                    <span>SegurosPro</span>
                </div>
                <nav className="sidebar-nav">
                    <Link href="/crm" className="nav-item">
                        <Users size={18} /> Leads
                    </Link>
                    <Link href="/crm/chatbot" className="nav-item active">
                        <Bot size={18} /> Chatbot IA
                    </Link>
                    <div className="nav-divider" />
                    <Link href="/" className="nav-item">
                        <MessageSquare size={18} /> Landing Page
                    </Link>
                </nav>
            </aside>

            {/* Main */}
            <main className="crm-main">
                <div className="crm-header">
                    <div>
                        <h1>Dashboard do Chatbot IA</h1>
                        <p className="crm-sub">Estatísticas e registo de conversas</p>
                    </div>
                    <div className="crm-header-actions">
                        <button className="btn-icon" onClick={fetchSessions} title="Atualizar">
                            <RefreshCw size={16} className={loading ? 'spin' : ''} />
                        </button>
                        <button className="btn-secondary-sm" onClick={exportCSV} id="export-csv-btn">
                            <Download size={16} /> Exportar Registos
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="stats-row">
                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: '#eff6ff', color: '#2563eb' }}>
                            <MessageSquare size={20} />
                        </div>
                        <div>
                            <p className="stat-value">{totalChats}</p>
                            <p className="stat-label">Total de Chats</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: '#d1fae5', color: '#059669' }}>
                            <Users size={20} />
                        </div>
                        <div>
                            <p className="stat-value">{capturedLeads}</p>
                            <p className="stat-label">Leads Capturados via Chat</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: '#f3e8ff', color: '#7c3aed' }}>
                            <BarChart2 size={20} />
                        </div>
                        <div>
                            <p className="stat-value">{conversionRate}%</p>
                            <p className="stat-label">Taxa de Conversão</p>
                        </div>
                    </div>
                </div>

                <div className="chat-layout">
                    {/* Table */}
                    <div className="table-container chat-list">
                        <div className="table-header-custom">
                            <h3>Histórico de Sessões</h3>
                        </div>
                        {loading ? (
                            <div className="table-loading">
                                <RefreshCw size={24} className="spin" />
                                <span>A carregar registos...</span>
                            </div>
                        ) : sessions.length === 0 ? (
                            <div className="table-empty">
                                <Bot size={40} />
                                <p>Nenhuma sessão registada</p>
                            </div>
                        ) : (
                            <table className="leads-table">
                                <thead>
                                    <tr>
                                        <th>Data</th>
                                        <th>Estado / Sentimento</th>
                                        <th>Lead</th>
                                        <th>Contacto Guardado</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sessions.map(session => (
                                        <tr key={session.id} className={`lead-row ${selectedSession?.id === session.id ? 'selected' : ''}`}>
                                            <td className="date-cell">
                                                {new Date(session.created_at).toLocaleString('pt-PT', {
                                                    day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
                                                })}
                                            </td>
                                            <td>
                                                <span className={`chat-intent-badge ${session.estado.toLowerCase().replace(' ', '-')}`}>
                                                    {session.estado}
                                                </span>
                                            </td>
                                            <td>
                                                {session.lead_capturado ? (
                                                    <span className="lead-tag success">Sim</span>
                                                ) : (
                                                    <span className="lead-tag">Não</span>
                                                )}
                                            </td>
                                            <td>{session.contacto || '-'}</td>
                                            <td>
                                                <button
                                                    className="btn-view"
                                                    onClick={() => setSelectedSession(session)}
                                                >
                                                    Ver Transcrição
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                    {/* Transcript View */}
                    <div className="transcript-panel">
                        {selectedSession ? (
                            <div className="transcript-content">
                                <div className="transcript-header">
                                    <h3>Transcrição da Sessão</h3>
                                    <button className="close-btn" onClick={() => setSelectedSession(null)}>X</button>
                                </div>
                                <div className="transcript-meta">
                                    <span><strong>ID:</strong> {selectedSession.id.slice(0, 8)}...</span>
                                    <span><strong>Capturou Lead:</strong> {selectedSession.lead_capturado ? '✅' : '❌'}</span>
                                </div>
                                <div className="chat-messages-view">
                                    {selectedSession.transcript.map((msg, i) => (
                                        <div key={i} className={`chat-msg-static ${msg.role}`}>
                                            <div className="msg-bubble-static">{msg.content}</div>
                                        </div>
                                    ))}
                                    {selectedSession.transcript.length === 0 && (
                                        <p className="no-msgs"><AlertCircle size={16} /> Sem mensagens registadas nesta sessão.</p>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="transcript-empty">
                                <MessageSquare size={32} />
                                <p>Selecione uma sessão na tabela para ver a conversa detalhada.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <style>{crmStyles}</style>
            <style>{chatStyles}</style>
        </div>
    );
}
const crmStyles = `
  .crm-page { display: flex; min-height: 100vh; background: var(--bg); }
  .crm-sidebar { width: 220px; background: var(--text); color: #fff; display: flex; flex-direction: column; padding: 1.5rem 1rem; position: sticky; top: 0; height: 100vh; flex-shrink: 0; }
  .sidebar-logo { display: flex; align-items: center; gap: 0.5rem; font-weight: 800; font-size: 1rem; color: #fff; margin-bottom: 2rem; padding: 0 0.5rem; }
  .sidebar-nav { display: flex; flex-direction: column; gap: 0.25rem; flex: 1; }
  .nav-item { display: flex; align-items: center; gap: 0.625rem; padding: 0.625rem 0.75rem; border-radius: 10px; font-size: 0.9rem; font-weight: 500; color: rgba(255,255,255,0.65); transition: all 0.2s; text-decoration: none; }
  .nav-item:hover, .nav-item.active { background: rgba(255,255,255,0.1); color: #fff; }
  .nav-divider { height: 1px; background: rgba(255,255,255,0.1); margin: 0.5rem 0; }
  .sidebar-logout { display: flex; align-items: center; gap: 0.5rem; padding: 0.625rem 0.75rem; border-radius: 10px; font-size: 0.875rem; color: rgba(255,255,255,0.5); background: none; border: none; cursor: pointer; font-family: inherit; transition: all 0.2s; width: 100%; }
  .sidebar-logout:hover { color: #fff; background: rgba(255,255,255,0.1); }
  .crm-main { flex: 1; padding: 2rem; overflow: auto; height: 100vh; display: flex; flex-direction: column;}
  .crm-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 1.5rem; flex-shrink: 0; }
  .crm-header h1 { font-size: 1.5rem; font-weight: 800; color: var(--text); }
  .crm-sub { font-size: 0.875rem; color: var(--text-muted); margin-top: 0.25rem; }
  .crm-header-actions { display: flex; gap: 0.75rem; align-items: center; }
  .btn-icon { width: 36px; height: 36px; border-radius: 10px; border: 1px solid var(--border); background: var(--surface); display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--text-secondary); transition: all 0.2s; }
  .btn-icon:hover { border-color: var(--primary-light); color: var(--primary-light); }
  .btn-secondary-sm { display: flex; align-items: center; gap: 0.4rem; padding: 0.5rem 1rem; border-radius: 10px; border: 1px solid var(--border); background: var(--surface); font-size: 0.875rem; font-weight: 600; color: var(--text); cursor: pointer; font-family: inherit; transition: all 0.2s; }
  .btn-secondary-sm:hover { background: var(--surface-2); border-color: var(--primary-light); }
  .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1.5rem; flex-shrink: 0; }
  .stat-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.25rem 1.5rem; display: flex; align-items: center; gap: 1rem; }
  .stat-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .stat-value { font-size: 1.5rem; font-weight: 800; color: var(--text); line-height: 1.2; }
  .stat-label { font-size: 0.8rem; color: var(--text-muted); margin-top: 0.1rem; }
  .spin { animation: spin 0.8s linear infinite; }
`;

const chatStyles = `
  .chat-layout { display: grid; grid-template-columns: 3fr 2fr; gap: 1rem; flex: 1; min-height: 0; }
  .table-container { background: var(--surface); border-radius: var(--radius); border: 1px solid var(--border); overflow: auto; display: flex; flex-direction: column; }
  .table-header-custom { padding: 1rem; border-bottom: 1px solid var(--border); font-size: 1rem; font-weight: 700; background: var(--surface-2); }
  .leads-table { width: 100%; border-collapse: collapse; }
  .leads-table th { text-align: left; padding: 0.875rem 1rem; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); border-bottom: 1px solid var(--border); }
  .leads-table td { padding: 0.875rem 1rem; border-bottom: 1px solid var(--border); vertical-align: middle; font-size: 0.875rem; color: var(--text); }
  .lead-row:last-child td { border-bottom: none; }
  .lead-row:hover td { background: var(--surface-2); }
  .lead-row.selected td { background: #eff6ff; }
  .date-cell { color: var(--text-muted); font-size: 0.8125rem; white-space: nowrap; }
  
  .chat-intent-badge { font-size: 0.75rem; font-weight: 600; padding: 0.2rem 0.6rem; border-radius: 50px; background: #f1f5f9; color: #475569; border: 1px solid #e2e8f0; }
  .chat-intent-badge.interessado { background: #dcfce7; color: #166534; border-color: #bbf7d0; }
  .chat-intent-badge.reclamação { background: #fee2e2; color: #991b1b; border-color: #fecaca; }

  .lead-tag { font-size: 0.75rem; font-weight: 600; padding: 0.2rem 0.6rem; border-radius: 50px; background: #f1f5f9; color: #64748b; }
  .lead-tag.success { background: var(--primary-gradient); color: white; }

  .btn-view { background: #fff; border: 1px solid var(--border); padding: 0.4rem 0.75rem; border-radius: 6px; font-size: 0.75rem; font-weight: 600; cursor: pointer; transition: all 0.2s; color: var(--text); }
  .btn-view:hover { border-color: var(--primary-light); color: var(--primary-light); }

  .transcript-panel { background: var(--surface); border-radius: var(--radius); border: 1px solid var(--border); display: flex; flex-direction: column; overflow: hidden; }
  .transcript-empty { padding: 4rem 2rem; text-align: center; color: var(--text-muted); height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem; }
  .transcript-content { display: flex; flex-direction: column; height: 100%; }
  .transcript-header { display: flex; justify-content: space-between; align-items: center; padding: 1rem; border-bottom: 1px solid var(--border); background: var(--surface-2); font-weight: 700; }
  .close-btn { background: none; border: none; font-size: 1rem; font-weight: 700; color: var(--text-muted); cursor: pointer; }
  .close-btn:hover { color: var(--error); }
  .transcript-meta { display: flex; justify-content: space-between; padding: 0.75rem 1rem; background: #f8fafc; border-bottom: 1px solid var(--border); font-size: 0.8125rem; color: var(--text-secondary); }
  
  .chat-messages-view { flex: 1; overflow-y: auto; padding: 1rem; display: flex; flex-direction: column; gap: 0.75rem; background: #f0f4fa; }
  .chat-msg-static { display: flex; max-width: 85%; }
  .chat-msg-static.user { align-self: flex-end; }
  .chat-msg-static.assistant { align-self: flex-start; }
  .msg-bubble-static { padding: 0.6rem 0.85rem; border-radius: 12px; font-size: 0.875rem; line-height: 1.5; white-space: pre-wrap;}
  .chat-msg-static.user .msg-bubble-static { background: var(--primary-gradient); color: #fff; border-bottom-right-radius: 4px; }
  .chat-msg-static.assistant .msg-bubble-static { background: #fff; border: 1px solid var(--border); color: var(--text); border-bottom-left-radius: 4px; }
  .no-msgs { display: flex; align-items: center; gap: 0.5rem; justify-content: center; color: var(--text-muted); font-size: 0.875rem; height: 100%; }
`;
