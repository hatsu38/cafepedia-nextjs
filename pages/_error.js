import React from "react"
import PropTypes from "prop-types"
import NotFoundError from "components/NotFoundError"
import InternalError from "components/InternalError"

import Layout from "components/layout"

const propTypes = {
  statusCode: PropTypes.number.isRequired,
}
function Error({ statusCode }) {
  return (
    <Layout>
      {statusCode === 404 && <NotFoundError />}
      {statusCode === 500 && <InternalError statusCode={statusCode} />}
      {statusCode !== 404 && statusCode !== 500 && (
        <InternalError statusCode={statusCode} />
      )}
    </Layout>
  )
}

Error.propTypes = propTypes

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
