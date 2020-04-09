import React, { Component } from "react"
import { Grid } from "@material-ui/core"
import NoteBlock from "./note-block"

import { Hearing, Straighten } from "@material-ui/icons"

class NoteGrid extends Component {
  icon() {
    const icons = {
      computer: Hearing,
      user: Straighten,
    }
    return icons[this.props.type]
  }

  render() {
    const Icon = this.icon()

    return (
      <Grid container justify="center" spacing={2}>
        <Grid item style={{ alignSelf: "center" }}>
          <Icon fontSize="large" />
        </Grid>
        <Grid item>
          <NoteBlock key={0} status={this.props.statuses[0]} />
        </Grid>
        <Grid item>
          <NoteBlock key={1} status={this.props.statuses[1]} />
        </Grid>
        <Grid item>
          <NoteBlock key={2} status={this.props.statuses[2]} />
        </Grid>
        <Grid item>
          <NoteBlock key={3} status={this.props.statuses[3]} />
        </Grid>
      </Grid>
    )
  }
}

export default NoteGrid
