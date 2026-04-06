import React from 'react';
import { Shield, Brain, Terminal, Network, ArrowDown, Code, Target, FileText } from 'lucide-react';

export default function About() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="cyber-panel p-8 rounded-xl border-t-4 border-t-cyber-yellow relative overflow-hidden">
        <Shield className="absolute -bottom-10 -right-10 w-64 h-64 opacity-5 text-cyber-yellow" />
        
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <Terminal className="w-8 h-8 text-cyber-yellow" /> 
          Sentri AI Core Architecture
        </h2>
        
        <div className="space-y-12 text-cyber-yellow/80 leading-relaxed max-w-5xl">
          <section>
            <p className="text-lg">
              <strong>SENTRI AI</strong> is engineered from the ground up to operate indistinguishably from an elite human Red Team specialist. Instead of relying on static signature matching (like traditional DAST/SAST scanners), Sentri leverages <strong>autonomous topological mapping</strong> matched with <strong>LLaMA-3’s zero-latency deductive inference</strong> to "think" its way through logical vulnerabilities and orchestrate fixes instantly.
            </p>
          </section>

          {/* Flow Architecture Diagram using Grid & Borders */}
          <section className="relative pt-8">
            <h3 className="font-bold uppercase tracking-widest text-cyber-yellow mb-8 text-xl flex items-center gap-2">
              <Network className="w-6 h-6" /> Execution Flow
            </h3>

            <div className="space-y-4">
              
              {/* Node 1 */}
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="flex-shrink-0 w-16 h-16 bg-cyber-yellow/10 border border-cyber-yellow rounded-full flex items-center justify-center">
                  <Target className="w-8 h-8 text-cyber-yellow" />
                </div>
                <div className="flex-1 bg-black/50 p-6 rounded-lg border border-cyber-yellow/20 hover:border-cyber-yellow/50 transition-all">
                  <h4 className="font-bold uppercase text-cyber-yellow mb-1 text-lg">Phase 1: Ingestion & Surface Definition</h4>
                  <p className="text-sm opacity-80">
                    The agent receives the target URL endpoint. It validates connection authenticity and structures the underlying sandboxed Chromium instances headless mode to prepare for engagement.
                  </p>
                </div>
              </div>

              <div className="flex justify-center md:justify-start md:pl-7">
                <ArrowDown className="w-6 h-6 text-cyber-yellow/50 animate-bounce" />
              </div>

              {/* Node 2 */}
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="flex-shrink-0 w-16 h-16 bg-cyber-yellow/10 border border-cyber-yellow rounded-full flex items-center justify-center">
                  <Network className="w-8 h-8 text-cyber-yellow" />
                </div>
                <div className="flex-1 bg-black/50 p-6 rounded-lg border border-cyber-yellow/20 hover:border-cyber-yellow/50 transition-all">
                  <h4 className="font-bold uppercase text-cyber-yellow mb-1 text-lg">Phase 2: Deep DOM Crawling & DOM Extraction</h4>
                  <p className="text-sm opacity-80">
                    Playwright physically navigates the application. Instead of just scraping HTML, the crawler deeply audits DOM input patterns, routing endpoints, headers, interactive buttons, and authorization gates to build a living payload map of the site's surface logic.
                  </p>
                </div>
              </div>

              <div className="flex justify-center md:justify-start md:pl-7">
                <ArrowDown className="w-6 h-6 text-cyber-yellow/50 animate-bounce" />
              </div>

              {/* Node 3 */}
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="flex-shrink-0 w-16 h-16 bg-cyber-yellow/10 border border-cyber-yellow rounded-full flex items-center justify-center">
                  <Brain className="w-8 h-8 text-cyber-yellow" />
                </div>
                <div className="flex-1 bg-black/50 p-6 rounded-lg border border-cyber-yellow/20 hover:border-cyber-yellow/50 transition-all shadow-[0_0_15px_rgba(255,230,0,0.1)]">
                  <h4 className="font-bold uppercase text-cyber-yellow mb-1 text-lg">Phase 3: LLM Heuristic Attack Vectors</h4>
                  <p className="text-sm opacity-80">
                    The JSON map is parsed and shipped via the Groq SDK directly into the heavily constrained <strong>Llama-3.3-70B-Versatile</strong> model. Instructed via explicit Red Team prompting, the AI agent logically hypothesizes zero-day risks, unhandled injections, IDOR scenarios, and missing logic checks contextually related to the exact business functions it discovered.
                  </p>
                </div>
              </div>

              <div className="flex justify-center md:justify-start md:pl-7">
                <ArrowDown className="w-6 h-6 text-cyber-yellow/50 animate-bounce" />
              </div>

              {/* Node 4 */}
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="flex-shrink-0 w-16 h-16 bg-cyber-yellow/10 border border-cyber-yellow rounded-full flex items-center justify-center">
                  <Code className="w-8 h-8 text-cyber-yellow" />
                </div>
                <div className="flex-1 bg-black/50 p-6 rounded-lg border border-cyber-yellow/20 hover:border-cyber-yellow/50 transition-all">
                  <h4 className="font-bold uppercase text-cyber-yellow mb-1 text-lg">Phase 4: Triage & Guru Remediation</h4>
                  <p className="text-sm opacity-80">
                    Each suspected attack vector is serialized and handed simultaneously to a secondary <strong>Llama-3.1-8B</strong> speed agent serving as the "Remediation Guru". This model dynamically generates specific, context-aware code-level fixes (React, Express, Node) and grades the vulnerability using standard CVSS severity logic.
                  </p>
                </div>
              </div>

              <div className="flex justify-center md:justify-start md:pl-7">
                <ArrowDown className="w-6 h-6 text-cyber-yellow/50 animate-bounce" />
              </div>

              {/* Node 5 */}
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="flex-shrink-0 w-16 h-16 bg-cyber-yellow/10 border border-cyber-yellow rounded-full flex items-center justify-center">
                  <FileText className="w-8 h-8 text-cyber-yellow" />
                </div>
                <div className="flex-1 bg-black/50 p-6 rounded-lg border border-cyber-yellow/20 hover:border-cyber-yellow/50 transition-all">
                  <h4 className="font-bold uppercase text-cyber-yellow mb-1 text-lg">Phase 5: Presentation & Auditing</h4>
                  <p className="text-sm opacity-80">
                    The Express application correlates the final payload and streams JSON directly back to the React UI dashboard. Findings are presented cleanly with explicit locations, exact flaw definitions, and copy-paste code patches. The entire scan is deterministically mapped to a downloadable jsPDF report for compliance tracking.
                  </p>
                </div>
              </div>

            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
