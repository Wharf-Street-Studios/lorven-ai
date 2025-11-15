import fs from 'fs';

const controllerPath = './src/controllers/aiController.js';
let content = fs.readFileSync(controllerPath, 'utf8');

// Add isTest variable to all functions that don't have it
const functions = [
  'generateDuoPortrait',
  'generatePoster',
  'ageTransform',
  'enhanceImage'
];

functions.forEach(funcName => {
  // Add isTest variable after creditsRequired
  content = content.replace(
    new RegExp(`(export const ${funcName}[\\s\\S]*?const creditsRequired = \\d+;)(?!\\s*const isTest)`, 'g'),
    `$1\n    const isTest = isTestUser(req.user?.id);`
  );

  // Wrap profile fetch in if (!isTest)
  content = content.replace(
    new RegExp(`(export const ${funcName}[\\s\\S]*?)const \\{ data: profile \\} = await supabaseAdmin([\\s\\S]*?)\\.single\\(\\);`, 'g'),
    `$1let profile = { credits: 1000 };\n    let generation = null;\n\n    if (!isTest) {\n      const { data: profileData } = await supabaseAdmin$2.single();\n\n      profile = profileData;`
  );

  // Close the if (!isTest) block and wrap generation insert
  content = content.replace(
    new RegExp(`(export const ${funcName}[\\s\\S]*?if \\(profile\\.credits < creditsRequired\\) \\{[\\s\\S]*?\\}\\s*)const \\{ data: generation \\}`, 'g'),
    `$1\n      const { data: generationData }`
  );

  content = content.replace(
    new RegExp(`(export const ${funcName}[\\s\\S]*?const \\{ data: generationData \\} = await supabaseAdmin[\\s\\S]*?)\\.single\\(\\);`, 'g'),
    `$1.single();\n\n      generation = generationData;\n    }`
  );
});

fs.writeFileSync(controllerPath, content);
console.log('✅ Controller functions updated!');
