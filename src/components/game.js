import React, { Component, Fragment } from "react"
import NoteGrid from "./note-grid"
import SequenceGenerator from "./sequence-generator"
import Settings from "./settings"
import StartButton from "./start-button"
import Synth from "./synth"
import MIDISetup from "./midi-setup"

const sequenceLength = 4

function initialState() {
  return {
    computerNoteStatuses: new Array(sequenceLength).fill("inactive"),
    userNoteStatuses: new Array(sequenceLength).fill("inactive"),
    isRecording: false,
    playedNotes: new Array(sequenceLength),
    recordedNotes: new Array(sequenceLength),
  }
}

function sameNote(note, otherNote) {
  const pitch = note.slice(0, -1)
  const otherPitch = otherNote.slice(0, -1)
  return pitch === otherPitch
}

class Game extends Component {
  constructor(props) {
    super(props)

    this.state = initialState()
    this.resetSequence()
  }

  changeKey = value => {
    this.state.sequenceGenerator.key = value
  }

  changeScale = value => {
    this.state.sequenceGenerator.scale = value
  }

  componentDidMount() {
    this.setState({
      sequenceGenerator: new SequenceGenerator(sequenceLength),
      synth: new Synth(),
    })
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
    this.setState({ isRecording: true })
    this.resetSequence()
  }

  handleMIDINote = note => {
    this.state.synth.playNote(note)
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
            if (sameNote(note, state.playedNotes[this.currentNoteIndex])) {
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
        setTimeout(this.play, 1000)
      } else {
        this.currentNoteIndex++
      }
    }
  }

  play = (options = {}) => {
    this.setState(initialState())
    if (options.firstRound) {
      this.playEstablishingChord()
    }
    this.playSequence()
  }

  playEstablishingChord() {
    const chord = this.state.sequenceGenerator.generateEstablishingChord()
    this.state.synth.playChord(chord)
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
    this.setState({ playedNotes: sequence })
  }

  replaySequence = () => {
    this.resetSequence()
    this.state.synth.playSequence(
      this.state.playedNotes,
      this.startCurrentNote,
      this.finishCurrentNote,
      this.finishSequence
    )
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
            replayAvailable={this.state.isRecording}
            handleReplayClick={this.replaySequence}
          />
          <NoteGrid type="user" statuses={this.state.userNoteStatuses} />
        </div>
        <Settings changeKey={this.changeKey} changeScale={this.changeScale} />
      </Fragment>
    )
  }
}

export default Game
