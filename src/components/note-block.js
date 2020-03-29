import React, { Component } from "react"
import { Paper } from "@material-ui/core"
import Synth from "./synth"

class NoteBlock extends Component {
  handleClick() {
    const synth = new Synth()
    synth.playNote("C3")
  }

  render() {
    return (
      <Paper
        variant="outlined"
        elevation={10}
        style={{ width: 100, height: 100, backgroundColor: "grey" }}
        onClick={this.handleClick}
      />
    )
  }
}

export default NoteBlock
