import { makeDataLoader } from './utils/Dataloader'
import { fetch } from './utils/fetch.js'

export const db = () => {
  const getApi = async (path: string) => {
    const response = await fetch(
      process.env.URI_LOCAL + path,
    )
    return response
  }

  const getUsers = async (path = '') => {
    const data = await getApi('/users/' + path)
    return data
  }
  const getPosts = async (path = '') => {
    const data = await getApi('/posts/' + path)
    return data
  }
  const getComments = async (path = '') => {
    const data = await getApi('/comments/' + path)
    return data
  }

  const findById = (
    id: string,
    response: any[],
  ) => response.find((data) => data.id === id)

  const findByUserId = (
    id: string,
    response: any[],
  ) => {
    return response.filter(
      (post) => post.userId === id,
    )
  }

  return {
    posts: getPosts,
    post: makeDataLoader(
      getPosts,
      'id',
      findById,
    ),
    postsByUserId: makeDataLoader(
      getPosts,
      'userId',
      findByUserId,
    ),
    users: getUsers,
    user: makeDataLoader(
      getUsers,
      'id',
      findById,
    ),
    comments: getComments,
    comment: makeDataLoader(
      getComments,
      'id',
      findById,
    ),
  }
}
