import React, { Component } from "react"
import { Button, Container } from "@material-ui/core"

class StartButton extends Component {
  handleClick = () => {
    this.props.game.play({ firstRound: true })
  }

  render() {
    return (
      <Container style={{ textAlign: "center", marginTop: 50 }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClick.bind(this)}
        >
          START
        </Button>
      </Container>
    )
  }
}

export default StartButton
