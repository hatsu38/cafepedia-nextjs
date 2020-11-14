import React from "react"
import PropTypes from "prop-types"

import GoogleMapReact from "google-map-react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapPin } from "@fortawesome/free-solid-svg-icons"

const propTypes = {
  shop: PropTypes.object.isRequired,
}

const iconPropTypes = {
  icon: PropTypes.object.isRequired,
}

function AnyReactComponent(props) {
  return <div>{props.icon}</div>
}
AnyReactComponent.propTypes = iconPropTypes

export default function Index(props) {
  const { shop } = props
  const lat = parseFloat(shop.lat)
  const lng = parseFloat(shop.lng)
  const center = {
    lat: lat,
    lng: lng,
  }
  const style = { height: "100%", width: "100%", minHeight: "200px" }
  // const AnyReactComponent = (icon) => <div>{icon}</div>

  return (
    <div style={style}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.GOOGLE_MAP_API_KEY,
        }}
        defaultCenter={center}
        defaultZoom={15}
      >
        <AnyReactComponent
          lat={lat}
          lng={lng}
          icon={
            <FontAwesomeIcon
              icon={faMapPin}
              size="2x"
              className="accent-text"
              width="16"
              height="16"
            />
          }
        />
      </GoogleMapReact>
    </div>
  )
}

Index.propTypes = propTypes
