import { GoogleGenAI, Chat } from "@google/genai";

if (!process.env.API_KEY) {
  // In a real app, you might want to handle this more gracefully,
  // maybe disable the chat feature. For this example, we'll throw an error.
  console.warn("API_KEY environment variable not set. Chatbot will not work.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const systemInstruction = `You are an AI assistant designed for emergency situations. Your primary goal is to provide clear, calm, and concise instructions.
- Your responses will be rendered directly as HTML. Use simple HTML tags for formatting, such as <strong> for bold text, and <ul> with <li> for lists. Do not use markdown.
- Prioritize user safety above all else.
- Do NOT provide medical advice. Instead, guide users on first aid basics and strongly advise them to contact professional emergency services.
- Keep your responses short and to the point, using simple language.
- If a situation sounds life-threatening, your first instruction should always be to call their local emergency number (e.g., 911, 112, 999).
- You are a guide, not a replacement for a professional. Make this clear.
`;

let chat: Chat | null = null;

const getChat = (): Chat => {
  if (!chat) {
    chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction,
      },
    });
  }
  return chat;
};

export const sendMessageToAI = async (message: string): Promise<string> => {
   if (!process.env.API_KEY) {
     return "The AI Chatbot is currently unavailable because the API key is not configured.";
   }
  try {
    const chatSession = getChat();
    const result = await chatSession.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    return "I'm sorry, I'm having trouble connecting right now. Please try again later. If this is an emergency, please call your local emergency number immediately.";
  }
};