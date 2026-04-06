<div align="center">
  <img src="https://img.shields.io/badge/Security-AI-00FF41?style=for-the-badge&logo=shield&logoColor=black" alt="AI Agent Badge" />
  <img src="https://img.shields.io/badge/Engine-LLaMA_3-black?style=for-the-badge&logo=meta&logoColor=00FF41" alt="LLaMA Badge" />
  <img src="https://img.shields.io/badge/Stack-React_|_Node.js-black?style=for-the-badge&logo=react&logoColor=00FF41" alt="Stack Badge" />
</div>

<br />

<div align="center">
  <h1 align="center">SENTRI AI</h1>
  <p align="center">
    <strong>Autonomous Startup Security Agent</strong>
    <br />
    A devastatingly effective, automated penetration testing platform designed to emulate a dedicated human security specialist.
  </p>
</div>

---

## ⚡ Overview

Sentri is an intelligent, automated vulnerability scanning dashboard built for startups. Leveraging the power of Playwright for deep structural web crawling and **Groq's Llama 3 models** for zero-latency deductive security reasoning, the platform automatically maps attack surfaces, hypothesizes vulnerabilities, and generates developer-ready remediation payloads.

## 🚀 Key Features

- **Automated Attack Surface Discovery:** Deep-crawls target web applications using Playwright to extract live forms, inputs, and routing topologies.
- **AI-Driven Vulnerability Engine:** Feeds page structures directly into a heavily constrained, low-temperature LLM (Llama-3.3-70b-versatile) trained on hacker methodologies to identify logic flaws and injection points.
- **Remediation Guru:** Automatically architects deterministic, copy-paste ready code fixes for every vulnerability discovered.
- **Dynamic Risk Grading:** Calculates an overall application risk score and grades it in real-time.
- **PDF Intelligence Reports:** Export your complete security audit seamlessly into a multi-page, formatted PDF directly from the dashboard.
- **Cyberpunk UI:** A visually stunning, highly-responsive hacker aesthetic interface built with Tailwind CSS and Framer Motion.

## 🛠️ Tech Stack

| Domain | Technology |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS v4, Framer Motion, Lucide React, jsPDF |
| **Backend** | Node.js, Express.js, Playwright |
| **Intelligence**| Groq SDK (Llama 3.3 70B & Llama 3.1 8B) |

---

## 📂 Project Structure

```text
LNC/
├── backend/                  # Node.js / Express server
│   ├── index.js              # Main server entrypoint and API routes
│   ├── crawler.js            # Playwright web crawling logic
│   ├── attacker.js           # Agent inference & payload generation
│   ├── prompts.js            # Heavily-constrained hacker prompts for Groq
│   ├── package.json          # Backend dependencies
│   └── .env                  # Environment configs (Port, Groq API Key)
├── frontend/                 # React & Vite client application
│   ├── src/
│   │   ├── App.tsx           # Main Dashboard UI and scan visualization
│   │   ├── index.css         # Tailwind CSS v4 & Cyberpunk aesthetic
│   │   ├── main.tsx          # React DOM configuration
│   │   └── vite-env.d.ts     # Vite environment types
│   ├── index.html            # Core Vite HTML template
│   ├── vite.config.ts        # Vite configuration rules
│   ├── tsconfig.json         # TypeScript configurations
│   └── package.json          # Frontend dependencies
├── ppt.txt                   # Presentation Outline
└── Readme.md                 # Documentation
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- A valid [Groq API Key](https://console.groq.com/keys)

### 1. Clone the Repository
```bash
git clone https://github.com/wtfnixin/LNC.git
cd LNC
```

### 2. Configure Backend Engine
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory with your Groq API key:
```env
PORT=5000
GROQ_API_KEY=your_groq_api_key_here
```

Start the backend server:
```bash
npm start
```

### 3. Launch the Dashboard
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```

You can now access the Sentri dashboard locally at `http://localhost:5173`.

---

## 🛡️ Usage Warning & Disclaimer

**For Authorized Testing Only.** 
This intelligent agent is designed specifically for defensive evaluation and securing startup infrastructure. Do not deploy the Sentri crawler against any target network, application, or perimeter that you do not own or possess explicit written authorization to audit. 

---

<div align="center">
  <i>"Systems ready. Waiting for target authorization..."</i>
</div>
