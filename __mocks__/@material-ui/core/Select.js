import React, { useState } from "react"

const Select = props => {
  const handleChange = event => {
    props.onChange(event, event.currentTarget.value)
  }

  return (
    <select
      value={props.value}
      name={props.labelId}
      aria-label={props.labelId}
      onChange={handleChange}
    >
      {props.children}
    </select>
  )
}

export default Select
