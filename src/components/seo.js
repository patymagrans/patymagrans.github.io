/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

// TODO: Improve SEO using SCHEMA and images

const Seo = ({ description, title, children }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title
  const config = require("../../config");

  return (
    <>
      <title>{defaultTitle ? `${title} — ${defaultTitle}` : title}</title>

      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={config.siteTitle} />

      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, minimum-scale=1 " />

      <meta name="full-screen" content="yes" />
      <meta name="browsermode" content="application" />
      <meta name="layoutmode" content="fitscreen/standard" />
      <meta name="imagemode" content="force" />
      <meta name="screen-orientation" content="portrait" />

      <link href="//cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css" rel="stylesheet dns-prefetch" />

      <meta name="robots" content="index, follow" />
      <meta name="distribution" content="global" />
      <meta http-equiv="content-language" content="es" />
      <meta http-equiv="language" content="es" />

      <meta name="twitter:title" content={title}/>
      <meta name="twitter:description" content={description}/>
      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="twitter:image:alt" content={title} />

      {children}
    </>
  )
}

export default Seo
