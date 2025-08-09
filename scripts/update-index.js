const fs = require('fs');
const path = require('path');

// Carpeta de artículos y ruta del index.json dentro de ella
const articlesDir = path.join(__dirname, '../articulos');
const outputPath = path.join(articlesDir, 'index.json');

// Leer y ordenar los .md por fecha de modificación (más recientes primero)
const files = fs.readdirSync(articlesDir)
  .filter(file => file.endsWith('.md'))
  .sort((a, b) => {
    const aTime = fs.statSync(path.join(articlesDir, a)).mtime;
    const bTime = fs.statSync(path.join(articlesDir, b)).mtime;
    return bTime - aTime;
  })
  .map(file => `/articulos/${file}`);

// Guardar el JSON dentro de la carpeta articulos
fs.writeFileSync(outputPath, JSON.stringify(files, null, 2));

console.log(`✅ index.json generado con ${files.length} artículos en ${outputPath}`);