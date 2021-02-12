// Constants
const yaml = require('js-yaml');
const {DateTime} = require('luxon');
const htmlmin = require('html-minifier');
const markdownIt = require('markdown-it');
const Image = require('@11ty/eleventy-img');

// Functions

// Image shortcode
async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [600, 900],
    formats: ['webp', 'jpeg'],
    urlPath: './static/img/',
    outputDir: './_site/static/img/',
    sharpJpegOptions: {
      quality: 70,
      progressive: true,
    },
    sharpPngOptions: {
      quality: 70,
      progressive: true,
    },
    sharpWebpOptions: {
      quality: 70,
    },
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: 'lazy',
    decoding: 'async',
  };

  return Image.generateHTML(metadata, imageAttributes);
}

// Eleventy settings
module.exports = function (eleventyConfig) {
  // Disable extended console output
  eleventyConfig.setQuietMode(true);
  
  // Merge data instead of overriding
  eleventyConfig.setDataDeepMerge(true);

  // Disable automatic use of your .gitignore
  eleventyConfig.setUseGitIgnore(false);

  // Human readable date
  eleventyConfig.addFilter('readableDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('dd LLL yyyy');
  });
  // Current year
  eleventyConfig.addShortcode('currentYear', () => `${new Date().getFullYear()}`);

  // Support .yml extension in _data
  eleventyConfig.addDataExtension('yml', (contents) => yaml.safeLoad(contents));

  // Add Tailwind output CSS as watch target
  eleventyConfig.addWatchTarget('./_tmp/static/css/style.css');

  // Passthrough
  eleventyConfig.addPassthroughCopy({
    // Styles
    './_tmp/static/css/style.css': './static/css/style.css',

    // Configs
    './src/admin/config.yml': './admin/config.yml',

    // Javascript
    './node_modules/alpinejs/dist/alpine.js': './static/js/alpine.js',

    // Images
    './src/static/img': './static/img',
    './src/favicon.ico': './favicon.ico',
  });

  // Minify HTML
  eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
    if (outputPath.endsWith('.html')) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }
    return content;
  });

  // Filters
  eleventyConfig.addFilter('md', function (content = '') {
    return markdownIt({html: true}).render(content);
  });

  // Shortcodes
  eleventyConfig.addNunjucksAsyncShortcode('image', imageShortcode);
  eleventyConfig.addLiquidShortcode('image', imageShortcode);
  eleventyConfig.addJavaScriptFunction('image', imageShortcode);

  return {
    // Directory settings
    dir: {
      input: 'src',
      outpur: '_site',

      // Relative to above-set input folder
      includes: '_includes',
      layouts: '_includes',
      data: '_data',
    },

    // Templates
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    templateFormats: ['html', 'liquid', 'md', 'njk'],
  };
};
