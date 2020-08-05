import React, { Component } from 'react'
import { InputGroup, FormControl, Button, Jumbotron } from "react-bootstrap"
export default class Index extends Component {
  render() {
    return(
      <InputGroup className="mb-3">
        <FormControl
          placeholder="エリア・駅"
          aria-label="エリア・駅"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Append>
          <Button className="bg-gray--900 border-0">検索</Button>
        </InputGroup.Append>
      </InputGroup>
    )
  }
}