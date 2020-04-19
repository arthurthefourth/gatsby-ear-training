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
const root = 48 // Middle C
const availablePitches = majorScale.map(interval => {
  return numberToNoteName(root + interval)
})

class SequenceGenerator {
  constructor(length) {
    this.length = length
  }

  generate() {
    let i
    const sequence = []
    for (i = 0; i < this.length; i++) {
      sequence.push(sample(availablePitches))
    }
    return sequence
  }
}

export default SequenceGenerator
