**PRD — Plataforma Digital**

Seguradora / Mediadora de Seguros

# **1\. Visão Geral do Produto**

Esta plataforma tem como objetivo digitalizar o processo de captação e gestão de leads para uma seguradora, combinando três módulos principais: um formulário de captura de leads, um dashboard de CRM e um chatbot inteligente de atendimento.

O público-alvo principal são os prospects (potenciais clientes) que chegam à plataforma, e a equipa comercial/administrativa que gere os contactos e acompanha o funil de vendas.

# **2\. Módulo 1 — Formulário de Captura de Leads**

## **2.1 Objetivo**

Recolher dados de contacto de prospects de forma simples, rápida e com elevada taxa de conversão.

## **2.2 Campos do Formulário**

* **Nome:** Nome completo (obrigatório)

* **Email:** Endereço de email profissional (obrigatório)

* **Empresa:** Nome da empresa (obrigatório)

* **Telefone:** Número de telefone/telemóvel (opcional)

* **Dimensão da empresa:** 1–10 / 11–50 / 51–200 / 201–500 / 500+ (dropdown obrigatório)

## **2.3 Validação Inteligente**

* Email deve seguir formato válido (inclui @empresa.com)

* Campos obrigatórios bloqueiam o botão de envio até serem preenchidos

* Indicador visual verde (✓) em campos validados com sucesso

* Mensagens de erro amigáveis: ex. "Vamos adicionar o seu email"

* Bordo vermelho em campos inválidos

## **2.4 Design & Experiência**

* Layout minimalista, coluna única, fundo branco

* Inspirado em Typeform / HubSpot — espaçamento generoso entre campos

* Bordos suaves, estados de foco subtis, botão CTA destacado

* Subtítulo a explicar o próximo passo: "Entraremos em contacto em menos de 2 horas"

## **2.5 Pós-Submissão**

* Mensagem de sucesso imediata: "Obrigado\! Entraremos em contacto em breve."

* Redireccionamento automático para página de agradecimento após 3 segundos

* Todos os dados guardados na base de dados (Supabase): nome, email, empresa, telefone, dimensão, timestamp

# **3\. Módulo 2 — Dashboard CRM**

## **3.1 Objetivo**

Fornecer à equipa comercial uma visão clara dos leads gerados e do estado do funil de vendas, sem dependência de ferramentas externas.

## **3.2 Tabela de Leads**

* Listagem de todos os leads, do mais recente para o mais antigo

* Colunas: Nome, Email, Empresa, Telefone, Dimensão, Data de Submissão, Estado

* Contador de leads totais no topo do dashboard

* Campo de pesquisa para filtrar por nome ou empresa

* Botão "Exportar CSV" para download dos dados

## **3.3 Estados do Lead (Funil de Vendas)**

Cada lead pode ter um dos seguintes estados, editável diretamente na tabela:

| Estado | Descrição |
| :---- | :---- |
| **🆕 Novo** | Lead recém-chegado, ainda não contactado |
| **📞 Contactado** | Primeiro contacto realizado pela equipa |
| **💬 Em Negociação** | Lead está a avaliar proposta/simulação |
| **📋 Proposta Enviada** | Proposta formal enviada ao prospect |
| **✅ Convertido** | Lead transformado em cliente |
| **❌ Perdido** | Lead não avançou no processo |
| **🔄 Re-engajar** | Lead frio a retomar futuramente |

## **3.4 Base de Dados (Supabase)**

* Todos os leads e estados são armazenados e geridos diretamente no Supabase

* Alterações de estado feitas no dashboard são guardadas em tempo real na base de dados

* Histórico de alterações de estado por lead (audit trail)

## **3.5 Autenticação**

* Acesso ao dashboard protegido por password

* Autenticação simples via email \+ password (sem registo público)

# **4\. Módulo 3 — Chatbot de Atendimento (IA)**

## **4.1 Objetivo**

Atender prospects 24/7, qualificar leads automaticamente, responder a dúvidas sobre seguros e encaminhar para a equipa humana quando necessário.

## **4.2 Interface (Front-End)**

* Widget flutuante no canto inferior direito da página

* Cabeçalho com logótipo da seguradora e indicador de estado "Online"

* Botões de início rápido (chips clicáveis):

* "Quero pedir uma simulação"

* "Como reportar um sinistro?"

* "Dúvidas sobre coberturas"

* "Falar com um consultor"

* Animação de digitação: "O Assistente está a escrever..."

* Formulário de captura integrado na bolha (Nome, Email, Telemóvel) quando o interesse é elevado

* Suporte a Markdown: texto a negrito, listas, botões CTA

## **4.3 Lógica e Personalidade (Gemini API)**

* Persona: Consultor de Seguros — profissional, empático, orientado a soluções

* Tom em Português (pt-PT)

* Qualificação automática de leads durante a conversa:

* Novo cliente ou cliente existente?

* Tipo de seguro pretendido (Auto, Saúde, Vida, Habitação, etc.)

* Nível de urgência

* Knowledge Base: acesso a FAQs, condições e políticas da seguradora para evitar respostas incorretas

* Passagem para humano: quando solicitado, fornece email de apoio (ex: suporte@seguradora.pt)

## **4.4 Mensagens Automáticas (pt-PT)**

**Boas-vindas inicial:**

*"Olá\! Sou o seu Assistente Virtual. Como posso ajudar a proteger o que mais importa para si hoje? Procure uma simulação ou fale comigo sobre as nossas coberturas."*

**Mensagem de inatividade (30s):**

*"Precisa de ajuda para encontrar a melhor proteção para o seu perfil? Estou aqui para esclarecer dúvidas sobre os nossos planos. Como posso ajudar?"*

**Equipa offline:**

*"Neste momento a nossa equipa está a descansar. Deixe o seu contacto e o motivo do pedido; entraremos em contacto brevemente."*

# **5\. Dashboard Administrativo — Chatbot**

## **5.1 Estatísticas de Conversão**

* Total de chats iniciados vs. leads capturados (funil de atendimento)

* Tópicos mais pesquisados (ex: "Seguro de Saúde", "Assistência em Viagem")

* Taxa de conversão chat → lead

## **5.2 Histórico de Conversas**

* Todas as interações do chatbot são guardadas na base de dados Supabase

* Listagem pesquisável: ID, Data, Duração, Estado da conversa

* Transcrição completa de cada sessão acessível no dashboard

* Análise de sentimento registada por sessão: Interessado / Dúvida Geral / Reclamação

## **5.3 Gestão de Leads do Chatbot**

* Separador exclusivo com contactos que solicitaram simulação ou agendamento

* Exportação para Excel (.xlsx ou .csv)

* Colunas: Data/Hora, ID Sessão, Transcrição, Contacto Capturado, Sentimento

## **5.4 Gestão de Conteúdo da IA**

* Área de edição das FAQs e regras de negócio sem necessidade de código

* Atualização do prompt/persona do assistente diretamente na interface

## **5.5 Conformidade RGPD**

* Eliminação automática de logs de conversa após período configurável

* Opção de eliminação a pedido do utilizador

# **6\. Stack Técnica Recomendada**

| Componente | Tecnologia |
| :---- | :---- |
| **Base de Dados** | Supabase (PostgreSQL) |
| **IA / Chatbot** | Gemini 2.0 Flash (Google) |
| **Front-End** | React / Next.js |
| **Autenticação** | Supabase Auth |
| **CRM & Leads** | Supabase (tabelas leads \+ estados) |
| **Chat Logs** | Supabase (tabela conversas) |
| **Exportação** | CSV / XLSX |

# **7\. Âmbito — Versão 1.0 (MVP)**

Esta versão foca-se nos fluxos essenciais para validar o produto com utilizadores reais. Funcionalidades avançadas (integrações adicionais, análises preditivas, multi-idioma) serão consideradas em versões futuras.

* ✅ Formulário de captura \+ validação \+ Supabase

* ✅ Dashboard CRM com estados e pesquisa

* ✅ Chatbot IA com qualificação de leads

* ✅ Dashboard administrativo básico do chatbot

* ✅ Exportação CSV/XLSX

* ✅ Autenticação protegida por password

* 🔜 Integrações avançadas (fora do MVP)