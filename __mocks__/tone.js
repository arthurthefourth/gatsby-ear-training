/* Tone.JS needs to be run in a browser, so even in a full-on integration test,
 * it needs to be mocked. Unfortunately, our code relies heavily on its scheduling
 * ability to make sure events happen in the right order, so I've had to build a
 * light version of Tone.Draw.schedule below.
 */

const mockMonoSynthTriggerAttackRelease = jest.fn()
const mockPolySynthTriggerAttackRelease = jest.fn()

/* Tone.JS accepts a few kinds of duration. We support two of them: an integer
 * that represents a number of seconds, or a note value. "3" represents 3 seconds,
 * while "8n" represents an eighth note at the current tempo (we assume 120bpm
 * below).
 */
const calculateSecondsFromNoteLength = noteLength => {
  // 8n => .25 seconds
  if (noteLength.endsWith("n")) {
    const bpm = 120
    const noteType = noteLength.slice(0, -1)
    return ((60 / bpm) * 4) / noteType
  }

  // 3 => 3 seconds
  return noteLength
}

/* Tone's actual Draw.schedule can schedule events in a few different ways. We
 * only support one of these: time relative to the current moment.
 */
const Draw = {
  schedule: (callback, time) => {
    let timeInSeconds
    // Empty time argument
    if (typeof time === "undefined") {
      timeInSeconds = 0
      // Time argument based on absolute time, rather than relative
    } else if (!time.startsWith("+")) {
      throw "Only relative time is supported by this mock"
    } else {
      timeInSeconds = calculateSecondsFromNoteLength(time.substring(1))
    }
    setTimeout(callback, timeInSeconds * 1000)
  },
}

class Sequence {
  constructor(callback, sequence, noteLength) {
    this.callback = callback
    this.sequence = sequence
    this.milliSeconds = calculateSecondsFromNoteLength(noteLength) * 1000
  }

  start = () => {
    this.sequence.forEach((note, index) => {
      setTimeout(() => {
        this.callback({}, note)
      }, this.milliSeconds * (index + 1))
    })
  }
}

class Synth {
  toMaster = () => {
    return this
  }

  triggerAttackRelease = mockMonoSynthTriggerAttackRelease
}

class PolySynth {
  toMaster = () => {
    return this
  }

  triggerAttackRelease = mockPolySynthTriggerAttackRelease
}

const Transport = {
  start: () => {},
}

module.exports = {
  Draw,
  mockMonoSynthTriggerAttackRelease,
  mockPolySynthTriggerAttackRelease,
  PolySynth,
  Sequence,
  Synth,
  Transport,
}
