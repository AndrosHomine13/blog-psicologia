const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, '../articulos');
const outputPath = path.join(articlesDir, 'index.json');

const files = fs.readdirSync(articlesDir)
  .filter(file => file.endsWith('.md'))
  .map(file => `/articulos/${file}`);

fs.writeFileSync(outputPath, JSON.stringify(files, null, 2));
console.log('✅ index.json generado con', files.length, 'artículos.');
