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
          No entries were found, but I'm sure there will be many here in a while.
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
          <Link to={config.authorYoutube} target="_blank"><i className="ri-youtube-line" /></Link>
          <Link to={config.authorFiverr} target="_blank"><i className="ri-fiverr-line" /></Link>
          <Link to={ "mailto:" + config.authorMail } target="_blank"><i className="ri-mail-line" /></Link>
        </div>
        <p className="biography">{config.biography}</p>
        <div className="header-buttons">
          <Link to={ "mailto:" + config.authorMail + "?subject=Audio%20post%20production:" }>
            <button>Audio post production <i className="ri-arrow-right-line"/></button>
          </Link>
          <br/>
          <Link to={ "mailto:" + config.authorMail + "?subject=Mix%20and%20master:" }>
            <button>Mixing & master <i className="ri-arrow-right-line"/></button>
          </Link>
        </div>
      </div>
      <p className="onlyMobile biography">
        {config.biography}
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
        <div className="soundcloudPlaylist-wrapper">
          <h4>{config.moreWorkTitle}</h4>
          <iframe className="soundcloudPlaylist" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1814131524%3Fsecret_token%3Ds-9nbCpjwglDi&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
          <div className="soundcloudPlaylist-prettier" />
        </div>
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
