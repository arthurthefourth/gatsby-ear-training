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
      computerNoteStatuses: new Array(sequenceLength).fill("inactive"),
      userNoteStatuses: new Array(sequenceLength).fill("inactive"),
      sequenceGenerator: new SequenceGenerator(sequenceLength),
      isRecording: false,
      playedNotes: new Array(sequenceLength),
      recordedNotes: new Array(sequenceLength),
    }

    this.resetSequence()
  }

  componentDidMount() {
    this.setState({synth: new Synth()})
  }

  resetSequence() {
    this.currentNoteIndex = 0
  }

  // Set as current playing note
  // We use currentNoteIndex to iterate through the sequence and whenever these callbacks
  // are called, they affect the current note in the sequence.
  startCurrentNote = () => {
    this.setState(state => {
      const computerNoteStatuses = state.computerNoteStatuses.map(
        (noteStatus, i) => {
          if (i === this.currentNoteIndex) {
            return "playing"
          } else {
            return noteStatus
          }
        }
      )
      return { computerNoteStatuses }
    })
  }

  // Remove as current playing note
  finishCurrentNote = () => {
    this.setState(state => {
      const computerNoteStatuses = state.computerNoteStatuses.map(
        (noteStatus, i) => {
          if (i === this.currentNoteIndex) {
            return "inactive"
          } else {
            return noteStatus
          }
        }
      )
      return { computerNoteStatuses }
    })
    this.currentNoteIndex++
  }

  finishSequence = () => {
    this.resetSequence()
  }

  handleMIDINote = note => {
    if (this.state.isRecording) {
      this.setState(state => {
        // Add current note to recordedNotes
        const recordedNotes = state.recordedNotes.map((recordedNote, i) => {
          if (i === this.currentNoteIndex) {
            return note
          } else {
            return recordedNote
          }
        })

        // Add status of current note to userNoteStatuses
        const userNoteStatuses = state.userNoteStatuses.map((noteStatus, i) => {
          if (i === this.currentNoteIndex) {
            if (note === state.playedNotes[this.currentNoteIndex]) {
              return "right"
            } else {
              return "wrong"
            }
          } else {
            return noteStatus
          }
        })

        return { recordedNotes, userNoteStatuses }
      })

      if (this.currentNoteIndex >= sequenceLength - 1) {
        this.setState({ isRecording: false })
      } else {
        this.currentNoteIndex++
      }
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
      this.finishCurrentNote,
      this.finishSequence
    )
    this.setState({
      playedNotes: sequence.map(note => {
        return note.charAt(0)
      }),
    })
  }

  render() {
    return (
      <Fragment>
        <MIDISetup handleNote={this.handleMIDINote} />
        <StartButton game={this} />
        <div style={{ marginTop: 50, marginBottom: 100 }}>
          <NoteGrid
            type="computer"
            statuses={this.state.computerNoteStatuses}
          />
          <NoteGrid type="user" statuses={this.state.userNoteStatuses} />
        </div>
      </Fragment>
    )
  }
}

export default Game
