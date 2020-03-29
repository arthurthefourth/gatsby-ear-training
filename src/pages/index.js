import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Fader from "../components/fader"
import LearnButton from "../components/learn-button"

import { Grid, Slider, Typography } from "@material-ui/core"

import { makeStyles } from "@material-ui/core/styles"

import { VolumeDown, VolumeUp } from "@material-ui/icons"

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

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

const IndexPage = () => {
  const classes = useStyles()

  return (
    <Layout>
      {" "}
      <Grid container spacing={10}>
        <SEO title="Home" />
        <Grid item xs={12} md={6}>
          <Fader label="Key" min={0} max={11} marks={keys} />
          <LearnButton />
        </Grid>
        <Grid item xs={12} md={6}>
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
        <Grid item xs={12} md={6}>
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
        <Grid item xs={12} md={6}>
          <Typography gutterBottom>Volume</Typography>
          <Grid container>
            <Grid item>
              <VolumeDown />
            </Grid>
            <Grid item xs={10}>
              <Slider label="Volume" />
            </Grid>
            <Grid item>
              <VolumeUp />
            </Grid>
          </Grid>
          <LearnButton />
        </Grid>
      </Grid>
    </Layout>
  )
}

export default IndexPage
