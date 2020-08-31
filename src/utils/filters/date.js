const { DateTime } = require('luxon');

// Add a friendly date filter to nunjucks.
// Defaults to format of LLLL d, y unless an
// alternate is passed as a parameter.
// {{ date | date('OPTIONAL FORMAT STRING') }}
// List of supported tokens: https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens

module.exports = (dateObj, format = 'LLL d, y') => {
  const date = DateTime.fromJSDate(dateObj, {
    zone: 'utc'
  });
  return format === 'iso' ? date.toISO() : date.toFormat(format);
};
