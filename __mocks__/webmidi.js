const mockInput = {
  addListener: function addListener(_type, _channel, listener) {
    this.listener = listener
  },
  noteOn: function noteOn(noteEvent) {
    this.listener(noteEvent)
  },
}

const WebMidi = {
  enable: callback => {
    callback()
  },
  inputs: [mockInput],
}

export default WebMidi
