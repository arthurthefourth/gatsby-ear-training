import React, { Fragment } from "react"
import { Typography } from "@material-ui/core"

const Instructions = () => {
  return (
    <div style={{ marginTop: 50 }}>
      <Typography variant="body1">
        <p>
          I designed this for my own use, so it skips the usual theory- and interval-based approaches to ear training.
          I just wanted something that let me practice hearing phrases and playing them back. YMMV.
        </p>
      </Typography>
      <Typography variant="h4">How to Play</Typography>
      <Typography variant="body1">
        <ol>
          <li>(Optional) Choose a key and scale combination in settings. It will default to the C major scale.</li>
          <li>Press Start, and you'll hear a major chord — the root chord of the key.</li>
          <li>A four-note phrase will play.</li>
          <li>Try to play back the phrase on your MIDI input device.</li>
          <li>Repeat steps 3 and 4 until you're done.</li>
        </ol>
      </Typography>
      <Typography variant="h4">Requirements</Typography>
      <Typography variant="body1">
        <ul>
          <li>Chrome or Opera on desktop. It may also work in Chrome on Android (4.4 and higher), but it hasn't been tested, and may look terrible.</li>
          <li>A MIDI keyboard (or other input device) connected to your computer.</li>
        </ul>
      </Typography>
      <Typography variant="h4">Planned Features</Typography>
      <Typography variant="body1">
        <ul>
          <li>Manually replay phrase</li>
          <li>Some sort of point system</li>
          <li>Minor scales/keys</li>
          <li>Different types of melodic motion</li>
          <li>Variable phrase length</li>
          <li>Variable tempo</li>
        </ul>
      </Typography>
      <Typography variant="h4">Possible Features</Typography>
      <Typography variant="body1">
        <ul>
          <li>Show the names of the notes you got wrong</li>
          <li>Remembering your progress for multiple sessions</li>
          <li>Time limit for playing back phrase</li>
        </ul>
      </Typography>
    </div>
  )
}

export default Instructions
