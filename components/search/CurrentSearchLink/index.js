import React from "react"

import { Badge } from "react-bootstrap"
import BadgeTitle from "../BadgeTitle/"

export default function Index() {
  const fetchCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        successGetPosition(),
        failGetPosition()
      )
    } else {
      alert("ご使用中のブラウザは現在地検索に対応されておりません。")
    }
  }

  const successGetPosition = async (position) => {
    if (position.coords) {
      // TODO: Function ComponentにしたらuseRouterを使ってリダイクレトできるので、それまでの間の暫定対応
      const url = `/nearby?lat=${position.coords.latitude}&lng=${position.coords.longitude}`
      window.location.href = url
    }
  }

  const failGetPosition = (error) => {
    console.log("error", error)
    switch (error.code) {
      case 1:
        alert("位置情報の提供を許可してください。")
        break
      case 2:
        alert("位置情報の取得に失敗しました。")
        break
      default:
        alert("位置情報の取得に失敗しました。")
        break
    }
  }
  return (
    <React.Fragment>
      <BadgeTitle name={"現在地から探す"} />
      <Badge
        className="lighten-15-accent border-lighten-20-accent mr-2"
        style={{ cursor: "pointer" }}
        onClick={() => fetchCurrentPosition()}
      >
        現在地
      </Badge>
      <hr />
    </React.Fragment>
  )
}
