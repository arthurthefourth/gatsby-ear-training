import SequenceGenerator from "./sequence-generator"

class Game {
  constructor(synth) {
    this.synth = synth
    this.sequenceGenerator = new SequenceGenerator(4)
  }

  play() {
    this.playEstablishingChord()
    this.playSequence()
  }

  playEstablishingChord() {
    this.synth.playChord(["C3", "E3", "G3"])
  }

  playSequence() {
    const sequence = this.sequenceGenerator.generate()
    this.synth.playSequence(sequence)
  }
}

export default Game
