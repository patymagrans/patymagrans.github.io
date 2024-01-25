import * as React from "react"
import { Link, graphql } from "gatsby"

import config from '../../config.js'

import Layout from "../components/layout"
import Seo from "../components/seo"

import Logo from "../images/PatyMagrans-L.png"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <p>
          No se encontraron entradas, pero seguro que en un tiempo habrán muchas por aquí.
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle} onlyMobile="onlyMobile">
      <>
      <div className="home-header">
        <img src={Logo} alt={config.siteTitle} />
        <div className="header-icons">
          <Link to={config.authorInstagram} target="_blank"><i className="ri-instagram-line" /></Link>
          <Link to={ "mailto:" + config.authorMail } target="_blank"><i className="ri-mail-line" /></Link>
        </div>
        <p className="longDescription">{config.longDescription}</p>
        <div className="header-buttons">
          <Link to={ "mailto:" + config.authorMail + "?subject=Mezcla%20y%20master:" }>
            <button>Mezcla y master <i className="ri-arrow-right-line"/></button>
          </Link>
          <br/>
          <Link to={ "mailto:" + config.authorMail + "?subject=Produccion%20musical:" }>
            <button>Producción musical <i className="ri-arrow-right-line"/></button>
          </Link>
        </div>
      </div>
      <p className="onlyMobile longDescription">
        {config.longDescription}
      </p>
      <ol style={{ listStyle: `none` }} className="home-posts">
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug
          const thumbnail = post.frontmatter.thumbnail

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <Link to={post.fields.slug} itemProp="url">
                  <img
                    src={thumbnail.childImageSharp.fixed.src}
                    alt={title}
                  />
                </Link>
              </article>
            </li>
          )
        })}
      </ol>
      </>
    </Layout>
  )
}

export default BlogIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Mezcla y master" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY", locale: "es_ES")
          title
          description
          thumbnail {
            childImageSharp {
              fixed(height: 500, width: 500, fit: COVER) {
                src
              }
            }
          }
        }
      }
    }
  }
`
