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

  // Runs callbacks before and after *each* note in the sequence.
  playSequence(sequence, startCallback, endCallback) {
    const noteLength = "4n"
    const delay = 2
    const toneSequence = new Tone.Sequence(
      (_time, note) => {
        if (isFunction(startCallback)) {
          startCallback()
        }

        this.playNote(note, endCallback)
      },
      sequence,
      noteLength
    )

    toneSequence.loop = false
    toneSequence.start(delay)
    Tone.Transport.stop()
    Tone.Transport.start()
  }
}

export default Synth
