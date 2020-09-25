import React from "react"
export default function Index() {
  return <div />
}
export async function getServerSideProps({ res }) {
  res.statusCode = 302
  res.writeHead(302, { Location: process.env.SITEMAP_URL })
}
