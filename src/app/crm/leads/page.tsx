'use client';

import { useEffect, useState } from 'react';
import { supabase, LeadStatus, Lead } from '@/lib/supabase';
import { Download, Search, Loader2 } from 'lucide-react';

const STATUS_COLORS: Record<LeadStatus, { bg: string, text: string }> = {
    'Novo': { bg: '#dbeafe', text: '#1e40af' },
    'Contactado': { bg: '#fef3c7', text: '#b45309' },
    'Em Negociação': { bg: '#f3e8ff', text: '#7e22ce' },
    'Proposta Enviada': { bg: '#ffedd5', text: '#c2410c' },
    'Convertido': { bg: '#dcfce7', text: '#15803d' },
    'Perdido': { bg: '#fee2e2', text: '#b91c1c' },
    'Re-engajar': { bg: '#e5e7eb', text: '#374151' },
};

const STATUS_OPTIONS: LeadStatus[] = [
    'Novo', 'Contactado', 'Em Negociação', 'Proposta Enviada', 'Convertido', 'Perdido', 'Re-engajar'
];

export default function LeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchLeads();
    }, []);

    async function fetchLeads() {
        setLoading(true);
        const { data } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
        if (data) setLeads(data);
        setLoading(false);
    }

    async function updateStatus(id: string, novoEstado: string) {
        const { error } = await supabase.from('leads').update({ estado: novoEstado }).eq('id', id);
        if (!error) {
            setLeads(prev => prev.map(l => l.id === id ? { ...l, estado: novoEstado as LeadStatus } : l));
        } else {
            console.error(error);
        }
    }

    const handleExportCSV = () => {
        const headers = ['Nome', 'Email', 'Empresa', 'Telefone', 'Dimensão', 'Estado', 'Data'];
        const csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + leads.map(l => `${l.nome},${l.email},${l.empresa},${l.telefone || ''},${l.dimensao},${l.estado},${new Date(l.created_at).toLocaleDateString()}`).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `leads_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        link.remove();
    };

    const filteredLeads = leads.filter(l =>
        l.nome.toLowerCase().includes(search.toLowerCase()) ||
        l.empresa.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="crm-page">
            <header className="page-header flex-header">
                <div>
                    <h1>Gestão de Leads</h1>
                    <p>Acompanhe e gira o seu funil de vendas</p>
                </div>
                <button onClick={handleExportCSV} className="btn-secondary export-btn">
                    <Download size={16} /> Exportar CSV
                </button>
            </header>

            <div className="table-card">
                <div className="table-toolbar">
                    <div className="search-bar">
                        <Search size={18} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Pesquisar por nome ou empresa..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="results-count">
                        {filteredLeads.length} leads encontrados
                    </div>
                </div>

                <div className="table-wrapper">
                    {loading ? (
                        <div className="table-loading"><Loader2 size={24} className="spinner" /> a carregar...</div>
                    ) : (
                        <table className="leads-table">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Tipo de Plano</th>
                                    <th>Contacto</th>
                                    <th>Data</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLeads.map(lead => (
                                    <tr key={lead.id}>
                                        <td className="font-medium">{lead.nome}</td>
                                        <td>{lead.dimensao}</td>
                                        <td>
                                            <div className="contact-info">
                                                <a href={`mailto:${lead.email}`}>{lead.email}</a>
                                                {lead.telefone && <span className="tel-sub">{lead.telefone}</span>}
                                            </div>
                                        </td>
                                        <td className="text-sm text-muted">
                                            {new Date(lead.created_at).toLocaleDateString('pt-PT')}
                                        </td>
                                        <td>
                                            <select
                                                className="status-select"
                                                style={{
                                                    backgroundColor: STATUS_COLORS[lead.estado]?.bg || '#f1f5f9',
                                                    color: STATUS_COLORS[lead.estado]?.text || '#0f172a'
                                                }}
                                                value={lead.estado}
                                                onChange={(e) => updateStatus(lead.id, e.target.value)}
                                            >
                                                {STATUS_OPTIONS.map(opt => (
                                                    <option key={opt} value={opt}>{opt}</option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                                {filteredLeads.length === 0 && !loading && (
                                    <tr>
                                        <td colSpan={5} className="empty-state">
                                            Nenhum lead encontrado com a sua pesquisa.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            <style>{`
        .crm-page { padding: 2rem; }
        .flex-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .page-header h1 { font-size: 1.5rem; font-weight: 800; color: var(--text); }
        .page-header p { color: var(--text-secondary); font-size: 0.9375rem; }
        .export-btn { display: flex; align-items: center; gap: 8px; font-size: 0.875rem; padding: 0.5rem 1rem; border-color: var(--border); color: var(--text); }
        .export-btn:hover { background: #f1f5f9; color: var(--text); border-color: var(--text-muted); }

        .table-card {
          background: white;
          border-radius: var(--radius);
          border: 1px solid var(--border);
          box-shadow: var(--shadow-sm);
          overflow: hidden;
        }
        .table-toolbar {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .search-bar {
          position: relative;
          width: 300px;
        }
        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }
        .search-bar input {
          width: 100%;
          padding: 8px 12px 8px 36px;
          border: 1px solid var(--border);
          border-radius: 6px;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .search-bar input:focus { border-color: var(--primary); }
        .results-count { font-size: 0.875rem; color: var(--text-muted); }

        .table-wrapper { overflow-x: auto; }
        .table-loading { padding: 3rem; text-align: center; color: var(--text-muted); display: flex; align-items: center; justify-content: center; gap: 8px; }
        
        .leads-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        .leads-table th {
          padding: 12px 1.5rem;
          font-size: 0.75rem;
          text-transform: uppercase;
          font-weight: 600;
          color: var(--text-muted);
          background: #f8fafc;
          border-bottom: 1px solid var(--border);
        }
        .leads-table td {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid var(--border);
          font-size: 0.875rem;
        }
        .leads-table tr:hover td { background: #f8fafc; }
        .font-medium { font-weight: 600; color: var(--text); }
        
        .contact-info { display: flex; flex-direction: column; gap: 2px; }
        .contact-info a { color: var(--primary); font-weight: 500; }
        .tel-sub { font-size: 0.75rem; color: var(--text-muted); }
        
        .dim-badge {
          background: #f1f5f9;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
          color: var(--text-secondary);
          border: 1px solid var(--border);
        }

        .status-select {
          padding: 6px 10px;
          border-radius: 20px;
          border: none;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          outline: none;
          appearance: none;
          min-width: 130px;
          text-align: center;
        }
        
        .empty-state { text-align: center; color: var(--text-muted); padding: 3rem !important; }
      `}</style>
        </div>
    );
}
