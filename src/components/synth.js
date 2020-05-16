import { Draw, Synth as MonoSynth, PolySynth, Sequence, Transport } from "tone"
import { isFunction } from "lodash"

class Synth {
  constructor() {
    this.monoSynth = new MonoSynth().toMaster()
    this.polySynth = new PolySynth(3, MonoSynth).toMaster()
    this.noteLength = "8n"
    Transport.start()
  }

  playNote(pitch, callback) {
    if (isFunction(callback)) {
      Draw.schedule(callback, `+${this.noteLength}`)
    }

    this.monoSynth.triggerAttackRelease(pitch, this.noteLength)
  }

  playChord(pitches, callback) {
    if (isFunction(callback)) {
      Draw.schedule(callback, `+${this.noteLength}`)
    }
    this.polySynth.triggerAttackRelease(pitches, this.noteLength)
  }

  // Runs callbacks before and after *each* note in the sequence.
  playSequence(sequence, onNoteStart, onNoteEnd, onSequenceEnd) {
    const noteLength = "4n"
    Draw.schedule(onSequenceEnd, "+3") // This should be a dynamic time value

    const toneSequence = new Sequence(
      (_time, note) => {
        if (isFunction(onNoteStart)) {
          Draw.schedule(onNoteStart)
        }

        this.playNote(note, onNoteEnd)
      },
      sequence,
      noteLength
    )

    toneSequence.loop = false
    toneSequence.start("+1")
  }
}

export default Synth
