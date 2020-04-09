import React, { Component, Fragment } from "react"
import NoteGrid from "./note-grid"
import SequenceGenerator from "./sequence-generator"
import StartButton from "./start-button"
import Synth from "./synth"
import MIDISetup from "./midi-setup"

const sequenceLength = 4

class Game extends Component {
  constructor(props) {
    super(props)

    this.state = {
      synth: new Synth(),
      computerNoteStatuses: new Array(sequenceLength).fill("inactive"),
      userNoteStatuses: new Array(sequenceLength).fill("inactive"),
      sequenceGenerator: new SequenceGenerator(sequenceLength),
      isRecording: false,
      recordedNotes: [],
    }

    this.resetSequence()
  }

  resetSequence() {
    this.currentNoteIndex = 0
  }

  // Set as current playing note
  // We use currentNoteIndex to iterate through the sequence and whenever these callbacks
  // are called, they affect the current note in the sequence.
  startCurrentNote = () => {
    this.setState(state => {
      const computerNoteStatuses = state.computerNoteStatuses.map((noteStatus, i) => {
        if (i === this.currentNoteIndex) {
          console.log(`Note ${i} playing`)
          return "playing"
        } else {
          return noteStatus
        }
      })
      console.log(computerNoteStatuses)
      return { computerNoteStatuses }
    })
  }

  // Remove as current playing note
  finishCurrentNote = () => {
    this.setState(state => {
      const computerNoteStatuses = state.computerNoteStatuses.map((noteStatus, i) => {
        if (i === this.currentNoteIndex) {
          console.log(`Note ${i} inactive`)
          return "inactive"
        } else {
          return noteStatus
        }
      })
      console.log(computerNoteStatuses)
      return { computerNoteStatuses }
    })
    this.currentNoteIndex++
  }

  handleMIDINote = note => {
    console.log(note)
    if (this.state.isRecording) {
      const recordedNotes = this.state.recordedNotes
      recordedNotes.push(note)
      if (recordedNotes.length >= sequenceLength) {
        this.setState({ isRecording: false })
      }
      console.log(recordedNotes)
    }
  }

  play() {
    this.playEstablishingChord()
    this.playSequence()
    this.setState({ isRecording: true })
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
        <MIDISetup handleNote={this.handleMIDINote} />
        <StartButton game={this} />
        <div style={{ marginTop: 50, marginBottom: 100 }}>
          <NoteGrid type="computer" statuses={this.state.computerNoteStatuses} />
          <NoteGrid type="user" statuses={this.state.userNoteStatuses} />
        </div>
      </Fragment>
    )
  }
}

export default Game
