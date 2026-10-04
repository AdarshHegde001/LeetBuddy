# 🧠 LeetBuddy

Automated algorithmic note-taking. LeetBuddy extracts your accepted LeetCode submissions and feeds the syntax tokens into local or cloud inference engines to generate rigorous Big-O complexity analyses, recurrence relations, and methodology breakdowns. 

Built for Hacktoberfest 2026.

## 🚀 Core Architecture

LeetBuddy operates on a dynamic machine learning pipeline, abstracting model execution based on your hardware constraints:

*   **Edge Compute (Ollama):** Run zero-latency, private inference locally using lightweight models like `gemma2:2b` or `phi3`. Optimized specifically to prevent Out-Of-Memory (OOM) kernel panics on 8GB Unified Memory machines.
*   **Cloud Compute (Gemini):** Route context tokens over the network to Google's tensor processing clusters via the Gemini API when running on resource-constrained devices or remote cloud deployments.
*   **Stateless Extraction Proxy:** Securely queries LeetCode's undocumented GraphQL endpoint using your `LEETCODE_SESSION` cookie. The backend acts as a strict pass-through proxy, guaranteeing cryptographic tokens are kept exclusively in ephemeral memory and never written to disk.

## 🛠 Tech Stack

*   **Frontend (UI & State):** React, Vite, React Router, `react-markdown`
*   **Backend (API Gateway & Proxy):** Node.js, Express
*   **Inference Engines:** Ollama (Local GGUF execution), `@google/genai` SDK (Cloud)

## 📦 Local Setup & Installation

### 1. Prerequisites
*   [Node.js](https://nodejs.org/) (v18+)
*   [Ollama](https://ollama.ai/) (Required only for Local Mode)
*   A Gemini API Key (Required only for Cloud Mode)

### 2. Clone the Repository
```bash
git clone [https://github.com/YOUR_USERNAME/LeetBuddy.git](https://github.com/YOUR_USERNAME/LeetBuddy.git)
cd LeetBuddy
```

### 3.Prepare your Environment

* For cloud mode configure the .env file
```bash
cp .env.example .env
GEMINI_API_KEY="your_api_key_here"
```
* For Local Ollama mode
```bash
ollama pull gemma2:2b
ollama serve
```


### 4.Run Backend Server
```bash
cd server
npm install
node server.js
```

### 5.Run Frontend
```bash
cd client
npm install
npm run dev
```
