import React, { Component } from "react"
import { Paper } from "@material-ui/core"

class NoteBlock extends Component {
  constructor(props) {
    super(props)
    this.state = { color: "grey" }
  }

  backgroundColor() {
    return this.props.activated ? "blue" : "grey"
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
