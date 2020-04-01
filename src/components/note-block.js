import React, { Component } from "react"
import { Paper } from "@material-ui/core"

class NoteBlock extends Component {
  constructor(props) {
    super(props)
    this.state = { color: "grey" }
  }

  handleClick = (event) => {
    this.props.synth.playNote("C3")
    this.setState({ color: "blue" })
  }

  render() {
    return (
      <Paper
        variant="outlined"
        elevation={10}
        style={{
          width: 100,
          height: 100,
          backgroundColor: `${this.state.color}`,
        }}
        onClick={this.handleClick}
      />
    )
  }
}

export default NoteBlock
