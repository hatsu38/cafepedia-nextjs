import React, { Component } from "react"
import PropTypes from "prop-types"

import GoogleMapReact from "google-map-react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapPin } from "@fortawesome/free-solid-svg-icons"

const propTypes = {
  shop: PropTypes.object.isRequired,
}

export default class Index extends Component {
  constructor(props) {
    super(props)
  }

  round(value, base) {
    return Math.round(value / base) * base
  }

  render() {
    const { shop } = this.props
    const digit = 0.0000001
    const center = {
      lat: this.round(shop.lat, digit),
      lng: this.round(shop.lng, digit),
    }

    const AnyReactComponent = ({ icon }) => <div>{icon}</div>
    return (
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.GOOGLE_MAP_API_KEY,
          }}
          defaultCenter={center}
          defaultZoom={15}
        >
          <AnyReactComponent
            lat={shop.lat}
            lng={shop.lng}
            icon={
              <FontAwesomeIcon
                icon={faMapPin}
                size="2x"
                className="accent-text"
              />
            }
          />
        </GoogleMapReact>
      </div>
    )
  }
}

Index.propTypes = propTypes
