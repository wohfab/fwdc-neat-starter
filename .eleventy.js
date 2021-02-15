// Constants
const yaml = require('js-yaml');
const {DateTime} = require('luxon');
const htmlmin = require('html-minifier');
const markdownIt = require('markdown-it');
const Image = require('@11ty/eleventy-img');
const rssPlugin = require('@11ty/eleventy-plugin-rss');
const pluginSass = require('eleventy-plugin-sass');
const localImages = require('eleventy-plugin-local-images');
const svgContents = require('eleventy-plugin-svg-contents');
const fetch = require('node-fetch');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');


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

async function getSpotifyCode(
  id,
  classes = '',
  createLink = true,
  showSpotifyLogo = true,
  removeBg = true,
  removeFg = true,
  fileType = 'svg',
  bg = 'FFFFFF',
  color = 'black',
  size = 1000,
  mediaType = 'track',
) {
  // Base URL for the Spotify Scannable Code 'API'
  const base = 'https://scannables.scdn.co/uri/plain';
  // Concatinating the values to get fetch URL
  spotifyUri = ['spotify', mediaType, id].join(':');
  url = [base, fileType, bg, color, size, spotifyUri].join('/');

  // Fetching the HTML Code
  // console.log(url);
  const html = await fetch(url).then((response) => response.text());

  var output = html;

  // Remove Background
  if (removeBg) {
      output = output.replace(/<rect x="0" y="0".*/g, '');
  }
  // Remove Foreground
  if (removeFg) {
      output = output.replace(/fill="#000000"/g, '');
  }

  // Add Classes
  output = output.replace('<svg', '<svg class="' + classes + '"');

  // Remove Spotify Logo and narrow the viewport
  if (!showSpotifyLogo) {
    output = output.replace(/<g transform.*/g, '');
    output = output.replace(
      /width.*viewBox=".*"/g,
      'viewBox="50 0 400 100"',
    );
  }

  // Create surrounding <a></a> tags with link to Media
  if (createLink) {
    link = ['<a href="https://open.spotify.com', mediaType, id].join('/');
    output = link + '" rel="noopener" target="_blank">' + output + '</a>';
  }

  // Output
  console.log(output);
  return output.trim().replace(/\r?\n|\r/g, '');
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

  config.addNunjucksAsyncShortcode('getSpotifyCode', getSpotifyCode);
  config.addLiquidShortcode('getSpotifyCode', getSpotifyCode);
  config.addJavaScriptFunction('getSpotifyCode', getSpotifyCode);

  // Plugins
  config.addPlugin(rssPlugin);
  config.addPlugin(pluginSass);
  config.addPlugin(localImages, {
    distPath: '_site',
    assetPath: '/static/img',
    selector: 'img',
  });
  config.addPlugin(svgContents);
  config.addPlugin(syntaxHighlight);

  // Return
  return {
    // Directory settings
    dir: {
      input: 'src',
      output: '_site',

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
