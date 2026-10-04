import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import * as leetApi from "./utilities/leetcodeApi.js";
import * as ollamaApi from "./utilities/ollamaApiHelper.js";
import * as geminiApi from "./utilities/geminiApiHelper.js";

dotenv.config({path:path.resolve(process.cwd(),"../.env")});
const FRONTEND_PORT=process.env.FRONTEND_PORT || 5173;

const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10
});

const app=express();

app.use(helmet())
app.use(cors({
    origin: `http://localhost:${FRONTEND_PORT}`, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true 
}));

app.use(express.json({limit:"100kb"}));
app.use(express.urlencoded({extended:true}));


app.post("/api/local",aiLimiter,async (req,res)=>{
    if(req.body.mode=="manual"){
         const { manualCode, language, problemTitle } = req.body;
         try {
        // Feed tokens to Gemma2:2b
        const result = await ollamaApi.generateCodeAnalysisWithOllama(
            manualCode, 
            language, 
            problemTitle
        );
        
        res.status(200).json({ markdown: result, title: problemTitle });
    } catch (error) {
        console.error("Pipeline failure:", error);
        res.status(500).json({ error: "Inference engine failed." });
    }
        
    } else {
            const { username, sessionCookie, questionCount } = req.body;

            try {
                const submissions = await leetApi.getRecentAccepted(username, questionCount);
                let notes = "";
                
                // Protect against requesting more submissions than the user actually has
                const actualCount = Math.min(questionCount, submissions.length);
                
                // Hoist a title variable outside the loop's block scope to fix the ReferenceError
                let singleProblemTitle = "";

                for (let i = 0; i < actualCount; i++) {
                    const data = await leetApi.getRecentSubmissionCode(submissions[i].id, sessionCookie);
                    
                    // Capture the title safely for the edge case where actualCount === 1
                    if (i === 0) singleProblemTitle = data.submissionDetails.question.title;

                    // Feed tokens to Gemma2:2b sequentially to protect 8GB VRAM
                    const result = await ollamaApi.generateCodeAnalysisWithOllama(
                        data.submissionDetails.code,
                        data.submissionDetails.lang.name,
                        data.submissionDetails.question.title
                    );

                    notes += `\n --- \n${result}\n`;
                }

                const finalTitle = actualCount === 1 ? singleProblemTitle : "combined notes";
                
                // Single, guaranteed HTTP response point
                return res.status(200).json({ markdown: notes, title: finalTitle });

            } catch (error) {
                console.error("Pipeline failure:", error);
                // Explicit return prevents continuing execution and double-header errors
                return res.status(500).json({ error: "Data extraction or inference engine failed." });
            }
    }
});

app.post("/api/cloud",aiLimiter,async (req,res)=>{
    if(req.body.mode=="manual"){
         const { manualCode, language, problemTitle } = req.body;
         try {
        // Feed tokens to Gemma2:2b
        // const result = await ollamaApi.generateCodeAnalysisWithOllama(
        //     manualCode, 
        //     language, 
        //     problemTitle
        // );

        const result=await geminiApi.generateCodeAnalysis(manualCode,language,problemTitle)
        
        res.status(200).json({ markdown: result, title: problemTitle });
    } catch (error) {
        console.error("Pipeline failure:", error);
        res.status(500).json({ error: "Inference engine failed." });
    }
        
    }else{
            const { username, sessionCookie, questionCount } = req.body;

            try {
                const submissions = await leetApi.getRecentAccepted(username, questionCount);
                let notes = "";
                
                // Protect against requesting more submissions than the user actually has
                const actualCount = Math.min(questionCount, submissions.length);
                
                // Hoist a title variable outside the loop's block scope to fix the ReferenceError
                let singleProblemTitle = "";

                for (let i = 0; i < actualCount; i++) {
                    const data = await leetApi.getRecentSubmissionCode(submissions[i].id, sessionCookie);
                    
                    // Capture the title safely for the edge case where actualCount === 1
                    if (i === 0) singleProblemTitle = data.submissionDetails.question.title;

                    // Feed tokens to Gemma2:2b sequentially to protect 8GB VRAM
                    // const result = await ollamaApi.generateCodeAnalysisWithOllama(
                    //     data.submissionDetails.code,
                    //     data.submissionDetails.lang.name,
                    //     data.submissionDetails.question.title
                    // );

                    const result=await geminiApi.generateCodeAnalysis(
                        data.submissionDetails.code,
                        data.submissionDetails.lang.name,
                        data.submissionDetails.question.title
                    );

                    notes += `\n --- \n${result}\n`;
                }

                const finalTitle = actualCount === 1 ? singleProblemTitle : "combined notes";
                
                // Single, guaranteed HTTP response point
                return res.status(200).json({ markdown: notes, title: finalTitle });

            } catch (error) {
                console.error("Pipeline failure:", error);
                // Explicit return prevents continuing execution and double-header errors
                return res.status(500).json({ error: "Data extraction or inference engine failed." });
            }
    }
});


app.listen(process.env.BACKEND_PORT,()=>{
    console.log("Backen server running on port "+ process.env.BACKEND_PORT);
});


