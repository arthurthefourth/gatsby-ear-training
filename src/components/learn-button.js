import React from "react"
import { Button, Container } from "@material-ui/core"

const LearnButton = () => (
  <Container style={{ textAlign: "center" }}>
    <Button variant="outlined" color="primary">
      MIDI Learn
    </Button>
  </Container>
)

export default LearnButton
