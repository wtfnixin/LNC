const { Groq } = require('groq-sdk');
const { HACKER_BRAIN_PROMPT, REMEDIATION_GURU_PROMPT } = require('./prompts');
require('dotenv').config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

/**
 * Attacker Engine
 * Uses AI to reason about attack vectors.
 */
async function generateAttackVector(surface) {
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: HACKER_BRAIN_PROMPT
          .replace("{URL}", surface.url)
          .replace("{STRUCTURE}", JSON.stringify(surface))
          .replace("{TECH}", "General Modern Web Stack (React/Next)")
      }
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 0.1,
    response_format: { type: "json_object" }
  });

  return JSON.parse(completion.choices[0].message.content);
}

/**
 * Remediation Guru
 * Generates fixes for the vulnerabilities found.
 */
async function generateFix(vulnerability, surface) {
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: REMEDIATION_GURU_PROMPT
          .replace("{FINDING}", JSON.stringify(vulnerability))
          .replace("{CONTEXT}", JSON.stringify(surface))
      }
    ],
    model: "llama-3.1-8b-instant",
    temperature: 0.1,
    response_format: { type: "json_object" }
  });

  return JSON.parse(completion.choices[0].message.content);
}

module.exports = { generateAttackVector, generateFix };
