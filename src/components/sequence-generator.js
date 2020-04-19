import { sample } from "lodash"

function numberToNoteName(number) {
  const pitchClasses = [
    "C",
    "Db",
    "D",
    "Eb",
    "E",
    "F",
    "Gb",
    "G",
    "Ab",
    "A",
    "Bb",
    "B",
  ]

  const pitch = pitchClasses[number % 12]
  const octave = Math.floor(number / 12) - 1

  return `${pitch}${octave}`
}

const majorScale = [0, 2, 4, 5, 7, 9, 11, 12]
const majorTriad = [0, 4, 7]

class SequenceGenerator {
  constructor(length) {
    this.length = length
    this.key = 0
    this.availableIntervals = majorScale
  }

  get availablePitches() {
    return this.availableIntervals.map(interval => {
      return numberToNoteName(this.root + interval)
    })
  }

  get key() {
    return this.root - 48
  }

  // Expects a number from 0-11
  set key(noteNumber) {
    this.root = noteNumber + 48
  }

  generate() {
    let i
    const sequence = []
    for (i = 0; i < this.length; i++) {
      sequence.push(sample(this.availablePitches))
    }
    return sequence
  }

  generateEstablishingChord() {
    const chord = majorTriad.map(interval => {
      return numberToNoteName(this.root + interval)
    })
    return chord
  }
}

export default SequenceGenerator
