import { fetch } from './utils/fetch'

export const db = () => {
  const allUsers = (path = '') =>
    fetch(
      process.env.URI_LOCAL + '/users/' + path,
    )
  const allPosts = (path = '') =>
    fetch(
      process.env.URI_LOCAL + '/posts/' + path,
    )
  const allComments = (path = '') =>
    fetch(
      process.env.URI_LOCAL + '/comments/' + path,
    )

  return {
    allUsers,
    allPosts,
    allComments,
  }
}
