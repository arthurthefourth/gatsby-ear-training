import React, { Component } from "react"
import { Grid } from "@material-ui/core"
import NoteBlock from "./note-block"

import { Hearing, Straighten } from "@material-ui/icons"

class NoteGrid extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div style={{ marginTop: 50, marginBottom: 100 }}>
        <Grid container justify="center" spacing={2}>
          <Grid item style={{ alignSelf: "center" }}>
            <Hearing fontSize="large" />
          </Grid>
          <Grid item>
            <NoteBlock activated={this.props.activated[0]} />
          </Grid>
          <Grid item>
            <NoteBlock activated={this.props.activated[1]} />
          </Grid>
          <Grid item>
            <NoteBlock activated={this.props.activated[2]} />
          </Grid>
          <Grid item>
            <NoteBlock activated={this.props.activated[3]} />
          </Grid>
        </Grid>
        <Grid container justify="center" spacing={2}>
          <Grid item style={{ alignSelf: "center" }}>
            <Straighten fontSize="large" />
          </Grid>
          <Grid item>
            <NoteBlock />
          </Grid>
          <Grid item>
            <NoteBlock />
          </Grid>
          <Grid item>
            <NoteBlock />
          </Grid>
          <Grid item>
            <NoteBlock />
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default NoteGrid
