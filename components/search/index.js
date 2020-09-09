import React, { Component } from "react"
import { InputGroup, FormControl, Button, Modal, Badge } from "react-bootstrap"

import "./index.module.scss"

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      prefectures: {},
    }
  }

  async componentDidMount() {
    try {
      const prefectures = await import("lib/datas/prefectures.json")
      this.setState({ prefectures: prefectures.datas })
    } catch (error) {
      console.error(error)
    }
  }

  prefecturesFilteredInArea(area) {
    const { prefectures } = this.state
    if (!prefectures.length) {
      return []
    }

    return prefectures.filter((prefecture) => prefecture.area === area)
  }

  prefMaps(area) {
    return this.prefecturesFilteredInArea(area).map((prefecture, idx) => (
      <Badge
        key={`prefecture-${idx}`}
        className="lighten-15-accent border-lighten-20-accent mx-1"
      >
        {prefecture.ellipsis_name}
      </Badge>
    ))
  }

  handleShow = () => {
    this.setState({ show: true })
  }

  handleClose = () => {
    this.setState({ show: false })
  }

  render() {
    const { show, prefectures } = this.state
    const areas = [
      "北海道・東北",
      "関東",
      "関西",
      "中部",
      "中国",
      "四国",
      "九州・沖縄",
    ]
    // console.log("areas", areas)
    console.log("prefectures", prefectures)
    const areaRender = areas.map((area) => (
      <div key={area}>
        {this.prefMaps(area)}
        <hr />
      </div>
    ))

    return (
      <>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="エリア・駅"
            aria-label="エリア・駅"
            aria-describedby="basic-addon2"
            className="f6"
            onClick={this.handleShow}
          />
          <InputGroup.Append>
            <Button className="bg--accent border-0 f6">検索</Button>
          </InputGroup.Append>
        </InputGroup>
        <Modal
          show={show}
          onHide={this.handleClose}
          dialogClassName="modal-100w"
        >
          <Modal.Header closeButton>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="エリア・駅"
                aria-label="エリア・駅"
                aria-describedby="basic-addon2"
                className="f6"
              />
              <InputGroup.Append>
                <Button className="bg--accent border-0 f6">検索</Button>
              </InputGroup.Append>
            </InputGroup>
          </Modal.Header>
          <Modal.Body>{prefectures && areaRender}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}
