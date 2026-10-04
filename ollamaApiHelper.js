import {code,lang,question} from "./leetcodeApi.js"

const OLLAMA_BASE_URL = 'http://localhost:8080';

async function generateCodeAnalysisWithOllama(rawCode, language, questionTitle) {
    const prompt = `
        Analyze this ${language} solution for "${questionTitle}".
        Focus on algorithmic mechanics and asymptotic analysis:
        1. State the Big-O time and space complexity with a brief mathematical justification.
        2. If dynamic programming or recursion is used, define the explicit recurrence relation (e.g., T(n) = T(n-1) + O(1)).
        3. Provide a concise, bulleted breakdown of the core technique used.
        4. Output everything in clean Markdown.

        Code:
        ${rawCode}
        `;

    try {
        const response = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'qwen3:4b', 
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert algorithms and data structures analyst. Be direct, mathematically rigorous, and avoid conversational fluff.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                stream: false, // Disables streaming chunks; returns a single JSON object once inference finishes
                options: {
                    temperature: 0.2,
                    num_predict: 400 // Lower entropy for consistent and deterministic algorithmic analysis
                }
            })
        });

        if (!response.ok) {
            throw new Error(`Ollama HTTP Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.message.content;
    } catch (error) {
        console.error("Local Inference Request Failed:", error);
        throw error;
    }
}

const modelResponse=await generateCodeAnalysisWithOllama(code,lang,question);
