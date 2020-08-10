const withSass = require('@zeit/next-sass');

module.exports = withSass({
  experimental: { scss: true },
  env: {
    apiHost: 'https://cafepedia-api.herokuapp.com/api/'
  }
})