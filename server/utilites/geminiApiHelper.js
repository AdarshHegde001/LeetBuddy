import { GoogleGenAI } from '@google/genai';
import path from "path";
import {code,lang,question} from "./leetcodeApi.js";
import dotenv from "dotenv";


dotenv.config({path:path.resolve(process.cwd(),"../../.env")});


const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});

async function generateCodeAnalysis(rawCode, language, questionTitle) {
    const prompt = `
    Analyze this ${language} solution for "${questionTitle}".
    Bypass basic definitions. Focus on the mathematical mechanics:
    1. Calculate the strict Big-O time and space complexity based on loop structures and memory allocations.
    2. If the solution utilizes dynamic programming or recursion, state the explicit recurrence relation or state transition equation (e.g., T(n) = aT(n/b) + f(n)).
    3. Output the final analysis in pure Markdown.
    
    Code:
    ${rawCode}
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3.5-flash-lite', // Targeting the instruction-tuned open-weight Gemma model
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




