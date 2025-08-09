const fs = require('fs');
const path = require('path');

// Carpeta de artículos
const articlesDir = path.join(__dirname, '../articulos');

// Ruta para guardar el JSON
const outputPath = path.join(articlesDir, 'index.json');

// Verificar si la carpeta existe
if (!fs.existsSync(articlesDir)) {
  console.error(`❌ La carpeta ${articlesDir} no existe.`);
  process.exit(1);
}

// Leer y ordenar archivos .md (ignorando index.json)
const files = fs.readdirSync(articlesDir)
  .filter(file => file.endsWith('.md'))
  .sort((a, b) => {
    const aTime = fs.statSync(path.join(articlesDir, a)).mtime;
    const bTime = fs.statSync(path.join(articlesDir, b)).mtime;
    return bTime - aTime;
  })
  .map(file => `/articulos/${file}`);

// Guardar index.json
fs.writeFileSync(outputPath, JSON.stringify(files, null, 2), 'utf8');

console.log(`✅ index.json generado con ${files.length} artículos en ${outputPath}`);