// Nodemon Trigger
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { discoverAttackSurface } = require('./crawler');
const { generateAttackVector, generateFix } = require('./attacker');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

/**
 * Main Scan Endpoint
 * 1. Crawls Target Site
 * 2. Asks AI to Hack it
 * 3. Asks AI to Fix it
 * 4. Returns Report
 */
app.post('/api/scan', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL required' });

  try {
    console.log(`[SYSTEM] Starting scan for: ${url}`);
    
    // 1. Crawling
    const surface = await discoverAttackSurface(url);
    console.log(`[SYSTEM] Surface Discovery: ${surface.forms.length} forms found.`);

    // 2. Generating Attacks
    const vector = await generateAttackVector(surface);
    console.log(`[SYSTEM] AI Reasoning: ${vector.attacks.length} potential vulnerabilities identified.`);

    // Helper function to sleep to avoid rate limits
    const delay = (ms) => new Promise(res => setTimeout(res, ms));

    // 3. Generating Fixes (Sequentially to avoid rate limits)
    const fullVulnerabilities = [];
    for (const v of vector.attacks) {
      try {
        console.log(`[SYSTEM] Generating fix for: ${v.title}`);
        const fix = await generateFix(v, surface);
        fullVulnerabilities.push({
          ...v,
          title: fix.title,
          description: fix.description,
          severity: fix.severity,
          fix: fix.fix,
          why: fix.why
        });
        // Sleep for 2 seconds to avoid blasting the Gemini free tier limit
        await delay(2000);
      } catch (err) {
         console.warn(`[WARNING] Failed to generate fix for ${v.title}. Skipping fix to continue scan. Error: ${err.message}`);
         fullVulnerabilities.push({
          ...v,
          description: v.tactic,
          fix: "Manual remediation required. API rate limit exceeded.",
          why: "N/A"
         });
      }
    }

    // 4. Final Score & Grade Calculation
    const overallScore = Math.floor(Math.random() * 40) + 40; // Simulated for now
    const grade = overallScore > 80 ? 'A' : overallScore > 60 ? 'B' : 'C';

    const report = {
      overall_score: overallScore,
      grade,
      vulnerabilities: fullVulnerabilities
    };

    res.json(report);
  } catch (err) {
    console.error('[SCAN FAILED]', err);
    res.status(500).json({ error: err.message || 'Scan failed internally.' });
  }
});

const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`[SERVER] Sentri AI running on http://${HOST}:${PORT}`);
});
