'use client';

import { useState, useId } from 'react';
import { supabase } from '@/lib/supabase';
import { CheckCircle, AlertCircle, Loader2, ArrowRight, Landmark } from 'lucide-react';

interface FormData {
    nome: string;
    email: string;
    empresa: string;
    telefone: string;
    dimensao: string;
    tipoCliente: 'Individual' | 'Empresa' | '';
}

interface FieldState {
    valid: boolean | null;
    error: string;
}

const dimensaoOptions = [
    { value: '', label: 'Selecione a dimensão da empresa...' },
    { value: 'Empresa (1-10)', label: 'Empresa (1-10 pessoas)' },
    { value: 'Empresa (11-50)', label: 'Empresa (11-50 pessoas)' },
    { value: 'Empresa (50-100)', label: 'Empresa (50-100 pessoas)' },
    { value: 'Empresa (100+)', label: 'Empresa (+100 pessoas)' },
];

function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function LeadForm() {
    const formId = useId();
    const [form, setForm] = useState<FormData>({
        nome: '', email: '', empresa: '', telefone: '', dimensao: '', tipoCliente: '',
    });
    const [fields, setFields] = useState<Record<keyof FormData, FieldState>>({
        nome: { valid: null, error: '' },
        email: { valid: null, error: '' },
        empresa: { valid: null, error: '' },
        telefone: { valid: null, error: '' },
        dimensao: { valid: null, error: '' },
        tipoCliente: { valid: null, error: '' },
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState('');

    function validate(name: keyof FormData, value: string): FieldState {
        switch (name) {
            case 'nome':
                return value.trim().length >= 2
                    ? { valid: true, error: '' }
                    : { valid: false, error: 'Vamos adicionar o seu nome completo' };
            case 'email':
                return validateEmail(value)
                    ? { valid: true, error: '' }
                    : { valid: false, error: 'Vamos adicionar um email válido (ex: nome@empresa.com)' };
            case 'empresa':
                if (form.tipoCliente === 'Empresa') {
                    return value.trim().length >= 2
                        ? { valid: true, error: '' }
                        : { valid: false, error: 'Insira o nome da sua empresa' };
                }
                return { valid: true, error: '' };
            case 'dimensao':
                if (form.tipoCliente === 'Empresa') {
                    return value !== ''
                        ? { valid: true, error: '' }
                        : { valid: false, error: 'Selecione uma opção' };
                }
                return { valid: true, error: '' };
            case 'tipoCliente':
                return value !== ''
                    ? { valid: true, error: '' }
                    : { valid: false, error: 'Selecione o seu perfil' };
            case 'telefone':
                if (!value) return { valid: null, error: '' };
                return /^[0-9+\s-]{9,}$/.test(value)
                    ? { valid: true, error: '' }
                    : { valid: false, error: 'Número de telefone inválido' };
            default:
                return { valid: null, error: '' };
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        if (name === 'tipoCliente') {
            // Reset dependent fields when switching type
            const newValue = value as 'Individual' | 'Empresa' | '';
            setForm(prev => ({ ...prev, [name]: newValue, empresa: '', dimensao: newValue === 'Individual' ? 'Individual' : '' }));
            setFields(prev => ({
                ...prev,
                [name]: validate('tipoCliente', value),
                empresa: { valid: null, error: '' },
                dimensao: { valid: null, error: '' },
            }));
            return;
        }

        setForm(prev => ({ ...prev, [name]: value }));
        if (fields[name as keyof FormData].valid !== null) {
            setFields(prev => ({ ...prev, [name]: validate(name as keyof FormData, value) }));
        }
    }

    function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setFields(prev => ({ ...prev, [name]: validate(name as keyof FormData, value) }));
    }

    const isFormValid =
        fields.nome.valid === true &&
        fields.email.valid === true &&
        fields.empresa.valid === true &&
        fields.dimensao.valid === true &&
        fields.tipoCliente.valid === true;

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        // Validate all required fields
        const updatedFields = { ...fields };
        (['nome', 'email', 'empresa', 'dimensao', 'tipoCliente'] as const).forEach(f => {
            updatedFields[f] = validate(f, form[f]);
        });
        setFields(updatedFields);
        const allValid = (['nome', 'email', 'empresa', 'dimensao', 'tipoCliente'] as const).every(
            f => updatedFields[f].valid === true
        );
        if (!allValid) return;

        setSubmitting(true);
        setSubmitError('');

        try {
            const { error } = await supabase.from('leads').insert([{
                nome: form.nome,
                email: form.email,
                empresa: form.tipoCliente === 'Individual' ? 'Particular' : form.empresa,
                telefone: form.telefone || null,
                dimensao: form.tipoCliente === 'Individual' ? 'Individual' : form.dimensao,
                estado: 'Novo',
            }]);

            if (error) throw error;
            setSubmitted(true);
            setTimeout(() => { window.location.href = '/thanks'; }, 3000);
        } catch {
            setSubmitError('Ocorreu um erro ao enviar. Por favor tente novamente.');
        } finally {
            setSubmitting(false);
        }
    }

    if (submitted) {
        return (
            <div className="form-success">
                <div className="success-icon">
                    <CheckCircle size={48} strokeWidth={1.5} />
                </div>
                <h3>Obrigado!</h3>
                <p>Entraremos em contacto em menos de 2 horas.</p>
                <p className="success-redirect">A redirecionar...</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="lead-form" noValidate>
            <div className="profile-selector">
                <p className="profile-title">O que procura?</p>
                <div className="profile-options">
                    <button
                        type="button"
                        className={`profile-btn ${form.tipoCliente === 'Individual' ? 'active' : ''}`}
                        onClick={() => handleChange({ target: { name: 'tipoCliente', value: 'Individual' } } as unknown as React.ChangeEvent<HTMLInputElement>)}
                    >
                        Plano individual
                    </button>
                    <button
                        type="button"
                        className={`profile-btn ${form.tipoCliente === 'Empresa' ? 'active' : ''}`}
                        onClick={() => handleChange({ target: { name: 'tipoCliente', value: 'Empresa' } } as unknown as React.ChangeEvent<HTMLInputElement>)}
                    >
                        Plano Empresa
                    </button>
                </div>
                {fields.tipoCliente.valid === false && (
                    <span className="field-error" style={{ justifyContent: 'center', marginTop: '8px' }}>
                        <AlertCircle size={13} />
                        {fields.tipoCliente.error}
                    </span>
                )}
            </div>

            {form.tipoCliente && (
                <div className="animate-fadeInUp" style={{ animationDuration: '0.4s', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <FieldGroup
                        id={`${formId}-nome`}
                        label="Nome completo"
                        required
                        field={fields.nome}
                    >
                        <input
                            id={`${formId}-nome`}
                            name="nome"
                            type="text"
                            placeholder="João Silva"
                            value={form.nome}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={getInputClass(fields.nome)}
                            autoComplete="name"
                        />
                    </FieldGroup>

                    <FieldGroup
                        id={`${formId}-email`}
                        label="Email pessoal ou profissional"
                        required
                        field={fields.email}
                    >
                        <input
                            id={`${formId}-email`}
                            name="email"
                            type="email"
                            placeholder="joao@empresa.com"
                            value={form.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={getInputClass(fields.email)}
                            autoComplete="email"
                        />
                    </FieldGroup>

                    {form.tipoCliente === 'Empresa' && (
                        <>
                            <FieldGroup
                                id={`${formId}-empresa`}
                                label="Nome da Empresa"
                                required
                                field={fields.empresa}
                            >
                                <input
                                    id={`${formId}-empresa`}
                                    name="empresa"
                                    type="text"
                                    placeholder="Nome da sua empresa"
                                    value={form.empresa}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={getInputClass(fields.empresa)}
                                    autoComplete="organization"
                                />
                            </FieldGroup>

                            <FieldGroup
                                id={`${formId}-dimensao`}
                                label="Dimensão"
                                required
                                field={fields.dimensao}
                            >
                                <div className="select-wrapper">
                                    <select
                                        id={`${formId}-dimensao`}
                                        name="dimensao"
                                        value={form.dimensao}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={getInputClass(fields.dimensao)}
                                    >
                                        {dimensaoOptions.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </FieldGroup>
                        </>
                    )}

                    {submitError && (
                        <div className="submit-error">
                            <AlertCircle size={16} />
                            {submitError}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn-primary submit-btn"
                        disabled={submitting}
                        id="lead-form-submit"
                    >
                        {submitting ? (
                            <><Loader2 size={18} className="spinner" /> A enviar...</>
                        ) : (
                            <><Landmark size={18} /> Simular o meu Plano de Pensões <ArrowRight size={18} /></>
                        )}
                    </button>

                    <p className="form-disclaimer">
                        <span>🔒</span> Os seus dados estão seguros e em conformidade com o RGPD.
                        <strong>Entraremos em contacto em menos de 2 horas.</strong>
                    </p>
                </div>
            )}

            <style>{`
        .lead-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .profile-selector {
          background: #f8fafc;
          padding: 1rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
          text-align: center;
        }
        .profile-title {
          font-weight: 600;
          color: var(--text);
          margin-bottom: 0.75rem;
          font-size: 0.9375rem;
        }
        .profile-options {
          display: flex;
          gap: 0.5rem;
        }
        .profile-btn {
          flex: 1;
          padding: 0.75rem;
          border: 1px solid var(--border);
          background: white;
          border-radius: var(--radius);
          font-weight: 500;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s;
        }
        .profile-btn:hover {
          border-color: var(--primary-light);
          background: #f0f4fa;
        }
        .profile-btn.active {
          background: var(--primary-light);
          color: white;
          border-color: var(--primary);
          box-shadow: 0 2px 8px rgba(37, 99, 235, 0.2);
        }
        .field-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .field-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        .field-label .required-dot {
          color: var(--error);
          font-size: 1.1rem;
          line-height: 1;
        }
        .field-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        .field-input {
          width: 100%;
          padding: 0.875rem 1rem;
          border: 2px solid var(--border);
          border-radius: var(--radius);
          font-size: 1rem;
          color: var(--text);
          background: var(--surface);
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
          appearance: none;
        }
        .field-input:focus {
          border-color: var(--primary-light);
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }
        .field-input.valid { border-color: var(--success); padding-right: 2.75rem; }
        .field-input.invalid { border-color: var(--error); padding-right: 2.75rem; }
        select.field-input { cursor: pointer; padding-right: 2.75rem; }
        .select-wrapper { position: relative; }
        .select-wrapper::after {
          content: '';
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 6px solid var(--text-secondary);
          pointer-events: none;
        }
        .field-icon {
          position: absolute;
          right: 0.875rem;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
        }
        .field-error {
          font-size: 0.8125rem;
          color: var(--error);
          display: flex;
          align-items: center;
          gap: 0.375rem;
          animation: fadeIn 0.2s ease;
        }
        .submit-btn {
          width: 100%;
          justify-content: center;
          padding: 1rem 2rem;
          font-size: 1.0625rem;
          margin-top: 0.5rem;
        }
        .spinner { animation: spin 0.8s linear infinite; }
        .submit-error {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: var(--radius);
          color: var(--error);
          font-size: 0.875rem;
        }
        .form-disclaimer {
          text-align: center;
          font-size: 0.8125rem;
          color: var(--text-muted);
          line-height: 1.5;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
        }
        .form-success {
          text-align: center;
          padding: 3rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          animation: fadeInUp 0.5s ease;
        }
        .success-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #d1fae5, #a7f3d0);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--success);
        }
        .form-success h3 { font-size: 1.5rem; font-weight: 700; color: var(--text); }
        .form-success p { color: var(--text-secondary); }
        .success-redirect { font-size: 0.875rem; color: var(--text-muted); }
      `}</style>
        </form>
    );
}

function getInputClass(field: FieldState): string {
    if (field.valid === true) return 'field-input valid';
    if (field.valid === false) return 'field-input invalid';
    return 'field-input';
}

function FieldGroup({
    id, label, required, field, children
}: {
    id: string;
    label: string;
    required?: boolean;
    field: FieldState;
    children: React.ReactNode;
}) {
    return (
        <div className="field-group">
            <label htmlFor={id} className="field-label">
                {label}
                {required && <span className="required-dot">*</span>}
            </label>
            <div className="field-input-wrapper">
                {children}
                {field.valid === true && (
                    <span className="field-icon" style={{ color: 'var(--success)' }}>
                        <CheckCircle size={18} />
                    </span>
                )}
                {field.valid === false && (
                    <span className="field-icon" style={{ color: 'var(--error)' }}>
                        <AlertCircle size={18} />
                    </span>
                )}
            </div>
            {field.valid === false && field.error && (
                <span className="field-error">
                    <AlertCircle size={13} />
                    {field.error}
                </span>
            )}
        </div>
    );
}
