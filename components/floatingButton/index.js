import React, { Component } from "react"
import { Button } from "react-bootstrap"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons"
import "./index.module.scss"

export default class Index extends Component {
  constructor(props) {
    super(props)
  }

  fetchCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.successGetPosition,
        this.failGetPosition
      )
    } else {
      alert("ご使用中のブラウザは現在地検索に対応されておりません。")
    }
  }

  successGetPosition = async (position) => {
    if (position.coords) {
      // TODO: Function ComponentにしたらuseRouterを使ってリダイクレトできるので、それまでの間の暫定対応
      const url = `/nearby?lat=${position.coords.latitude}&lng=${position.coords.longitude}`
      window.location.href = url
    }
  }

  failGetPosition = (error) => {
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

  render() {
    return (
      <Button
        className="bg-accent rounded-circle floating-button"
        onClick={this.fetchCurrentPosition}
      >
        <FontAwesomeIcon
          icon={faLocationArrow}
          width="18"
          height="16"
          className="f2"
        />
      </Button>
    )
  }
}

// Index.propTypes = propTypes
