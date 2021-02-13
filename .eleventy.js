// Constants
const yaml = require('js-yaml');
const {DateTime} = require('luxon');
const htmlmin = require('html-minifier');
const markdownIt = require('markdown-it');
const Image = require('@11ty/eleventy-img');
const rssPlugin = require('@11ty/eleventy-plugin-rss');
const pluginSass = require('eleventy-plugin-sass');


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
module.exports = function (config) {
  // Layout aliases
  config.addLayoutAlias('default', 'layouts/default.html');
  config.addLayoutAlias('blog', 'layouts/blog.html');
  config.addLayoutAlias('posts', 'layouts/posts.html');

  // Disable extended console output
  config.setQuietMode(true);
  
  // Merge data instead of overriding
  config.setDataDeepMerge(true);

  // Disable automatic use of your .gitignore
  config.setUseGitIgnore(false);

  // Human readable date
  config.addFilter('readableDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('dd LLL yyyy');
  });
  // Current year
  config.addShortcode('currentYear', () => `${new Date().getFullYear()}`);

  // Support .yml extension in _data
  config.addDataExtension('yml', (contents) => yaml.safeLoad(contents));

  // Add Tailwind output CSS as watch target
  config.addWatchTarget('./_tmp/static/css');

  // Passthrough
  config.addPassthroughCopy({
    // Styles
    './_tmp/static/css': './static/css',

    // Configs
    './src/admin/config.yml': './admin/config.yml',

    // Javascript
    './node_modules/alpinejs/dist/alpine.js': './static/js/alpine.js',

    // Images
    './src/static/img': './static/img',
    './src/favicon.ico': './favicon.ico',
  });

  // Minify HTML
  config.addTransform('htmlmin', function (content, outputPath) {
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
  config.addFilter('md', function (content = '') {
    return markdownIt({html: true}).render(content);
  });

  // Shortcodes
  config.addNunjucksAsyncShortcode('image', imageShortcode);
  config.addLiquidShortcode('image', imageShortcode);
  config.addJavaScriptFunction('image', imageShortcode);

  // Plugins
  config.addPlugin(rssPlugin);
  config.addPlugin(pluginSass);

  // Return
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
    markdownTemplateEngine: 'liquid',
    htmlTemplateEngine: 'njk',
    templateFormats: ['html', 'liquid', 'md', 'njk'],
  };
};
