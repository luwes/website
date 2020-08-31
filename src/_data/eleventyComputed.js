module.exports = {
  permalink: (data) =>
    process.env.LAYOUT.includes('pjax')
      ? `/pjax/${data.page.filePathStem.replace('/index', '')}/`
      : `${data.page.filePathStem.replace('/index', '')}/`,
};
