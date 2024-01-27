import * as React from "react"
import { Link, graphql } from "gatsby"

import config from "../../config"

import Layout from "../components/layout"
import Seo from "../components/seo"

import Profile from "../images/PatyMagrans-Profile.png"

const BlogPostTemplate = ({
  data: { previous, next, site, markdownRemark: post },
  location
}) => {
  const siteTitle = site.siteMetadata?.title || `Titulo`
  const thumbnail = post.frontmatter.thumbnail

  return (
    <Layout location={location} title={siteTitle}>
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <div className="post-first-section">
          <img
            src={thumbnail.childImageSharp.fixed.src}
            alt={post.frontmatter.title}
          />
          <div className="post-meta">
            <p style={{ textTransform: 'uppercase' }} className="suffix">{post.frontmatter.date}. {post.frontmatter.task}.</p>
            <h1 itemProp="headline">{post.frontmatter.title}</h1>
          </div>
        </div>
        <iframe 
          src={post.frontmatter.youtubeEmbedCode}
          title="YouTube" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowfullscreen 
          className="no-print blog-youtube"
        />
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <div className="no-print">
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
          <div className="post-about-me">
            <div className="post-about-me-profile">
              <img src={Profile} alt={config.siteTitle} />
            </div>
            <div className="post-about-me-content">
              <h4>{config.aboutMeTitle}</h4>
              <p>{config.biography}</p>
              <Link to={ "mailto:" + config.authorMail }>
              <button>Contact <i className="ri-arrow-right-line"/></button>
            </Link>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  )
}

export const Head = ({ data: { markdownRemark: post } }) => {
  const thumbnail = post.frontmatter.thumbnail
  const shareUrl = 'https://bitacora.lisandropat.com' + post.fields.slug
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
    >
      <meta name="twitter:image" content={shareUrl + thumbnail.childImageSharp.fixed.src}/>
      <meta property="og:image" itemprop="image" content={shareUrl + thumbnail.childImageSharp.fixed.src} />
      <meta property="og:url" content="https://www.imdb.com/title/tt0117500/" />
    </Seo>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      rawMarkdownBody
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "YYYY", locale: "es_ES")
        description
        task
        youtubeEmbedCode
        thumbnail {
          childImageSharp {
            fixed(height: 500, width: 500, fit: COVER) {
              src
            }
          }
        }
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
