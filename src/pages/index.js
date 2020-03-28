import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { withStyles } from "../../node_modules/@material-ui/styles"
import Button from "../../node_modules/@material-ui/core/Button"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Button variant="contained" color="primary">
      Hello World
    </Button>
  </Layout>
)

export default IndexPage
