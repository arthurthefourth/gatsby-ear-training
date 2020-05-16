import React from "react"

const MenuItem = ({ children, ...props }) => (
  <option {...props}>{children}</option>
)

export default MenuItem
