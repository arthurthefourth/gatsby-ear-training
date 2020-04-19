import React, { Component } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Game from "../components/game"

class IndexPage extends Component {
  render() {
    return (
      <Layout>
        <SEO title="Home" />
        <Game />
      </Layout>
    )
  }
}

export default IndexPage
