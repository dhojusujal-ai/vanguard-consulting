const fs = require('fs');
const code = fs.readFileSync('c:\\Users\\sujal\\OneDrive\\Desktop\\consultancywebsite\\src\\app\\admin\\dashboard\\AdminDashboardClient.tsx', 'utf8');
const lines = code.split('\n');

for (let i = 2600; i < Math.min(2844, lines.length); i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
