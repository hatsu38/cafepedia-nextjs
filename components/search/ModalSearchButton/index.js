import React from "react"
import PropTypes from "prop-types"
import { Button } from "react-bootstrap"
import LinkWithATag from "components/linkWrapper/linkWithATag"

const propTypes = {
  keyword: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
}

export default function Index(props) {
  const { keyword, handleClose } = props
  return (
    <Button className="bg-accent f6 text-reset">
      {keyword ? (
        <span onClick={handleClose}>
          <LinkWithATag
            href={`/search?keyword=${keyword}`}
            as={`/search?keyword=${keyword}`}
            classes="white-text text-decoration-none"
          >
            検索
          </LinkWithATag>
        </span>
      ) : (
        <span className="white-text text-decoration-none">検索</span>
      )}
    </Button>
  )
}

Index.propTypes = propTypes
