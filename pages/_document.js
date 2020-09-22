import React from "react"
import Document, { Html, Head, Main, NextScript } from "next/document"
import { GA_TRACKING_ID } from "lib/gtag"

export default class extends Document {
  render() {
    return (
      <Html lang="ja">
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          {process.env.NODE_ENV === "production" && (
            <React.Fragment>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
                }}
              />
            </React.Fragment>
          )}
        </Head>
        <body>
          <Main />
          <h1>{process.env.NODE_ENV}</h1>
          <NextScript />
        </body>
      </Html>
    )
  }
}