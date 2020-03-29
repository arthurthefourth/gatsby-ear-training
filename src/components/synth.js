import * as Tone from "tone"

class Synth {
  constructor() {
    this.toneSynth = new Tone.Synth().toMaster()
  }

  playNote(pitch) {
    this.toneSynth.triggerAttackRelease(pitch, "8n")
  }
}

export default Synth