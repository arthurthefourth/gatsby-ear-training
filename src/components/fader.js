import React from "react"

import Slider from "@material-ui/core/Slider"
import Typography from "@material-ui/core/Typography"

const Fader = ({ label, ...props }) => (
  <React.Fragment>
    <Typography gutterBottom>{label}</Typography>
    <Slider aria-label={label} {...props}></Slider>
  </React.Fragment>
)

export default Fader
