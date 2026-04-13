import React, { useState } from 'react';
import { Search, Terminal, AlertTriangle, CheckCircle, FileText, Loader2, Zap, Download, Shield } from 'lucide-react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { jsPDF } from 'jspdf';

export default function Dashboard() {
  const [url, setUrl] = useState('');
  const [scanning, setScanning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [report, setReport] = useState<any>(null);

  // Safely stringify objects to prevent React rendering crashes (which result in a blank screen)
  const safeRender = (val: any, fallback: string = 'N/A') => {
    if (!val) return fallback;
    if (typeof val === 'string' || typeof val === 'number') return val;
    try {
      return JSON.stringify(val, null, 2);
    } catch (e) {
      return fallback;
    }
  };

  const startScan = async () => {
    if (!url) return;
    setScanning(true);
    setLogs(['[SYSTEM] Initializing Sentri AI Agent...', `[SYSTEM] Target: ${url}`]);
    setReport(null);

    try {
      const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');
      const response = await axios.post(`${API_BASE_URL}/api/scan`, { url });
      setReport(response.data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || 'Scan failed.';
      setLogs(prev => [...prev, `[ERROR] ${errorMessage}`]);
      setReport({ error: errorMessage });
    } finally {
      setScanning(false);
    }
  };

  const downloadReport = () => {
    if (!report) return;
    
    const doc = new jsPDF();
    
    doc.setFontSize(22);
    // Dark yellow PDF colors
    doc.setTextColor(200, 180, 0);
    doc.text("SENTRI AI - SECURITY AUDIT", 14, 22);
    
    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);
    doc.text(`Target URL: ${url}`, 14, 32);
    doc.text(`Overall Risk Score: ${report.overall_score}/100`, 14, 40);
    doc.text(`Security Grade: ${report.grade || 'N/A'}`, 14, 48);
    doc.text(`Total Vulnerabilities Found: ${report.vulnerabilities?.length || 0}`, 14, 56);
    
    doc.setDrawColor(200, 180, 0);
    doc.setLineWidth(0.5);
    doc.line(14, 60, 196, 60);

    let y = 70;
    
    (report.vulnerabilities || []).forEach((v: any, index: number) => {
      if (y > 260) {
        doc.addPage();
        y = 20;
      }
      
      doc.setFontSize(14);
      doc.setTextColor(v.severity === 'CRITICAL' ? 220 : v.severity === 'HIGH' ? 200 : 150, 0, 0);
      doc.text(`${index + 1}. ${v.title || 'Unknown Vulnerability'} [${v.severity || 'LOW'}]`, 14, y);
      y += 8;
      
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      
      const splitDesc = doc.splitTextToSize(`Description: ${v.description || 'N/A'}`, 180);
      doc.text(splitDesc, 14, y);
      y += (splitDesc.length * 5) + 4;
      
      if (y > 260) {
        doc.addPage();
        y = 20;
      }
      
      doc.setFont("courier", "normal");
      doc.setTextColor(150, 130, 0);
      const splitFix = doc.splitTextToSize(`Remediation:\n${v.fix || 'Manual review required.'}`, 180);
      doc.text(splitFix, 14, y);
      y += (splitFix.length * 5) + 12;
      
      doc.setFont("helvetica", "normal");
    });

    doc.save(`sentri_cyber_audit_${new Date().getTime()}.pdf`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Input Section */}
      <section className="cyber-panel p-6 rounded-xl border-l-4 border-l-cyber-yellow">
        <div className="flex flex-col gap-4">
          <label className="text-sm font-bold uppercase tracking-wider text-cyber-yellow/80 flex items-center gap-2">
            <Search className="w-4 h-4" /> Enter Target URL
          </label>
          <div className="flex flex-col md:flex-row gap-4">
            <input 
              type="text" 
              placeholder="https://your-startup.com"
              className="flex-1 bg-black/50 border border-cyber-yellow/30 rounded-lg px-4 py-3 text-cyber-yellow focus:outline-none focus:border-cyber-yellow transition-all placeholder:text-cyber-yellow/20"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={scanning}
            />
            <button 
              onClick={startScan}
              disabled={scanning || !url}
              className={`flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-bold uppercase tracking-tighter transition-all ${
                scanning 
                  ? 'bg-cyber-yellow/20 text-cyber-yellow/40 cursor-not-allowed' 
                  : 'bg-cyber-yellow text-black hover:bg-cyber-yellow/90 active:scale-95 shadow-[0_0_20px_rgba(255,230,0,0.3)]'
              }`}
            >
              {scanning ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
              {scanning ? 'Hunting...' : 'Launch Attack'}
            </button>
          </div>
        </div>
      </section>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Terminal Logs */}
        <div className="lg:col-span-1 cyber-panel flex flex-col h-[500px] rounded-xl overflow-hidden">
          <div className="bg-cyber-yellow/10 p-3 border-b border-cyber-yellow/20 flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Live Attack Feed</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-[11px] leading-relaxed">
            {logs.map((log, i) => (
              <div key={i} className={log.includes('[ERROR]') ? 'text-red-500' : 'text-cyber-yellow/80'}>
                {log}
              </div>
            ))}
            {scanning && (
              <div className="flex items-center gap-2 text-cyber-yellow/40 italic animate-pulse">
                <Loader2 className="w-3 h-3 animate-spin" />
                Analyzing server response headers...
              </div>
            )}
            {!scanning && logs.length === 0 && (
              <div className="text-cyber-yellow/20 text-center mt-20 italic">
                Systems ready. Waiting for target authorization...
              </div>
            )}
          </div>
        </div>

        {/* Report Display */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence>
            {report && typeof report === 'object' && !report.error && Array.isArray(report.vulnerabilities) ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="cyber-panel p-6 rounded-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <FileText className="w-24 h-24" />
                  </div>
                  
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <CheckCircle className="w-6 h-6 text-cyber-yellow" /> Vulnerability Assessment Complete
                    </h2>
                    <button 
                      onClick={downloadReport}
                      className="flex items-center gap-2 px-4 py-2 bg-cyber-yellow/10 border border-cyber-yellow/30 rounded text-cyber-yellow hover:bg-cyber-yellow hover:text-black transition-all text-xs font-bold uppercase"
                    >
                      <Download className="w-4 h-4" /> Download Full Report
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                      <p className="text-[10px] uppercase font-bold text-red-500/60 mb-1">Risk Score</p>
                      <p className="text-3xl font-bold text-red-500">{report.overall_score || 0}/100</p>
                    </div>
                    <div className="bg-cyber-gold/10 border border-cyber-gold/30 p-4 rounded-lg">
                      <p className="text-[10px] uppercase font-bold text-cyber-gold/60 mb-1">Grade</p>
                      <p className="text-3xl font-bold text-cyber-gold">{report.grade || 'N/A'}</p>
                    </div>
                    <div className="bg-cyber-yellow/10 border border-cyber-yellow/30 p-4 rounded-lg">
                      <p className="text-[10px] uppercase font-bold text-cyber-yellow/60 mb-1">Exploits Found</p>
                      <p className="text-3xl font-bold text-cyber-yellow">{report.vulnerabilities?.length || 0}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-cyber-yellow/60 border-b border-cyber-yellow/10 pb-2">Technical Findings</h3>
                    {(report.vulnerabilities || []).map((v: any, i: number) => (
                      <div key={i} className="bg-black/40 border border-cyber-yellow/10 p-4 rounded-lg hover:border-cyber-yellow/30 transition-all">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-cyber-yellow">{safeRender(v?.title, 'Unknown Vulnerability')}</h4>
                          <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase ${
                            v?.severity === 'CRITICAL' ? 'bg-red-500 text-white' : 'bg-cyber-gold text-black'
                          }`}>
                            {safeRender(v?.severity, 'LOW')}
                          </span>
                        </div>
                        {v?.target && (
                          <div className="mb-2 italic border-l-2 border-cyber-yellow/30 pl-2">
                            <span className="text-[10px] uppercase font-bold text-cyber-yellow/50 tracking-widest">Location / Target: </span>
                            <span className="text-xs text-cyber-yellow/90 font-mono">{safeRender(v.target)}</span>
                          </div>
                        )}
                        <p className="text-xs text-cyber-yellow/70 mb-4">{safeRender(v?.description, 'No description provided.')}</p>
                        <div className="bg-black p-3 rounded border border-cyber-yellow/5">
                          <p className="text-[10px] uppercase font-bold text-cyber-yellow/40 mb-2">Remediation Fix</p>
                          <code className="text-[10px] text-cyber-yellow/90 whitespace-pre-wrap">{safeRender(v?.fix, 'Manual review required.')}</code>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : report && typeof report === 'object' && report.error ? (
              <div className="h-full flex flex-col items-center justify-center opacity-80 py-20 bg-red-500/5 rounded-xl border border-dashed border-red-500/20">
                <AlertTriangle className="w-20 h-20 mb-4 text-red-500" />
                <p className="font-bold uppercase tracking-widest text-red-500">Scan Failed</p>
                <p className="text-[10px] text-red-500/70">{safeRender(report.error)}</p>
              </div>
            ) : report ? (
               <div className="h-full flex flex-col items-center justify-center opacity-80 py-20 bg-cyber-gold/5 rounded-xl border border-dashed border-cyber-gold/20">
                <AlertTriangle className="w-20 h-20 mb-4 text-cyber-gold" />
                <p className="font-bold uppercase tracking-widest text-cyber-gold">Invalid Response structure</p>
                <p className="text-[10px] text-cyber-gold/70">The Sentri AI agent generated a malformed report.</p>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center opacity-20 py-20 bg-cyber-yellow/5 rounded-xl border border-dashed border-cyber-yellow/20">
                <Shield className="w-20 h-20 mb-4" />
                <p className="font-bold uppercase tracking-widest">No Active Reports</p>
                <p className="text-[10px]">Launch an attack to see audit results</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
