import React, { Component } from "react"
import { Paper } from "@material-ui/core"

class NoteBlock extends Component {
  constructor(props) {
    super(props)
    this.state = { color: "grey" }
  }

  activate = () => {
    this.setState({ color: "blue" })
    this.props.synth.playNote("C3", this.deactivate)
  }

  deactivate = () => {
    this.setState({ color: "grey" })
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
        onClick={this.activate}
      />
    )
  }
}

export default NoteBlock
