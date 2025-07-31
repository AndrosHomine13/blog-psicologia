const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // Filtro para formatear fechas
  eleventyConfig.addFilter("date", (value, format = "dd LLL yyyy") => {
    return DateTime.fromJSDate(value, { zone: "utc" }).toFormat(format);
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
    }
  };
};


module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css"); // si tienes CSS estático
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./posts/*.md");
  });
};

module.exports = function(eleventyConfig) {
  // Copia la carpeta admin al sitio final
  eleventyConfig.addPassthroughCopy("admin");

  // También copia otros si necesitas (como img/)
  eleventyConfig.addPassthroughCopy("img");

  return {
    dir: {
      input: ".",      // entrada raíz
      output: "_site", // salida por defecto
    }
  };
};
