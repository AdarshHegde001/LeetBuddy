import { GoogleGenAI } from '@google/genai';
import path from "path";
import dotenv from "dotenv";


dotenv.config({path:path.resolve(process.cwd(),"../../.env")});




export async function generateCodeAnalysis(rawCode, language, questionTitle) {

    const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});

    const prompt = `
        # Persona
        Act as a senior theoretical computer science instructor.

        # Context
        Language: ${language}
        Problem: "${questionTitle}"
        Code:
        ${rawCode}

        # Task
        Calculate the strict Big-O time and space complexity based on loop structures and memory allocations. If the solution utilizes dynamic programming or recursion, state the explicit recurrence relation.

        # Formatting Rules
        - Use pure Markdown.
        - Write all mathematical notations and variables strictly in standard plaintext.
        - Use a standard capital "O" with normal parentheses for Big-O notation.

        # Example Format
        ### 1. Big-O Time and Space Complexity
        * **Time Complexity:** O(N^2)
        * The outer loop runs N times from i = 0 to N.
        * **Space Complexity:** O(N)
        * The monotonic stack requires O(N) auxiliary space in the worst case.

        Analyze this ${language} solution for "${questionTitle}".
        Bypass basic definitions. Focus on the mathematical mechanics:
        1. Calculate the strict Big-O time and space complexity based on loop structures and memory allocations.
        2. If the solution utilizes dynamic programming or recursion, state the explicit recurrence relation or state transition equation (e.g., T(N) = aT(N/b) + O(N)).
        3. Output the final analysis in pure Markdown.
        
        `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3.5-flash', // Targeting the instruction-tuned open-weight Gemma model
            contents: prompt,
            config: {
                temperature: 0.1, 
            }
        });
        
        return response.text;
    } catch (error) {
        console.error("Inference Engine Failed:", error);
    }
}




