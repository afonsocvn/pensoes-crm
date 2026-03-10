# Pensões CRM & Landing Page – Gestão Inteligente de Leads e Chatbot AI

O projeto **Pensões CRM** tem como objetivo revolucionar a forma como os fundos de pensões (particulares e empresariais) captam e gerem os seus potenciais clientes. A plataforma permite a atração de leads através de uma landing page otimizada com um chatbot inteligente assistido por IA, eliminando horas de triagem manual e qualificando potenciais investidores de forma automatizada e empática. O foco é otimizar o tempo das equipas de vendas e maximizar as oportunidades de subscrição de fundos.

## Tech Stack
- **Framework:** Next.js + React + Tailwind CSS (TSX)
- **Base de Dados & Autenticação:** Supabase
- **Inteligência Artificial:** Google Gemini AI (gemini-1.5-flash) para conversação natural e captação de dados
- **Design & Ícones:** lucide-react

## Key Features and Workflow
- **Captação Inteligente (Chatbot):** Integração de um assistente virtual conversacional capaz de qualificar leads em tempo real e encaminhá-las para a equipa humana.
- **Formulários Dinâmicos:** Formulário de captação que se adapta instantaneamente ao perfil (Plano Individual ou Plano Empresa), reduzindo a fricção no registo.
- **Gestão Eficiente (CRM):** Dashboard dedicado com visualização em tabela e Pipeline Kanban separada (Individual / Empresas) com suporte a Drag & Drop.
- **Exportação de Dados:** Funcionalidade de exportação de leads para CSV em apenas um clique para integração com outras ferramentas de marketing.

## Process

### 1. Development Architecture and AI-Assisted Design
- Setup do ambiente de desenvolvimento (Next.js App Router).
- *Durante o desenvolvimento:* Utilização de agentes de inteligência artificial (Gemini) para atuar como *financial advisors*, com *system prompts* customizados para um tom de voz institucional e focado em segurança financeira e rendimento a longo prazo.
### 2. Captação de Leads e Implementação CRM (Development Phase)
- Criação de tabelas no Supabase (`leads` e `chat_sessions`) para armazenamento persistente.
- Construção de interfaces imersivas (Landing Page) com bifurcação de jornadas (Particulares vs Empresas).
- Implementação de um dashboard Kanban customizado para gerir os estados negociais do pipeline das leads (Novo, Em Negociação, Fecho, etc).
### 3. Frontend, Deployment, and UX
- Design de uma interface intuitiva, usando tons de confiança (azul escuro e laranja dinâmico).
- Configuração de *Environment Variables* para proteção das chaves API.
- Preparação para deployment completo na **Vercel** para acesso imediato da equipa e testes de clientes finais.

## Key Findings (Beta Phase)
- Utilizadores valorizam respostas rápidas sobre rentabilidade e benefícios fiscais logo no contacto inicial (chatbot).
- Uma interface intuitiva de Drag & Drop no CRM acelera a gestão diária pela equipa de vendas.
- O formulário dinâmico aumenta a taxa de conversão ao não pedir campos desnecessários a leads particulares.

## Final Conclusion
Para maximizar o impacto do **Pensões CRM**, as próximas iterações poderão focar-se na expansão das capacidades de análise de dados dentro do próprio dashboard (métricas de conversão gerais) e na integração direta das chamadas (funções de agendamento automático). O sistema atual prova que aliar IA a captação de leads reduz substancialmente o atrito inicial.
