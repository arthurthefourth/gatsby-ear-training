import React, { Component } from "react"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Fader from "../components/fader"
import LearnButton from "../components/learn-button"
import NoteGrid from "../components/note-grid"
import StartButton from "../components/start-button"
import Game from "../components/game"

import {
  Container,
  Grid,
  Slider,
  Typography,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from "@material-ui/core"

import { ExpandMore } from "@material-ui/icons"

const keys = [
  {
    value: 0,
    label: "C",
  },
  {
    value: 1,
    label: "Db",
  },
  {
    value: 2,
    label: "D",
  },
  {
    value: 3,
    label: "Eb",
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
    label: "Gb",
  },
  {
    value: 7,
    label: "G",
  },
  {
    value: 8,
    label: "Ab",
  },
  {
    value: 9,
    label: "A",
  },
  {
    value: 10,
    label: "Bb",
  },
  {
    value: 11,
    label: "B",
  },
]

class IndexPage extends Component {
  render() {
    return (
      <Layout>
        <SEO title="Home" />
        <Game />
        {/* Settings */}
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
                <Fader label="Key" min={0} max={11} marks={keys} />
                <LearnButton />
              </Grid>
              <Grid item xs={12} md={4}>
                <Fader
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
                <LearnButton />
              </Grid>
              <Grid item xs={12} md={4}>
                <Fader
                  label="Phrase Length"
                  min={2}
                  max={8}
                  marks={[2, 3, 4, 5, 6, 7, 8].map(number => {
                    return { value: number, label: number }
                  })}
                />
                <LearnButton />
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Layout>
    )
  }
}

export default IndexPage
