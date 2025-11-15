import fs from 'fs';

const file = './src/controllers/aiController.js';
let content = fs.readFileSync(file, 'utf8');

// For each remaining function, add test user handling
const functions = [
  { name: 'generatePoster', credits: 10 },
  { name: 'ageTransform', credits: 10 },
  { name: 'enhanceImage', credits: 8 }
];

functions.forEach(func => {
  // Add isTest variable
  const funcPattern = new RegExp(`(export const ${func.name} = async \\(req, res\\) => \\{[\\s\\S]*?const creditsRequired = ${func.credits};)(?!\\s*const isTest)`, 'g');
  content = content.replace(funcPattern, `$1\n    const isTest = isTestUser(req.user?.id);`);

  // Convert profile fetch to conditional with test default
  const profilePattern = new RegExp(`(export const ${func.name}[\\s\\S]*?)const \\{ data: profile \\} = await supabaseAdmin\\s+\\.from\\('profiles'\\)\\s+\\.select\\('credits'\\)\\s+\\.eq\\('id', req\\.user\\.id\\)\\s+\\.single\\(\\);`, 'g');
  content = content.replace(profilePattern, `$1let profile = { credits: 1000 };\n    let generation = null;\n\n    if (!isTest) {\n      const { data: profileData } = await supabaseAdmin\n        .from('profiles')\n        .select('credits')\n        .eq('id', req.user.id)\n        .single();\n\n      profile = profileData;`);

  // Convert generation insert to conditional
  const genPattern = new RegExp(`(export const ${func.name}[\\s\\S]*?if \\(profile\\.credits < creditsRequired\\) \\{[\\s\\S]*?\\}\\s*)const \\{ data: generation \\} = await supabaseAdmin`, 'g');
  content = content.replace(genPattern, `$1\n      const { data: generationData } = await supabaseAdmin`);

  const genEndPattern = new RegExp(`(export const ${func.name}[\\s\\S]*?const \\{ data: generationData \\} = await supabaseAdmin[\\s\\S]*?\\.single\\(\\);)`, 'g');
  content = content.replace(genEndPattern, `$1\n\n      generation = generationData;\n    }`);
});

// Now wrap all standalone await supabaseAdmin update blocks
content = content.replace(/(\n\s+)(await supabaseAdmin\s+\.from\('ai_generations'\)\s+\.update\(\{[\s\S]*?\}\)\s+\.eq\('id', generation\.id\);)/g, (match, indent, code) => {
  // Check if it's already wrapped
  if (match.includes('if (!isTest')) {
    return match;
  }
  return `${indent}if (!isTest && generation) {\n${indent}  ${code}\n${indent}}`;
});

content = content.replace(/(\n\s+)(await supabaseAdmin\s+\.from\('profiles'\)\s+\.update\(\{ credits:[\s\S]*?\}\)\s+\.eq\('id', req\.user\.id\);)/g, (match, indent, code) => {
  if (match.includes('if (!isTest')) {
    return match;
  }
  return `${indent}  ${code}`;
});

fs.writeFileSync(file, content);
console.log('✅ Fixed remaining functions!');
