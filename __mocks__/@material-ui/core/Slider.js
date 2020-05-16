import React, { useState } from "react"

const Slider = props => {
  const [input, setInput] = useState(0)

  const handleChange = event => {
    const value = parseInt(event.currentTarget.value)
    setInput(value)
    props.onChange(event, value)
  }

  return (
    <input
      role="slider"
      aria-label={props["aria-label"]}
      value={input}
      type="range"
      min={props.min}
      max={props.max}
      step={props.step}
      onChange={handleChange}
    />
  )
}

export default Slider
