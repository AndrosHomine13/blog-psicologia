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


