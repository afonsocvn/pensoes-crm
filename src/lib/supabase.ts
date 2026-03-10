import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type LeadStatus =
  | 'Novo'
  | 'Contactado'
  | 'Em Negociação'
  | 'Proposta Enviada'
  | 'Convertido'
  | 'Perdido'
  | 'Re-engajar';

export interface Lead {
  id: string;
  nome: string;
  email: string;
  empresa: string;
  telefone?: string;
  dimensao: string;
  estado: LeadStatus;
  created_at: string;
}

export interface ChatSession {
  id: string;
  created_at: string;
  duration_seconds?: number;
  estado: 'Interessado' | 'Dúvida Geral' | 'Reclamação';
  transcript: { role: 'user' | 'assistant'; content: string }[];
  lead_capturado: boolean;
  contacto?: string;
}
