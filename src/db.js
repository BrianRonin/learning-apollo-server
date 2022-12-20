import fetch from 'node-fetch'

export const db = () => {
  const users = (path = '') =>
    fetch(
      'http://localhost:3000/users/' + path,
    ).then((r) => r.json())

  const posts = (path = '') =>
    fetch(
      'http://localhost:3000/posts/' + path,
    ).then((r) => r.json())

  const comments = (path = '') =>
    fetch(
      'http://localhost:3000/comments/' + path,
    ).then((r) => r.json())

  return {
    users,
    posts,
    comments,
  }
}
