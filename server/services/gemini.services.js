import { GoogleGenAI } from "@google/genai";

export const askAi = async (messages) => {
    try {
        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            throw new Error("Invalid messages array");
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error("GEMINI_API_KEY is missing from environment variables.");
        }

        // Strictly using the pattern from your docs:
        const ai = new GoogleGenAI({ apiKey });

        // Convert messages to a single prompt
        const prompt = messages.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join("\n\n");

        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt
        });

        const text = response.text;

        if (!text || !text.trim()) {
            throw new Error("No content received from Gemini");
        }

        return text;
    } catch (error) {
        console.error("Gemini SDK Error:", error);

        if (error.message?.includes("API key not valid") || error.status === 401 || error.status === 403) {
            throw new Error("Gemini Authentication Failed: The API key provided in .env is invalid. Please double-check it at Google AI Studio.");
        }

        throw new Error(error.message || "Failed to get response from Gemini AI");
    }
}
