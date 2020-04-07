import React, { Component, Fragment } from "react"
import NoteGrid from "./note-grid"
import SequenceGenerator from "./sequence-generator"
import StartButton from "./start-button"
import Synth from "./synth"

const sequenceLength = 4

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      synth: new Synth(),
      playingNotes: new Array(sequenceLength).fill(false),
      sequenceGenerator: new SequenceGenerator(sequenceLength),
    }

    this.resetSequence()
  }

  resetSequence() {
    this.currentNoteIndex = 0
  }

  startCurrentNote = () => {
    this.setState(state => {
      const playingNotes = state.playingNotes.map((noteIsPlaying, i) => {
        if (i === this.currentNoteIndex) {
          return true
        } else {
          return noteIsPlaying
        }
      })
      return { playingNotes }
    })
  }

  finishCurrentNote = () => {
    this.setState(state => {
      const playingNotes = state.playingNotes.map((noteIsPlaying, i) => {
        if (i === this.currentNoteIndex) {
          return false
        } else {
          return noteIsPlaying
        }
      })
      return { playingNotes }
    })
    this.currentNoteIndex++
  }

  play() {
    this.playEstablishingChord()
    this.playSequence()
  }

  playEstablishingChord() {
    this.state.synth.playChord(["C3", "E3", "G3"])
  }

  playSequence() {
    const sequence = this.state.sequenceGenerator.generate()
    this.resetSequence()
    this.state.synth.playSequence(
      sequence,
      this.startCurrentNote,
      this.finishCurrentNote
    )
  }

  render() {
    return (
      <Fragment>
        <StartButton game={this} />
        <NoteGrid activated={this.state.playingNotes} />
      </Fragment>
    )
  }
}

export default Game
