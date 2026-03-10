import { NextRequest, NextResponse } from 'next/server';
import { getModel } from '@/lib/gemini';
import { supabase } from '@/lib/supabase';
import { SchemaType } from '@google/generative-ai';

export async function POST(req: NextRequest) {
    try {
        const { message, history, sessionId, contactInfo } = await req.json();

        // Allow empty message if it's a lead submission
        if (!message && !contactInfo) {
            return NextResponse.json({ error: 'Message or contact info is required' }, { status: 400 });
        }

        const currentSessionId = sessionId || crypto.randomUUID();
        const model = getModel();

        // Define the Function Declaration for lead capture
        const tools: any = [{
            functionDeclarations: [
                {
                    name: "capture_lead",
                    description: "Saves a user's contact details when they express interest in a quote, simulation, or speaking to a consultant.",
                    parameters: {
                        type: SchemaType.OBJECT,
                        properties: {
                            nome: { type: SchemaType.STRING, description: "O nome do utilizador." },
                            email: { type: SchemaType.STRING, description: "O email do utilizador." },
                            telefone: { type: SchemaType.STRING, description: "O telefone do utilizador (opcional)." },
                            empresa: { type: SchemaType.STRING, description: "O nome da empresa ou 'Particular' se não aplicável." }
                        },
                        required: ["nome", "email", "empresa"]
                    }
                }
            ]
        }];

        // Start Chat with History
        const chat = model.startChat({
            history: history || [],
            tools: tools
        });

        let chatMessage = message;
        if (contactInfo && !message) {
            chatMessage = `Sistema: O utilizador enviou o formulário de contacto com os seguintes dados: Nome: ${contactInfo.nome}, Email: ${contactInfo.email}. Agradece e informa que um gestor entrará em contacto em breve.`;
        } else if (contactInfo) {
            chatMessage = `${message}\n\n[Sistema: O utilizador também anexou os seus dados: Nome: ${contactInfo.nome}, Email: ${contactInfo.email}]`;
        }

        // Send Message
        const result = await chat.sendMessage(chatMessage);
        const response = result.response;

        let replyText = '';
        let leadCaptured = !!contactInfo;
        let finalContactInfo = contactInfo ? JSON.stringify(contactInfo) : null;

        // Save Lead from Frontend Form Data gracefully if provided
        if (contactInfo) {
            const { error: frontendLeadError } = await supabase.from('leads').insert({
                nome: contactInfo.nome,
                email: contactInfo.email,
                telefone: contactInfo.telefone || null,
                empresa: contactInfo.empresa || contactInfo.dimensao || 'Através do Formulário Chat',
                dimensao: contactInfo.dimensao || 'Não definido',
                estado: 'Novo'
            });
            if (frontendLeadError) console.error("Error saving lead from frontend form:", frontendLeadError);
        }

        // Check if the model decided to call the function via conversational intent
        const functionCall = response.functionCalls()?.[0];

        if (functionCall && functionCall.name === "capture_lead") {
            const args = functionCall.args as any;

            // Save to Leads Table
            const { error: leadError } = await supabase.from('leads').insert({
                nome: args.nome,
                email: args.email,
                telefone: args.telefone || null,
                empresa: args.empresa || 'Através do Chat',
                dimensao: 'Não definido',
                estado: 'Novo'
            });

            if (leadError) console.error("Error saving lead from chat function:", leadError);

            leadCaptured = true;
            finalContactInfo = JSON.stringify({ nome: args.nome, email: args.email, telefone: args.telefone });

            // Return function response back to the model to get the final text response
            const functionResponseResult = await chat.sendMessage([{
                functionResponse: {
                    name: "capture_lead",
                    response: {
                        name: "capture_lead",
                        content: { success: true, message: "Lead guardado com sucesso no CRM." }
                    }
                }
            }]);

            replyText = functionResponseResult.response.text();
        } else {
            replyText = response.text();
        }

        // Determine basic intent/status
        let estado = 'Dúvida Geral';
        const textLower = message.toLowerCase();
        if (textLower.includes('simulação') || textLower.includes('preço') || textLower.includes('comprar')) {
            estado = 'Interessado';
        } else if (textLower.includes('reclama') || textLower.includes('péssimo') || textLower.includes('problema')) {
            estado = 'Reclamação';
        }

        // Update Session Log using Upsert
        const fullTranscript = [...(history || []), { role: 'user', parts: [{ text: message }] }, { role: 'model', parts: [{ text: replyText }] }];

        // Clean up transcript for Supabase (keep only text, not function chunks)
        const cleanTranscript = fullTranscript.map(t => ({
            role: t.role === 'model' ? 'assistant' : 'user',
            content: t.parts[0].text
        }));

        const updateData: any = {
            id: currentSessionId,
            estado,
            transcript: cleanTranscript
        };

        if (leadCaptured) {
            updateData.lead_capturado = true;
            updateData.contacto = finalContactInfo;
        }

        await supabase.from('chat_sessions').upsert(updateData);

        return NextResponse.json({
            reply: replyText,
            sessionId: currentSessionId
        });

    } catch (error) {
        console.error('Chat API error:', error);
        return NextResponse.json(
            { error: 'Ocorreu um erro ao processar a sua mensagem.' },
            { status: 500 }
        );
    }
}
