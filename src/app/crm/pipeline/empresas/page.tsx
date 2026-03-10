'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, Mail, Phone, Calendar, MoreVertical } from 'lucide-react';

type Lead = {
    id: string;
    nome: string;
    empresa: string;
    email: string;
    telefone: string;
    estado: string;
    created_at: string;
    dimensao: string;
};

const PIPELINE_STAGES = [
    'Lead',
    'Envio de proposta',
    'Oferta escolhida',
    'Proposta',
    'Fecho'
];

export default function PipelineEmpresasPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLeads();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchLeads = async () => {
        setLoading(true);
        const { data } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
        if (data) {
            const mappedData = data
                .filter(lead => lead.dimensao && lead.dimensao !== 'Individual')
                .map(lead => {
                    let currentStatus = lead.estado;
                    if (!PIPELINE_STAGES.includes(currentStatus)) {
                        if (currentStatus === 'Novo') currentStatus = 'Lead';
                        else if (currentStatus === 'Em Contacto') currentStatus = 'Envio de proposta';
                        else if (currentStatus === 'Fechado') currentStatus = 'Fecho';
                        else currentStatus = 'Lead';
                    }
                    return { ...lead, estado: currentStatus };
                });
            setLeads(mappedData);
        }
        setLoading(false);
    }

    async function updateLeadStatus(leadId: string, newStatus: string) {
        setLeads(prev => prev.map(l => l.id === leadId ? { ...l, estado: newStatus } : l));
        const { error } = await supabase.from('leads').update({ estado: newStatus }).eq('id', leadId);
        if (error) {
            console.error(error);
            fetchLeads();
        }
    }

    const handleDragStart = (e: React.DragEvent, leadId: string) => {
        e.dataTransfer.setData('leadId', leadId);
        e.currentTarget.classList.add('dragging');
    };

    const handleDragEnd = (e: React.DragEvent) => {
        e.currentTarget.classList.remove('dragging');
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.currentTarget.classList.add('drag-over');
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.currentTarget.classList.remove('drag-over');
    };

    const handleDrop = (e: React.DragEvent, stage: string) => {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');
        const leadId = e.dataTransfer.getData('leadId');
        if (leadId) {
            const lead = leads.find(l => l.id === leadId);
            if (lead && lead.estado !== stage) {
                updateLeadStatus(leadId, stage);
            }
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('pt-PT', { day: '2-digit', month: 'short' }).format(date);
    };

    return (
        <div className="crm-main" style={{ padding: '2rem' }}>
            <div className="crm-header mb-6">
                <div>
                    <h1>Pipeline: Planos para Empresas</h1>
                    <p className="crm-sub">Mova os leads para negócios empresariais entre as fases (Drag & Drop)</p>
                </div>
            </div>

            {loading ? (
                <div className="flex-center" style={{ height: '400px' }}>
                    <Loader2 size={32} className="spinner" style={{ color: 'var(--primary)' }} />
                </div>
            ) : (
                <div className="kanban-board">
                    {PIPELINE_STAGES.map(stage => {
                        const stageLeads = leads.filter(l => l.estado === stage);
                        return (
                            <div
                                key={stage}
                                className="kanban-col"
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={(e) => handleDrop(e, stage)}
                            >
                                <div className="kanban-col-header">
                                    <h3 className="kanban-col-title">{stage}</h3>
                                    <span className="kanban-badge">{stageLeads.length}</span>
                                </div>
                                <div className="kanban-cards">
                                    {stageLeads.map(lead => (
                                        <div
                                            key={lead.id}
                                            className="kanban-card"
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, lead.id)}
                                            onDragEnd={handleDragEnd}
                                        >
                                            <div className="kc-top">
                                                <span className="kc-company">{lead.empresa || 'Particular'}</span>
                                                <MoreVertical size={14} className="kc-more" />
                                            </div>
                                            <h4 className="kc-name">{lead.nome}</h4>

                                            <div className="kc-details">
                                                {lead.email && (
                                                    <div className="kc-detail-item">
                                                        <Mail size={12} /> {lead.email}
                                                    </div>
                                                )}
                                                {lead.telefone && (
                                                    <div className="kc-detail-item">
                                                        <Phone size={12} /> {lead.telefone}
                                                    </div>
                                                )}
                                                <div className="kc-detail-item" style={{ marginTop: '0.2rem', color: 'var(--primary)' }}>
                                                    <strong>Dimensão:</strong> {lead.dimensao}
                                                </div>
                                            </div>

                                            <div className="kc-footer">
                                                <div className="kc-date">
                                                    <Calendar size={12} />
                                                    {formatDate(lead.created_at)}
                                                </div>
                                                <div className="kc-avatar">
                                                    {lead.nome.charAt(0).toUpperCase()}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {stageLeads.length === 0 && (
                                        <div className="kanban-empty">Sem leads nesta fase</div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <style>{`
                .mb-6 { margin-bottom: 24px; }
                .crm-header h1 { font-size: 1.5rem; font-weight: 800; color: var(--text); }
                .crm-sub { color: var(--text-secondary); font-size: 0.9375rem; }
                .flex-center { display: flex; justify-content: center; align-items: center; }
                
                .kanban-board {
                    display: flex;
                    gap: 16px;
                    overflow-x: auto;
                    padding-bottom: 16px;
                    min-height: 600px;
                }
                
                .kanban-col {
                    background: #f8fafc;
                    border-radius: 12px;
                    min-width: 280px;
                    max-width: 280px;
                    display: flex;
                    flex-direction: column;
                    border: 2px dashed transparent;
                    transition: border-color 0.2s, background 0.2s;
                }
                .kanban-col.drag-over {
                    border-color: var(--primary-light);
                    background: #f0f4fa;
                }
                
                .kanban-col-header {
                    padding: 16px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid var(--border);
                }
                .kanban-col-title {
                    font-size: 0.9375rem;
                    font-weight: 600;
                    color: var(--text);
                }
                .kanban-badge {
                    background: #e2e8f0;
                    color: #475569;
                    font-size: 0.75rem;
                    font-weight: 700;
                    padding: 2px 8px;
                    border-radius: 12px;
                }
                
                .kanban-cards {
                    padding: 12px;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    flex: 1;
                    overflow-y: auto;
                }
                
                .kanban-empty {
                    padding: 24px 0;
                    text-align: center;
                    font-size: 0.8125rem;
                    color: #94a3b8;
                    font-style: italic;
                }
                
                .kanban-card {
                    background: white;
                    border-radius: 8px;
                    padding: 14px;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                    border: 1px solid var(--border);
                    cursor: grab;
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .kanban-card:hover {
                    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
                }
                .kanban-card:active { cursor: grabbing; }
                .kanban-card.dragging {
                    opacity: 0.5;
                    transform: scale(0.95);
                }
                
                .kc-top {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 4px;
                }
                .kc-company {
                    font-size: 0.75rem;
                    font-weight: 600;
                    color: var(--primary);
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                .kc-more { color: #94a3b8; cursor: pointer; }
                
                .kc-name {
                    font-size: 0.9375rem;
                    font-weight: 700;
                    color: var(--text);
                    margin-bottom: 12px;
                }
                
                .kc-details {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                    margin-bottom: 12px;
                }
                .kc-detail-item {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 0.8125rem;
                    color: var(--text-secondary);
                }
                
                .kc-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-top: 12px;
                    border-top: 1px solid #f1f5f9;
                }
                .kc-date {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    font-size: 0.75rem;
                    color: #94a3b8;
                    font-weight: 500;
                }
                .kc-avatar {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: var(--primary-light);
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.75rem;
                    font-weight: 700;
                }
            `}</style>
        </div>
    );
}
