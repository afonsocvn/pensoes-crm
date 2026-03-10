'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Minimize2, Check, User, Bot, Loader2 } from 'lucide-react';

type Message = {
    role: 'user' | 'assistant';
    content: string;
};

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: 'Olá! Sou o seu Consultor Virtual. Como posso ajudar a maximizar a sua poupança para a reforma hoje? Procure uma simulação ou fale comigo sobre os nossos fundos PPR.' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState<string>('');

    // Lead Capture State
    const [showLeadForm, setShowLeadForm] = useState(false);
    const [leadForm, setLeadForm] = useState({ nome: '', email: '', telefone: '' });
    const [leadSent, setLeadSent] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen, showLeadForm]);

    const toggleChat = () => {
        setIsOpen(!isOpen);
        setIsMinimized(false);
    };

    const handleSend = async (e?: React.FormEvent, customContactInfo?: any) => {
        if (e) e.preventDefault();
        if (!input.trim() && !customContactInfo) return;

        const userMessage = input.trim();
        if (userMessage) {
            setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
            setInput('');
        }

        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage,
                    history: messages
                        .filter((m, i) => !(i === 0 && m.role === 'assistant'))
                        .map(m => ({
                            role: m.role === 'assistant' ? 'model' : 'user',
                            parts: [{ text: m.content || '' }]
                        })),
                    sessionId,
                    contactInfo: customContactInfo || null,
                }),
            });

            if (!response.ok) throw new Error('API Error');

            const data = await response.json();
            if (data.sessionId && !sessionId) {
                setSessionId(data.sessionId);
            }

            setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);

            // Basic lead prompt heuristic if they seem very interested and haven't sent form
            if (!leadSent && !showLeadForm && data.reply && (data.reply.toLowerCase().includes('contacto') || data.reply.toLowerCase().includes('simulação'))) {
                setShowLeadForm(true);
            }

        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', content: 'Desculpe, ocorreu um erro na ligação. Por favor tente novamente.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLeadSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!leadForm.nome || !leadForm.email) return;
        setLeadSent(true);
        setShowLeadForm(false);
        handleSend(undefined, leadForm);
    };

    // Convert simple markdown-like strong/links to basic tags safely
    const formatText = (text?: string) => {
        if (!text) return '';
        // Basic bold
        let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // Basic newlines
        formatted = formatted.replace(/\n/g, '<br/>');
        return formatted;
    };

    return (
        <>
            {!isOpen ? (
                <button className="chat-launcher" onClick={toggleChat} aria-label="Abrir Chat">
                    <MessageCircle size={28} />
                    <span className="launch-text">Precisa de ajuda?</span>
                </button>
            ) : (
                <div className={`chat-window ${isMinimized ? 'minimized' : ''}`}>
                    {/* Header */}
                    <div className="chat-header" onClick={() => setIsMinimized(!isMinimized)}>
                        <div className="chat-title">
                            <div className="status-dot" />
                            <span>Consultor GestãoPensões</span>
                        </div>
                        <div className="chat-actions">
                            <button onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }} aria-label="Minimizar">
                                <Minimize2 size={18} />
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} aria-label="Fechar">
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Body */}
                    {!isMinimized && (
                        <>
                            <div className="chat-body">
                                {messages.map((msg, idx) => (
                                    <div key={idx} className={`message-row ${msg.role}`}>
                                        <div className="message-avatar">
                                            {msg.role === 'assistant' ? <Bot size={18} /> : <User size={18} />}
                                        </div>
                                        <div className="message-bubble">
                                            <span dangerouslySetInnerHTML={{ __html: formatText(msg.content) }} />
                                        </div>
                                    </div>
                                ))}

                                {showLeadForm && !leadSent && (
                                    <div className="lead-capture-card">
                                        <p className="lead-capture-title">Deixe o seu contacto para agilizarmos a sua simulação:</p>
                                        <form onSubmit={handleLeadSubmit} className="lead-capture-form">
                                            <input
                                                type="text"
                                                placeholder="Nome completo *"
                                                value={leadForm.nome}
                                                onChange={(e) => setLeadForm({ ...leadForm, nome: e.target.value })}
                                                required
                                            />
                                            <input
                                                type="email"
                                                placeholder="Email *"
                                                value={leadForm.email}
                                                onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                                                required
                                            />
                                            <input
                                                type="tel"
                                                placeholder="Telefone"
                                                value={leadForm.telefone}
                                                onChange={(e) => setLeadForm({ ...leadForm, telefone: e.target.value })}
                                            />
                                            <button type="submit" className="btn-primary" style={{ padding: '0.5rem', width: '100%', borderRadius: '8px' }}>
                                                Enviar Contacto
                                            </button>
                                        </form>
                                    </div>
                                )}

                                {leadSent && (
                                    <div className="lead-success-msg">
                                        <Check size={16} /> Contacto enviado com sucesso!
                                    </div>
                                )}

                                {isLoading && (
                                    <div className="message-row assistant">
                                        <div className="message-avatar"><Bot size={18} /></div>
                                        <div className="message-bubble typing">
                                            <div className="dot"></div><div className="dot"></div><div className="dot"></div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Chips */}
                            {messages.length === 1 && (
                                <div className="chat-chips">
                                    {['Quero simular o meu PPR', 'Como transferir o meu fundo?', 'Dúvidas sobre o benefício fiscal'].map(chip => (
                                        <button
                                            key={chip}
                                            className="chip"
                                            onClick={() => {
                                                setInput(chip);
                                                setTimeout(() => document.getElementById('chat-form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true })), 50);
                                            }}
                                        >
                                            {chip}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Input */}
                            <form id="chat-form" onSubmit={handleSend} className="chat-footer">
                                <input
                                    type="text"
                                    placeholder="Escreva a sua mensagem..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    disabled={isLoading}
                                />
                                <button type="submit" disabled={!input.trim() || isLoading} className="send-btn">
                                    {isLoading ? <Loader2 size={18} className="spinner" /> : <Send size={18} />}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            )}
        </>
    );
}
