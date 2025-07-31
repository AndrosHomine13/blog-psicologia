const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // Filtro para formatear fechas
  eleventyConfig.addFilter("date", (value, format = "dd LLL yyyy") => {
    return DateTime.fromJSDate(value, { zone: "utc" }).toFormat(format);
  });

  // Copiar carpetas estáticas
  eleventyConfig.addPassthroughCopy("css");    // si tienes CSS
  eleventyConfig.addPassthroughCopy("img");    // imágenes
  eleventyConfig.addPassthroughCopy("admin");  // Netlify CMS

  // Colección de posts
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./posts/*.md");
  });

  // Configuración de directorios
  return {
    dir: {
      input: ".",       // carpeta raíz
      includes: "_includes",
      data: "_data",
      output: "_site",  // carpeta de salida
    }
  };
};

