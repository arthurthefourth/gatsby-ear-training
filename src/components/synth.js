import * as Tone from "tone"
import { isFunction } from "lodash"

class Synth {
  constructor() {
    this.monoSynth = new Tone.Synth().toMaster()
    this.polySynth = new Tone.PolySynth(3, Tone.Synth).toMaster()
    this.noteLength = "8n"
  }

  playNote(pitch, callback) {
    if (isFunction(callback)) {
      Tone.Draw.schedule(callback, `+${this.noteLength}`)
    }

    this.monoSynth.triggerAttackRelease(pitch, this.noteLength)
  }

  playChord(pitches, callback) {
    if (isFunction(callback)) {
      Tone.Draw.schedule(callback, `+${this.noteLength}`)
    }
    this.polySynth.triggerAttackRelease(pitches, this.noteLength)
  }

  playSequence(sequence) {
    console.log(sequence)
    const toneSequence = new Tone.Sequence(
      (_time, note) => {
        this.playNote(note)
      },
      sequence,
      '4n'
    )
    toneSequence.loop = false
    toneSequence.start(2)
    Tone.Transport.stop()
    Tone.Transport.start()
  }
}

export default Synth
