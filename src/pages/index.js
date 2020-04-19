import React, { Component } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Game from "../components/game"
import Settings from "../components/settings"

class IndexPage extends Component {
  render() {
    return (
      <Layout>
        <SEO title="Home" />
        <Game />
        <Settings />
      </Layout>
    )
  }
}

export default IndexPage
