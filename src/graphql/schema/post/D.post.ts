import { GraphQLError } from 'graphql'
import { Payload } from '../../../types/jsonWebToken'
import { MyRestDatasource } from '../../datasources/RESTDatasource'
import { Post } from '../../types'

export class datasource_post extends MyRestDatasource {
  override baseURL = process.env.URI_LOCAL

  async getPosts(params = {}) {
    return this.get('/posts/', { params })
  }

  getPost = this.makeDataLoader(
    this.getPosts.bind(this),
    'id',
    (id: string, response: any[]) =>
      response.find((data) => data.id === id),
  )

  getPostsByUserId = this.makeDataLoader(
    this.getPosts.bind(this),
    'userId',
    (id: string, response: any[]) => {
      return response.filter(
        (post) => post.userId === id,
      )
    },
  )

  async createPost(post: Post, user: Payload) {
    await this.exist(
      '/users/' + encodeURI(user.userId),
      {
        errorElseExist: 'invalid userId',
      },
    )
    const indexRef = await this.lastRef(
      '/posts/',
      true,
    )

    return await this.post('/posts/', {
      body: {
        ...post,
        userId: user.userId,
        indexRef: indexRef.toString(),
        createdAt: new Date().toISOString(),
      },
    })
  }

  async updatePost(
    id: string,
    post: Post,
    user: Payload,
  ) {
    if (!id)
      throw new GraphQLError('id is missing')
    const { userId } = await this.get(
      '/posts/' + encodeURI(id),
      {
        cacheOptions: { ttl: 0 },
      },
    )
    if (!userId)
      throw new GraphQLError('invalid post id')
    if (userId !== user.userId)
      throw new GraphQLError(
        'you can only manipulate your posts',
        {
          extensions: { code: 401 },
        },
      )
    return await this.patch('/posts/' + id, {
      body: { ...post },
    })
  }

  async deletePost(id: string, user: Payload) {
    if (!id)
      throw new GraphQLError('id is missing')
    const { userId } = await this.get(
      '/posts/' + encodeURI(id),
      {
        cacheOptions: { ttl: 0 },
      },
    )
    if (!userId)
      throw new GraphQLError('invalid post id', {
        extensions: { code: 401 },
      })

    if (userId !== user.userId)
      throw new GraphQLError(
        'you can only manipulate your posts',
        {
          extensions: { code: 401 },
        },
      )

    await this.delete('/posts/' + id)
    return true
  }
}
