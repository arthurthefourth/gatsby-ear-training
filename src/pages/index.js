import React, { Component } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Game from "../components/game"
import Instructions from "../components/instructions"

class IndexPage extends Component {
  render() {
    return (
      <Layout>
        <SEO title="Home" />
        <Game />
        <Instructions />
      </Layout>
    )
  }
}

export default IndexPage
