const yaml = require('js-yaml');
var compress = require('compression');
const navigationPlugin = require('@11ty/eleventy-navigation');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const sharpPlugin = require('eleventy-plugin-sharp');

module.exports = function (eleventyConfig) {
  // A useful way to reference the context we are runing eleventy in
  let env = process.env.NODE_ENV;

  eleventyConfig.setBrowserSyncConfig({
    // https: true,
    // port: 443,
    port: 80,
    server: {
      baseDir: './public',
      middleware: [compress()],
    },
    files: ['public/css', 'public/js'],
  });

  eleventyConfig.addPlugin(sharpPlugin());
  eleventyConfig.addPlugin(navigationPlugin);
  eleventyConfig.addPlugin(syntaxHighlight, {
    // Change which syntax highlighters are installed
    templateFormats: ['*'], // default

    // Or, just njk and md syntax highlighters (do not install liquid)
    templateFormats: ['njk', 'md', 'twig', 'ruby'],

    // init callback lets you customize Prism
    init: function () {
      // prismTemplates(Prism);
    },
  });

  eleventyConfig.addDataExtension('yaml', (contents) =>
    yaml.safeLoad(contents)
  );

  // Layout aliases can make templates more portable
  eleventyConfig.addLayoutAlias('default', 'layouts/base.njk');

  // Add some utility filters
  eleventyConfig.addFilter('squash', require('./src/utils/filters/squash.js'));
  eleventyConfig.addFilter('date', require('./src/utils/filters/date.js'));
  eleventyConfig.addFilter('age', require('./src/utils/filters/age.js'));
  eleventyConfig.addFilter('inline', require('./src/utils/filters/inline.js'));
  eleventyConfig.addFilter('camel', require('./src/utils/filters/camel.js'));
  eleventyConfig.addFilter(
    'replaceRE',
    require('./src/utils/filters/replace-re.js')
  );

  // minify the html output
  eleventyConfig.addTransform('htmlmin', require('./src/utils/minify-html.js'));

  // compress and combine js files
  eleventyConfig.addFilter('jsmin', function (code) {
    if (env === 'prod') {
      const Terser = require('terser');
      let minified = Terser.minify(code);
      if (minified.error) {
        console.log('Terser error: ', minified.error);
        return code;
      }
      return minified.code;
    }
    return code;
  });

  // pass some assets right through
  eleventyConfig.addPassthroughCopy('./src/images');
  eleventyConfig.addPassthroughCopy('./src/fonts');
  eleventyConfig.addPassthroughCopy('src/favicon.ico');

  return {
    dir: {
      input: 'src',
      output: 'public',
      data: `_data/${env}`,
    },
    templateFormats: ['html', 'njk', 'md', '11ty.js'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    passthroughFileCopy: true,
  };
};
