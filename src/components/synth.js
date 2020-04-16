import * as Tone from "tone"
import { isFunction } from "lodash"

class Synth {
  constructor() {
    this.monoSynth = new Tone.Synth().toMaster()
    this.polySynth = new Tone.PolySynth(3, Tone.Synth).toMaster()
    this.noteLength = "8n"
    Tone.Transport.start()
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
  playSequence(sequence, onNoteStart, onNoteEnd, onSequenceEnd) {
    const noteLength = "4n"
    Tone.Draw.schedule(onSequenceEnd, "+4") // This should be a dynamic time value

    const toneSequence = new Tone.Sequence(
      (_time, note) => {
        if (isFunction(onNoteStart)) {
          Tone.Draw.schedule(onNoteStart)
        }

        this.playNote(note, onNoteEnd)
      },
      sequence,
      noteLength
    )

    toneSequence.loop = false
    toneSequence.start("+2")
  }
}

export default Synth
