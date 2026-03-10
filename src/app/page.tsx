import LeadForm from '@/components/LeadForm';
import ChatWidget from '@/components/ChatWidget';
import { Shield, Users, TrendingUp, Clock, CheckCircle, Star, ArrowRight, Phone, Mail, Landmark } from 'lucide-react';

const benefits = [
  { icon: Shield, title: 'Segurança Financeira', desc: 'Proteja e rentabilize o seu património a pensar no futuro da sua reforma.' },
  { icon: Users, title: 'Apoio Especializado', desc: 'Um gestor dedicado a avaliar o seu perfil de risco e objetivos financeiros.' },
  { icon: TrendingUp, title: 'Vantagens Fiscais', desc: 'Maximize o seu retorno com benefícios fiscais exclusivos dos fundos de Pensões.' },
  { icon: Clock, title: 'Rapidez na Adesão', desc: 'Processo digital simples e resposta garantida por um consultor num instante.' },
];

const testimonials = [
  { name: 'Mariana Costa', role: 'Diretora Financeira', text: 'Transferir o meu PPR para a GestãoPensões foi a melhor decisão. Rentabilidade estável e apoio transparente.', stars: 5 },
  { name: 'Ricardo Ferreira', role: 'Gestor de Património', text: 'Tinha um fundo desadequado à minha idade. A equipa ajudou-me a reajustar o meu perfil de risco com sucesso.', stars: 5 },
  { name: 'Sofia Andrade', role: 'Empresária', text: 'Adquiri um fundo de pensões aberto para os meus colaboradores. O acompanhamento tem sido excecional.', stars: 5 },
];

const coverages = [
  { emoji: '📈', name: 'Fundo de Pensões Aberto Mais Ações', description: 'Prepare a sua reforma com foco em rentabilidade a médio e longo prazo.' },
  { emoji: '⚖️', name: 'Fundo de Pensões Aberto Acções', description: 'Prepare a sua reforma com um retorno elevado a médio e longo prazo.' },
  { emoji: '💎', name: 'Fundo Pensões Aberto Valorização', description: 'Prepare a sua reforma com um retorno acrescido a médio e longo prazo.' },
  { emoji: '🏦', name: 'Fundo de Pensões Aberto Segurança', description: 'Prepare a sua reforma com prudência.' },
  { emoji: '🔐', name: 'Fundo de Pensões Aberto Garantia', description: 'Prepare a sua reforma sem riscos.' },
  { emoji: '🏢', name: 'Fundos Fechados', description: 'Constitua um Fundo de Pensões para a sua empresa.' },
];

export default function Home() {
  return (
    <>
      <div className="page">

        {/* NAV */}
        <nav className="navbar">
          <div className="nav-inner">
            <div className="nav-logo">
              <Landmark size={22} strokeWidth={2} />
              <span>GestãoPensões</span>
            </div>
            <div className="nav-links">
              <a href="#beneficios">Vantagens</a>
              <a href="#fundos">Fundos Disponíveis</a>
              <a href="#testimonials">Testemunhos</a>
              <a href="#contacto" className="nav-cta">Simular Reforma</a>
            </div>
          </div>
        </nav>

        {/* HERO */}
        <section className="hero">
          <div className="hero-bg-shapes">
            <div className="shape shape-1" />
            <div className="shape shape-2" />
          </div>
          <div className="container hero-grid">
            <div className="hero-content animate-fadeInUp">
              <div className="badge">
                <span className="badge-dot" />
                Planeamento Financeiro • PPR
              </div>
              <h1>
                Prepare hoje o seu futuro<br />
                de amanhã, com a <span className="hero-highlight">melhor rentabilidade.</span>
              </h1>
              <p className="hero-sub">
                Descubra os nossos fundos de pensões adaptados ao seu perfil.
                Construa a sua reforma com máxima segurança, flexibilidade e benefícios fiscais imediatos.
              </p>
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-num">+4.500</span>
                  <span className="stat-label">Clientes Reformulados</span>
                </div>
                <div className="stat-divider" />
                <div className="stat">
                  <span className="stat-num">5.2%</span>
                  <span className="stat-label">Rentabilidade Média/Ano</span>
                </div>
                <div className="stat-divider" />
                <div className="stat">
                  <span className="stat-num">Ilimitada</span>
                  <span className="stat-label">Paz de Espírito</span>
                </div>
              </div>
              <div className="hero-trust">
                <CheckCircle size={15} className="trust-icon" />
                <span>Especialistas em Reforma</span>
                <CheckCircle size={15} className="trust-icon" />
                <span>Gestão Ativa de Portefólio</span>
                <CheckCircle size={15} className="trust-icon" />
                <span>Regulados pela CMVM</span>
              </div>
            </div>
            <div className="hero-form-card animate-fadeInUp" style={{ animationDelay: '0.15s' }} id="contacto">
              <div className="form-card-header">
                <h2>Planeie a sua Reforma</h2>
                <p>Descubra o fundo ideal para os seus objetivos</p>
              </div>
              <LeadForm />
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="benefits-section" id="beneficios">
          <div className="container">
            <div className="section-header">
              <h2>Porquê escolher os nossos fundos?</h2>
              <p>Soluções de longo prazo desenhadas a pensar no seu bem-estar financeiro</p>
            </div>
            <div className="benefits-grid">
              {benefits.map((b, i) => (
                <div key={i} className="benefit-card" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="benefit-icon">
                    <b.icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3>{b.title}</h3>
                  <p>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FUNDS / COVERAGES */}
        <section className="coverages-section" id="fundos">
          <div className="container">
            <div className="section-header">
              <h2>Opções de Investimento e Reforma</h2>
              <p>Diversifique a sua poupança com fundos adaptados a cada fase da sua vida.</p>
            </div>
            <div className="coverages-grid">
              {coverages.map((c, i) => (
                <div key={i} className="coverage-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="coverage-emoji">{c.emoji}</span>
                    <span style={{ fontWeight: 'bold' }}>{c.name}</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 'normal' }}>{c.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="how-section">
          <div className="container">
            <div className="section-header">
              <h2>Como planear a sua Reforma?</h2>
              <p>O processo de investimento claro e estruturado</p>
            </div>
            <div className="steps-grid">
              {[
                { num: '01', title: 'Partilhe o seu objetivo', desc: 'Indique a sua idade de reforma esperada e os seus objetivos de capital.' },
                { num: '02', title: 'Análise de Perfil', desc: 'O nosso consultor analisa o seu perfil de risco (Conservador, Moderado, Dinâmico).' },
                { num: '03', title: 'Proposta de Fundo', desc: 'Apresentamos um fundo de pensões ou PPR com histórico de simulação detalhado.' },
                { num: '04', title: 'Acompanhamento', desc: 'Ajustamos a carteira ao longo do tempo conforme a sua idade avança (Ciclo de Vida).' },
              ].map((s, i) => (
                <div key={i} className="step-card">
                  <div className="step-num">{s.num}</div>
                  {i < 3 && <ArrowRight size={18} className="step-arrow" />}
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS FOR COMPANIES */}
        <section className="how-section companies-section" style={{ background: 'var(--bg)' }}>
          <div className="container">
            <div className="section-header">
              <h2>Benefícios de um plano para a sua empresa</h2>
              <p>Passos necessários para a concretização de Planos de Pensões para colaboradores</p>
            </div>
            <div className="steps-grid">
              {[
                { num: '01', title: 'Partilhe o seu objetivo', desc: 'Objetivo da empresa e dimensão da empresa.' },
                { num: '02', title: 'Análise da oferta', desc: 'Avaliamos e analisamos a oferta para a sua organização.' },
                { num: '03', title: 'Proposta de plano', desc: 'Proposta de plano de pensões e comissionamento.' },
                { num: '04', title: 'Implementação', desc: 'Implementação e Acompanhamento.' },
              ].map((s, i) => (
                <div key={i} className="step-card">
                  <div className="step-num">{s.num}</div>
                  {i < 3 && <ArrowRight size={18} className="step-arrow" />}
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="testimonials-section" id="testimonials">
          <div className="container">
            <div className="section-header">
              <h2>A confiança dos nossos investidores</h2>
              <p>Garantimos um acompanhamento transparente em todas as fases das suas poupanças</p>
            </div>
            <div className="testimonials-grid">
              {testimonials.map((t, i) => (
                <div key={i} className="testimonial-card">
                  <div className="stars">
                    {Array.from({ length: t.stars }).map((_, s) => (
                      <Star key={s} size={14} fill="var(--gold)" stroke="none" />
                    ))}
                  </div>
                  <p className="testimonial-text">&quot;{t.text}&quot;</p>
                  <div className="testimonial-author">
                    <div className="author-avatar">{t.name[0]}</div>
                    <div>
                      <p className="author-name">{t.name}</p>
                      <p className="author-role">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA BOTTOM */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-card">
              <h2>Quer garantir a qualidade de vida na reforma?</h2>
              <p>Os seus objetivos financeiros não podem esperar. Fale com um dos nossos consultores.</p>
              <div className="cta-actions">
                <a href="#contacto" className="btn-primary">
                  <Landmark size={18} /> Simular Agora a Minha Reforma
                </a>
                <div className="cta-contacts">
                  <a href="tel:+351210000000" className="contact-link">
                    <Phone size={16} /> +351 210 000 000
                  </a>
                  <a href="mailto:reforma@gestaopensoes.pt" className="contact-link">
                    <Mail size={16} /> reforma@gestaopensoes.pt
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div className="container">
            <div className="footer-brand">
              <Landmark size={20} />
              <span>GestãoPensões</span>
            </div>
            <p className="footer-copy">
              © 2026 GestãoPensões · Sociedade Gestora de Fundos de Pensões, S.A.
            </p>
            <div className="footer-links">
              <a href="/crm">Acesso Colaboradores</a>
              <a href="#">Privacidade</a>
              <a href="#">Termos e Condições</a>
            </div>
          </div>
        </footer>
      </div>

      <ChatWidget />

      <style>{`
        .page { min-height: 100vh; }

        .container {
          max-width: 1160px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        /* NAV */
        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
        }
        .nav-inner {
          max-width: 1160px;
          margin: 0 auto;
          padding: 0 1.5rem;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 800;
          font-size: 1.125rem;
          color: var(--primary);
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .nav-links a {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-secondary);
          transition: color 0.2s;
        }
        .nav-links a:hover { color: var(--primary); }
        .nav-cta {
          background: var(--primary-gradient) !important;
          color: #fff !important;
          padding: 0.5rem 1.25rem;
          border-radius: 50px;
          font-weight: 600 !important;
          transition: opacity 0.2s !important;
        }
        .nav-cta:hover { opacity: 0.9; }

        /* HERO */
        .hero {
          position: relative;
          overflow: hidden;
          background: linear-gradient(160deg, #f0f4fa 0%, #e8f0fe 50%, #f0f4fa 100%);
          padding: 5rem 0 4rem;
        }
        .hero-bg-shapes { position: absolute; inset: 0; pointer-events: none; }
        .shape {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.35;
        }
        .shape-1 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, #2563eb40, transparent 70%);
          top: -200px; right: -100px;
        }
        .shape-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, #0ea5e940, transparent 70%);
          bottom: -150px; left: -100px;
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 460px;
          gap: 4rem;
          align-items: center;
        }
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(37,99,235,0.1);
          color: var(--primary-light);
          padding: 0.375rem 0.875rem;
          border-radius: 50px;
          font-size: 0.8125rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          border: 1px solid rgba(37,99,235,0.2);
        }
        .badge-dot {
          width: 7px; height: 7px;
          background: var(--primary-light);
          border-radius: 50%;
          animation: pulse 1.5s infinite;
        }
        .hero-content h1 {
          font-size: clamp(2.25rem, 5vw, 3.25rem);
          font-weight: 900;
          line-height: 1.15;
          letter-spacing: -0.03em;
          color: var(--text);
        }
        .hero-highlight {
          background: var(--primary-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-sub {
          font-size: 1.0625rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin: 1.5rem 0;
          max-width: 500px;
        }
        .hero-stats {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .stat { display: flex; flex-direction: column; gap: 0.1rem; }
        .stat-num {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--primary);
          letter-spacing: -0.02em;
        }
        .stat-label { font-size: 0.75rem; color: var(--text-muted); font-weight: 500; }
        .stat-divider { width: 1px; height: 36px; background: var(--border); }
        .hero-trust {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          font-size: 0.8125rem;
          color: var(--text-secondary);
          font-weight: 500;
        }
        .trust-icon { color: var(--success); flex-shrink: 0; }

        .hero-form-card {
          background: var(--surface);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          padding: 2rem;
          border: 1px solid var(--border);
        }
        .form-card-header { margin-bottom: 1.5rem; }
        .form-card-header h2 { font-size: 1.25rem; font-weight: 700; color: var(--text); margin-bottom: 0.25rem; }
        .form-card-header p { font-size: 0.875rem; color: var(--text-muted); }

        /* SECTIONS */
        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .section-header h2 {
          font-size: clamp(1.75rem, 3vw, 2.25rem);
          font-weight: 800;
          color: var(--text);
          letter-spacing: -0.02em;
          margin-bottom: 0.5rem;
        }
        .section-header p { font-size: 1rem; color: var(--text-secondary); }

        /* BENEFITS */
        .benefits-section { padding: 5rem 0; background: var(--surface); }
        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        .benefit-card {
          padding: 2rem 1.5rem;
          border-radius: var(--radius);
          border: 1px solid var(--border);
          background: var(--surface-2);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .benefit-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow);
        }
        .benefit-icon {
          width: 48px; height: 48px;
          border-radius: 12px;
          background: var(--primary-gradient);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          margin-bottom: 1rem;
        }
        .benefit-card h3 { font-size: 1rem; font-weight: 700; color: var(--text); margin-bottom: 0.5rem; }
        .benefit-card p { font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; }

        /* COVERAGES */
        .coverages-section { padding: 5rem 0; background: var(--bg); }
        .coverages-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .coverage-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.25rem;
          background: var(--surface);
          border-radius: var(--radius);
          border: 1px solid var(--border);
          font-weight: 600;
          font-size: 0.9375rem;
          color: var(--text);
          transition: transform 0.2s;
        }
        .coverage-item:hover { transform: translateY(-2px); }
        .coverage-emoji { font-size: 1.5rem; }

        /* HOW IT WORKS */
        .how-section { padding: 5rem 0; background: var(--surface); }
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          position: relative;
        }
        .step-card {
          text-align: center;
          padding: 2rem 1rem;
          position: relative;
        }
        .step-num {
          width: 56px; height: 56px;
          border-radius: 50%;
          background: var(--primary-gradient);
          color: #fff;
          font-size: 1.125rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.25rem;
          box-shadow: 0 4px 14px rgba(37,99,235,0.35);
        }
        .step-arrow {
          position: absolute;
          top: 2rem;
          right: -0.75rem;
          color: var(--text-muted);
          z-index: 1;
        }
        .step-card h3 { font-size: 1rem; font-weight: 700; margin-bottom: 0.5rem; }
        .step-card p { font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; }

        /* TESTIMONIALS */
        .testimonials-section { padding: 5rem 0; background: var(--bg); }
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .testimonial-card {
          background: var(--surface);
          border-radius: var(--radius);
          padding: 2rem;
          border: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .stars { display: flex; gap: 2px; }
        .testimonial-text { font-size: 0.9375rem; color: var(--text-secondary); line-height: 1.7; font-style: italic; flex: 1; }
        .testimonial-author { display: flex; align-items: center; gap: 0.75rem; }
        .author-avatar {
          width: 40px; height: 40px;
          border-radius: 50%;
          background: var(--primary-gradient);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1rem;
          flex-shrink: 0;
        }
        .author-name { font-weight: 700; font-size: 0.875rem; }
        .author-role { font-size: 0.75rem; color: var(--text-muted); }

        /* CTA */
        .cta-section { padding: 4rem 0 5rem; background: var(--surface); }
        .cta-card {
          background: var(--primary-gradient);
          border-radius: var(--radius-lg);
          padding: 4rem 3rem;
          text-align: center;
          color: #fff;
          box-shadow: var(--shadow-lg);
        }
        .cta-card h2 { font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 800; margin-bottom: 0.75rem; }
        .cta-card p { font-size: 1rem; opacity: 0.85; margin-bottom: 2rem; }
        .cta-actions {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
        }
        .cta-card .btn-primary {
          background: #fff;
          color: var(--primary);
          box-shadow: 0 4px 14px rgba(0,0,0,0.15);
        }
        .cta-card .btn-primary:hover { background: #f0f4fa; }
        .cta-contacts {
          display: flex;
          gap: 1.5rem;
        }
        .contact-link {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: rgba(255,255,255,0.9);
          font-size: 0.9rem;
          font-weight: 500;
          transition: color 0.2s;
        }
        .contact-link:hover { color: #fff; }

        /* FOOTER */
        .footer {
          background: var(--text);
          color: rgba(255,255,255,0.6);
          padding: 2.5rem 0;
        }
        .footer .container { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
        .footer-brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #fff;
          font-weight: 800;
          font-size: 1rem;
        }
        .footer-copy { font-size: 0.8125rem; }
        .footer-links { display: flex; gap: 1.5rem; }
        .footer-links a { font-size: 0.8125rem; transition: color 0.2s; }
        .footer-links a:hover { color: #fff; }

        /* Mobile */
        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr; }
          .benefits-grid, .coverages-grid, .steps-grid { grid-template-columns: repeat(2, 1fr); }
          .step-arrow { display: none; }
        }
        @media (max-width: 640px) {
          .hero { padding: 3rem 0 2rem; }
          .benefits-grid, .coverages-grid, .testimonials-grid { grid-template-columns: 1fr; }
          .steps-grid { grid-template-columns: repeat(2, 1fr); }
          .nav-links { display: none; }
          .footer .container { flex-direction: column; text-align: center; }
          .cta-contacts { flex-direction: column; gap: 0.75rem; }
        }
      `}</style>
      <ChatWidget />
    </>
  );
}
