import Link from 'next/link';
import { CheckCircle, Landmark, ArrowLeft } from 'lucide-react';

export default function ThanksPage() {
  return (
    <div className="thanks-page">
      <div className="thanks-card">
        <div className="thanks-logo">
          <Landmark size={28} />
          <span>GestãoPensões</span>
        </div>
        <div className="icon-circle">
          <CheckCircle size={56} strokeWidth={1.5} />
        </div>
        <h1>Obrigado pelo seu interesse!</h1>
        <p className="thanks-message">
          Recebemos o seu pedido de simulação de reforma. A nossa equipa vai analisar
          o seu perfil e entrar em contacto <strong>em menos de 2 horas</strong>.
        </p>
        <div className="thanks-steps">
          {[
            { num: '1', text: 'Receberá um email de confirmação em breve.' },
            { num: '2', text: 'Receberá uma proposta de plano de pensões personalizado.' },
          ].map(s => (
            <div key={s.num} className="thanks-step">
              <div className="step-badge">{s.num}</div>
              <span>{s.text}</span>
            </div>
          ))}
        </div>
        <Link href="/" className="btn-primary back-btn">
          <ArrowLeft size={18} /> Voltar ao Início
        </Link>
      </div>

      <style>{`
        .thanks-page {
          min-height: 100vh;
          background: linear-gradient(160deg, #f0f4fa 0%, #e8f0fe 50%, #f0f4fa 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        .thanks-card {
          background: var(--surface);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          padding: 3rem 2.5rem;
          max-width: 500px;
          width: 100%;
          text-align: center;
          border: 1px solid var(--border);
          animation: fadeInUp 0.5s ease;
        }
        .thanks-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-weight: 800;
          font-size: 1.125rem;
          color: var(--primary);
          margin-bottom: 2rem;
        }
        .icon-circle {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: linear-gradient(135deg, #d1fae5, #a7f3d0);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--success);
          margin: 0 auto 1.5rem;
        }
        .thanks-card h1 {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text);
          margin-bottom: 0.75rem;
          letter-spacing: -0.02em;
        }
        .thanks-message {
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 2rem;
          font-size: 0.9375rem;
        }
        .thanks-steps {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          text-align: left;
          margin-bottom: 2rem;
          padding: 1.25rem;
          background: var(--surface-2);
          border-radius: var(--radius);
          border: 1px solid var(--border);
        }
        .thanks-step {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }
        .step-badge {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--primary-gradient);
          color: #fff;
          font-size: 0.75rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .back-btn {
          width: 100%;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}
