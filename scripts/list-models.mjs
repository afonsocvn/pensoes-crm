import fs from 'fs';
import path from 'path';

async function verifyModels() {
    // Note: We need to extract the key directly from the .env.local string or pass it
    // since process.env doesn't load .env.local automatically in vanilla node

    // Quick and dirty parser for .env
    const envContent = fs.readFileSync('.env.local', 'utf-8');
    const keyLine = envContent.split('\n').find(line => line.startsWith('GOOGLE_GENERATIVE_AI_API_KEY='));
    const API_KEY = keyLine ? keyLine.split('=')[1].trim() : '';

    if (!API_KEY) {
        console.error("No API key found in .env.local");
        return;
    }

    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.models) {
            console.log("Available Models for this API Key:");
            data.models.filter(m => m.supportedGenerationMethods.includes("generateContent")).forEach(m => {
                console.log(`- ${m.name}`);
            });
        } else {
            console.error("Error fetching models:", data);
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

verifyModels();
