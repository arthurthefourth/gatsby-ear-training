import React, { Fragment } from "react"
import { Grid } from "@material-ui/core"
import NoteBlock from "./note-block"
import { Hearing, Straighten } from "@material-ui/icons"

const NoteGrid = () => (
  <div style={{ marginTop: 100, marginBottom: 100 }}>
    <Grid container justify="center" spacing={2}>
      <Grid item style={{ alignSelf: "center" }}>
        <Hearing fontSize="large" />
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

export default NoteGrid
