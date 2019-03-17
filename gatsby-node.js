/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`)
const slash = require(`slash`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(
    `
      {
        allContentfulBlogPost {
          edges {
            node {
              id
              slug
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      console.log("Error retrieving contentful data", result.errors)
    }

    // Resolve the paths to our template
    const blogPostsTemplate = path.resolve("./src/templates/blogpost.js")

    // The for each result we can create a page
    result.data.allContentfulBlogPost.edges.forEach(edge => {
      createPage({
        path: `/blogposts/${edge.node.slug}/`,
        component: slash(blogPostsTemplate),
        context: {
          slug: edge.node.slug,
          id: edge.node.id
        }
      })
    })
  })
  .catch(error => {
    console.log("Error retrieving contentful data", error)
  })
}