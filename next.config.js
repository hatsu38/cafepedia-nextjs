const withSass = require("@zeit/next-sass")

module.exports = withSass({
  experimental: { scss: true },
  env: {
    apiHost: "https://cafepedia-api.herokuapp.com/api/v1/",
    s3Host: "https://cafepedia-images.s3-ap-northeast-1.amazonaws.com",
    GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY,
    SENTRY_DSN: process.env.SENTRY_DSN,
    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
    SITEMAP_URL: process.env.SITEMAP_URL,
    baseDescription:
      "カフェペディアは、全国のカフェの設備情報サイトです。「Wi-Fi」「電源」など設備に応じて気になるカフェを探すことが可能です。位置情報をONにすれば、すぐにあなたの近くにあるカフェもわかります。是非カフェ探しにご活用ください!",
  },
  webpack(config) {
    config.resolve.modules.push(__dirname)
    return config
  },
})
