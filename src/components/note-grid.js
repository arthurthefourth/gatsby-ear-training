import React, { Component } from "react"
import { Grid, IconButton } from "@material-ui/core"
import NoteBlock from "./note-block"

import { Hearing, Replay, Straighten } from "@material-ui/icons"

class NoteGrid extends Component {
  icon() {
    const icons = {
      computer: Hearing,
      user: Straighten,
    }
    return icons[this.props.type]
  }

  replayIcon() {
    if (this.props.type === "computer" && this.props.replayAvailable) {
      return (
        <IconButton
          color="primary"
          aria-label="replay"
          onClick={this.props.handleReplayClick}
        >
          <Replay fontSize="large" />
        </IconButton>
      )
    } else {
      return null
    }
  }

  render() {
    const Icon = this.icon()

    return (
      <div>
        <Grid container justify="center" spacing={2}>
          <Grid item md={1} style={{ alignSelf: "center", textAlign: "right" }}>
            <Icon fontSize="large" />
          </Grid>
          <Grid item md={1}>
            <NoteBlock key={0} status={this.props.statuses[0]} />
          </Grid>
          <Grid item md={1}>
            <NoteBlock key={1} status={this.props.statuses[1]} />
          </Grid>
          <Grid item md={1}>
            <NoteBlock key={2} status={this.props.statuses[2]} />
          </Grid>
          <Grid item md={1}>
            <NoteBlock key={3} status={this.props.statuses[3]} />
          </Grid>
          <Grid item style={{ alignSelf: "center" }} md={1}>
            {this.replayIcon()}
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default NoteGrid
