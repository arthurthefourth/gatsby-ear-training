import React from "react"
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core"

import Fader from "./fader"
import LearnButton from "./learn-button"

import { ExpandMore } from "@material-ui/icons"

const keys = [
  {
    value: 0,
    label: "C",
  },
  {
    value: 1,
    label: "C#",
  },
  {
    value: 2,
    label: "D",
  },
  {
    value: 3,
    label: "D#",
  },
  {
    value: 4,
    label: "E",
  },
  {
    value: 5,
    label: "F",
  },
  {
    value: 6,
    label: "F#",
  },
  {
    value: 7,
    label: "G",
  },
  {
    value: 8,
    label: "G#",
  },
  {
    value: 9,
    label: "A",
  },
  {
    value: 10,
    label: "A#",
  },
  {
    value: 11,
    label: "B",
  },
]

const Settings = props => {
  const [scale, setScale] = React.useState('majorScale')

  function changeKey(event, value) {
    props.changeKey(value)
  }

  function changeScale(event,) {
    props.changeScale(event.target.value)
    setScale(event.target.value)
  }

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMore />}
        aria-controls="settings-content"
        id="settings-header"
      >
        <Typography>Settings</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container spacing={10}>
          <Grid item xs={12} md={4}>
            <Fader
              label="Key"
              min={0}
              max={11}
              marks={keys}
              onChange={changeKey}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <InputLabel id="scale">Scale</InputLabel>
            <Select labelId="scale" value={scale} onChange={changeScale}>
              <MenuItem value="doReMi">Do Re Mi</MenuItem>
              <MenuItem value="majorTriad">Major Triad</MenuItem>
              <MenuItem value="majorPentatonic">Major Pentatonic</MenuItem>
              <MenuItem value="majorScale">Major Scale</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} md={4}>
            <Fader
              disabled={true}
              label="Tempo"
              min={60}
              max={240}
              defaultValue={120}
              step={10}
              valueLabelDisplay="on"
              marks={[60, 240].map(number => {
                return { value: number, label: number }
              })}
            />{" "}
          </Grid>
          <Grid item xs={12} md={4}>
            <Fader
              disabled={true}
              label="Phrase Length"
              min={2}
              max={8}
              marks={[2, 3, 4, 5, 6, 7, 8].map(number => {
                return { value: number, label: number }
              })}
            />
          </Grid>
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default Settings
