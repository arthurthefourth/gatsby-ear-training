import { sample } from "lodash"

class SequenceGenerator {
  constructor(length) {
    this.length = length
  }

  static availablePitches = ["C3", "E3", "G3"] // Major triad

  generate() {
    let i
    const sequence = []
    for (i = 0; i < this.length; i++) {
      sequence.push(sample(SequenceGenerator.availablePitches))
    }
    return sequence
  }
}

export default SequenceGenerator
