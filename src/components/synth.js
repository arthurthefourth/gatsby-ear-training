import * as Tone from "tone"

class Synth {
  constructor() {
    this.toneSynth = new Tone.Synth().toMaster()
    this.noteLength = "8n"
  }

  playNote(pitch, callback) {
    Tone.Draw.schedule(callback, `+${this.noteLength}`)
    this.toneSynth.triggerAttackRelease(pitch, this.noteLength)
  }
}

export default Synth
