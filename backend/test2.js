const { generateFix } = require('./attacker');

(async () => {
  try {
    const vuln = {
      title: "Potential Cross-Site Scripting (XSS)",
      severity: "HIGH",
      target: "https://example.com/search?q=",
      tactic: "Reflected XSS",
      payload_template: "<script>alert(1)</script>"
    };
    
    console.log('Generating Fix...');
    const fix = await generateFix(vuln, {url: 'https://example.com'});
    console.log('Fix success:', fix);
  } catch (e) {
    console.error('Test Error:', e.message || e);
  }
})();
