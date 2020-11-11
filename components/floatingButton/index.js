import React, { Component } from "react"
import { Button, Modal } from "react-bootstrap"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons"
import "./index.module.scss"

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
    }
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

  handleShow = () => {
    this.setState({ show: true })
  }

  handleClose = () => {
    this.setState({ show: false })
  }

  render() {
    return (
      <>
        <Button
          className="bg-accent rounded-circle floating-button"
          onClick={this.handleShow}
        >
          <FontAwesomeIcon
            icon={faLocationArrow}
            width="18"
            height="16"
            className="f2"
          />
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="f4">現在地に近いカフェを探す</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              閉じる
            </Button>
            <Button className="bg-accent" onClick={this.fetchCurrentPosition}>
              現在地から検索
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

// Index.propTypes = propTypes
