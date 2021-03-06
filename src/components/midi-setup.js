import { Component } from "react"
import WebMidi from "webmidi"

class MIDISetup extends Component {
  componentDidMount() {
    WebMidi.enable(error => {
      if (error) {
        console.log("WebMidi could not be enabled.", error)
      } else {
        console.log("WebMidi enabled!")
        this.setupInputDevices()
      }
    })
  }

  setupInputDevices = () => {
    console.log("Setting up MIDI Input")
    console.log(`Inputs: ${WebMidi.inputs}`)

    WebMidi.inputs.forEach(input => {
      console.log(`Adding listener to input: ${input.name}`)
      input.addListener("noteon", "all", noteEvent => {
        this.props.handleNote(`${noteEvent.note.name}${noteEvent.note.octave}`)
      })
    })
  }

  render() {
    return null
  }
}

export default MIDISetup
