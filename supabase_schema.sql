-- Run this SQL in your Supabase SQL Editor to set up the database schema.

-- LEADS TABLE
CREATE TABLE IF NOT EXISTS public.leads (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at  TIMESTAMPTZ DEFAULT now() NOT NULL,
  nome        TEXT NOT NULL,
  email       TEXT NOT NULL,
  empresa     TEXT NOT NULL,
  telefone    TEXT,
  dimensao    TEXT NOT NULL,
  estado      TEXT DEFAULT 'Novo' NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow anyone to INSERT (form submissions from public landing page)
CREATE POLICY "Public can insert leads"
  ON public.leads FOR INSERT TO anon
  WITH CHECK (true);

-- Allow anyone to SELECT (CRM dashboard uses anon key)
CREATE POLICY "Public can read leads"
  ON public.leads FOR SELECT TO anon
  USING (true);

-- Allow anyone to UPDATE estado
CREATE POLICY "Public can update lead status"
  ON public.leads FOR UPDATE TO anon
  USING (true);

-- CHAT SESSIONS TABLE (for future chatbot logging)
CREATE TABLE IF NOT EXISTS public.chat_sessions (
  id                UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at        TIMESTAMPTZ DEFAULT now() NOT NULL,
  duration_seconds  INT,
  estado            TEXT DEFAULT 'Dúvida Geral',
  transcript        JSONB DEFAULT '[]'::jsonb,
  lead_capturado    BOOLEAN DEFAULT false,
  contacto          TEXT
);

ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can insert chat sessions"
  ON public.chat_sessions FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Public can read chat sessions"
  ON public.chat_sessions FOR SELECT TO anon
  USING (true);
