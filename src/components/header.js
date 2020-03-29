import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { AppBar, Toolbar, Typography } from "@material-ui/core"

const Header = ({ siteTitle }) => (
  <AppBar position="static">
    <Toolbar color="inherit">
      <Typography>{siteTitle}</Typography>
    </Toolbar>
  </AppBar>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
