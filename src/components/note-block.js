import React, { Component } from "react"
import { Paper } from "@material-ui/core"

const colors = {
  playing: "blue",
  right: "green",
  wrong: "red",
  inactive: "grey"
}

class NoteBlock extends Component {
  backgroundColor() {
    return colors[this.props.status]
  }

  render() {
    return (
      <Paper
        variant="outlined"
        elevation={10}
        style={{
          width: 100,
          height: 100,
          backgroundColor: this.backgroundColor(),
        }}
      />
    )
  }
}

export default NoteBlock
