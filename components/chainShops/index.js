import React, { Component } from 'react'

export default class Index extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {chainShops} = this.props
    return (
      <>
        {chainShops.map((chainShop) =>
          <p>{chainShop.name}</p>
        )}
      </>
    )
  }
}