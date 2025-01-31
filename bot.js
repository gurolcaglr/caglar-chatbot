import { OpenAI } from 'openai';
import { config } from './config.js';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });  // API key artık .env dosyasından gelecek

// ... geri kalan kod aynı kalacak

const chatbot = async (userMessage) => {
    try {
        // Hazır yanıtlar kontrolü
        const lowerMessage = userMessage.toLowerCase();
        for (const [keyword, response] of Object.entries(preparedResponses)) {
            if (lowerMessage.includes(keyword)) {
                return response;
            }
        }

        // OpenAI yanıtı
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `You are a professional representative of ${config.companyInfo.name}, a web design agency based in London. Provide detailed, helpful responses while maintaining a professional tone.`
                },
                {
                    role: "user",
                    content: userMessage
                }
            ]
        });

        return completion.choices[0].message.content;
    } catch (error) {
        console.error('Error:', error);
        return `I apologize, but I encountered an issue. Please contact us at ${config.companyInfo.email}`;
    }
};

export default chatbot;