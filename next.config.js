const withSass = require("@zeit/next-sass")

module.exports = withSass({
  experimental: { scss: true },
  env: {
    apiHost: "https://cafepedia-api-staging.herokuapp.com/api/v1/",
    s3Host: "https://cafepedia-images.s3-ap-northeast-1.amazonaws.com",
    GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY,
  },
  webpack(config) {
    config.resolve.modules.push(__dirname)
    return config
  },
})
