import * as React from "react"
import type {HeadFC, PageProps} from "gatsby"
import {graphql} from "gatsby"
import Layout from "../components/layout.tsx"
import Button from '@mui/material/Button';

export const query = graphql`
  query IndexPageQuery {
    tinacms {
      page(relativePath: "home.mdx") {
        id
        body
      }
    }
  }
`

const IndexPage: React.FC<PageProps> = ({data}) => {
  return (
    <Layout>
      <Button variant="contained">MUI Button</Button>
      <main>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </main></Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
