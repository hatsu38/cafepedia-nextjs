import React from "react"
import PropTypes from "prop-types"
import "../stylesheets/index.module.scss"
import Header from "components/header"
import { NextSeo } from "next-seo"
import FloatingButton from "components/floatingButton"
import Footer from "components/footer"
import Head from "next/head"

const propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
}

export default function Layout({ children }) {
  const title = "カフェペディア | 近くの電源やWi-Fiのあるカフェがすぐわかる"
  const description =
    "カフェペディアは、全国のカフェの設備情報サイトです。「Wi-Fi」「コンセント/電源」など設備に応じて気になるカフェを探すことが可能です。位置情報をONにすれば、すぐにあなたの近くにあるカフェもわかります。是非カフェ探しにご活用ください!"
  let url = "https://cafepedia.jp"
  if (process.browser) {
    url = location.protocol + location.hostname + location.pathname
  }
  return (
    <React.Fragment>
      <Head>
        <link
          rel="shortcut icon"
          href="https://cafepedia-images.s3-ap-northeast-1.amazonaws.com/images/favicons/favicon.ico"
        />
      </Head>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          url: url,
          title: title,
          description: description,
          images: [
            {
              url:
                "https://cafepedia-images.s3-ap-northeast-1.amazonaws.com/images/ogp_img.png",
              width: 800,
              height: 600,
              alt: "カフェペディア OGP",
            },
          ],
          site_name: "カフェペディア",
        }}
        twitter={{
          handle: "@hatsu_38",
          cardType: "summary_large_image",
        }}
      />
      <Header />
      {children}
      <FloatingButton />
      <Footer />
    </React.Fragment>
  )
}

Layout.propTypes = propTypes
