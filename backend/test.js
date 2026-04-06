const { discoverAttackSurface } = require('./crawler');
const { generateAttackVector } = require('./attacker');

(async () => {
  try {
    console.log('Crawling...');
    const surface = await discoverAttackSurface('https://example.com');
    console.log('Discover success');
    console.log('Hacking...');
    const vector = await generateAttackVector(surface);
    console.log('Hack success:', vector);
  } catch (e) {
    console.error('Test Error:', e);
  }
})();
