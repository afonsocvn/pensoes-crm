'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { Landmark, Users, MessageSquare, LogOut, LayoutDashboard, Settings, Kanban } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const handleLogout = async () => {
    // Mock logout since auth is removed
    console.log("Logout mock hit");
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <Landmark size={24} className="sidebar-logo" />
          <span>GestãoPensões CRM</span>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-group">Geral</div>
          <Link href="/crm" className={`nav-link ${pathname === '/crm' ? 'active' : ''}`}>
            <LayoutDashboard size={18} /> Resumo
          </Link>
          <Link href="/crm/leads" className={`nav-link ${pathname.includes('/crm/leads') ? 'active' : ''}`}>
            <Users size={18} /> Gestão de Leads
          </Link>
          <Link href="/crm/pipeline/individual" className={`nav-link ${pathname.includes('/crm/pipeline/individual') ? 'active' : ''}`}>
            <Kanban size={18} /> Pipeline Individual
          </Link>
          <Link href="/crm/pipeline/empresas" className={`nav-link ${pathname.includes('/crm/pipeline/empresas') ? 'active' : ''}`}>
            <Kanban size={18} /> Pipeline Empresas
          </Link>

          <div className="nav-group mt">Chatbot IA</div>
          <Link href="/crm/chatbot" className={`nav-link ${pathname.includes('/crm/chatbot') ? 'active' : ''}`}>
            <MessageSquare size={18} /> Sessões de Chat
          </Link>
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={16} /> Terminar Sessão
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {children}
      </main>

      <style>{`
        .dashboard-layout {
          display: flex;
          min-height: 100vh;
          background: #f1f5f9;
        }
        .dash-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }
        .dash-loading .spinner {
          width: 40px; height: 40px;
          border: 3px solid var(--border);
          border-top-color: var(--primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        /* Sidebar */
        .sidebar {
          width: 260px;
          background: #1e293b;
          color: white;
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          position: sticky;
          top: 0;
          height: 100vh;
        }
        .sidebar-header {
          height: 64px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 1.5rem;
          font-weight: 700;
          font-size: 1.125rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          color: #fff;
        }
        .sidebar-logo { color: #38bdf8; }
        
        .sidebar-nav {
          padding: 1.5rem 1rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .nav-group {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #94a3b8;
          font-weight: 600;
          padding: 0 0.5rem;
          margin-bottom: 0.5rem;
        }
        .nav-group.mt { margin-top: 1.5rem; }
        .nav-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 8px;
          color: #cbd5e1;
          font-size: 0.9375rem;
          font-weight: 500;
          transition: all 0.2s;
        }
        .nav-link:hover {
          background: rgba(255,255,255,0.05);
          color: #fff;
        }
        .nav-link.active {
          background: var(--primary-light);
          color: #fff;
        }

        .sidebar-footer {
          padding: 1rem;
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        .logout-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          padding: 10px 12px;
          background: none;
          border: none;
          color: #ef4444;
          font-weight: 500;
          font-size: 0.9375rem;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .logout-btn:hover {
          background: rgba(239,68,68,0.1);
        }

        /* Main Content */
        .dashboard-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
}
